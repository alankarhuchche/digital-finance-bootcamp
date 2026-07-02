package com.dfl.bootcamp;

import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Path("/api/chat")
@ApplicationScoped
public class ChatResource {

    private static final Logger LOG = Logger.getLogger(ChatResource.class);
    private static final int MAX_QUESTION_LENGTH = 1000;
    private static final int MAX_CONTENT_LENGTH = 10000;

    private static final String SYSTEM_PROMPT =
            "You are a teaching assistant for a Digital Finance Knowledge Base. "
            + "You answer questions ONLY about the module content provided in the user message. "
            + "If the user asks about something not covered in the module content, say "
            + "\"That topic isn't covered in this module\" and suggest which module might cover it. "
            + "Keep answers concise (2-4 sentences). Use plain language. "
            + "Never speculate beyond what the module content states. "
            + "Never provide financial advice. "
            + "Format your response as plain text, not markdown.";

    @ConfigProperty(name = "gemini.api-key", defaultValue = "")
    String apiKey;

    @ConfigProperty(name = "gemini.model", defaultValue = "gemini-2.5-flash")
    String modelName;

    private Client client;
    private boolean configured;

    @PostConstruct
    void init() {
        if (apiKey == null || apiKey.isBlank()) {
            LOG.warn("GEMINI_API_KEY is not configured — /api/chat will return 503 until the secret is wired");
            configured = false;
        } else {
            client = Client.builder().apiKey(apiKey).build();
            configured = true;
            LOG.infof("Gemini client initialised (model: %s)", modelName);
        }
    }

    public record ChatRequest(String moduleId, String moduleTitle, String moduleContent, String question) {}

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response chat(ChatRequest req) {
        if (!configured) {
            return Response.status(Response.Status.SERVICE_UNAVAILABLE)
                    .entity(Map.of("error", "AI chat is not configured for this environment."))
                    .build();
        }

        if (req == null || req.question() == null || req.question().isBlank()) {
            return Response.ok(Map.of("answer", "Please ask a question.")).build();
        }
        if (req.question().length() > MAX_QUESTION_LENGTH) {
            return Response.ok(Map.of("answer", "Question too long (max " + MAX_QUESTION_LENGTH + " characters).")).build();
        }

        String content = req.moduleContent() != null
                ? req.moduleContent().substring(0, Math.min(req.moduleContent().length(), MAX_CONTENT_LENGTH))
                : "";

        String userMessage = "Module: " + (req.moduleTitle() != null ? req.moduleTitle() : "Unknown")
                + "\n\nModule content:\n" + content
                + "\n\nUser question: " + req.question();

        try {
            GenerateContentConfig config = GenerateContentConfig.builder()
                    .temperature(0.15f)
                    .maxOutputTokens(512)
                    .topP(0.8f)
                    .systemInstruction(Content.builder()
                            .parts(List.of(Part.builder().text(SYSTEM_PROMPT).build()))
                            .build())
                    .build();

            GenerateContentResponse geminiResponse = client.models.generateContent(
                    modelName,
                    userMessage,
                    config
            );

            String answer = geminiResponse.text();
            return Response.ok(Map.of("answer", answer != null ? answer : "No response generated.")).build();
        } catch (Exception e) {
            String msg = e.getMessage();
            if (msg != null && (msg.contains("404") || msg.contains("no longer available") || msg.contains("not found"))) {
                LOG.errorf("Gemini model not available (%s): %s", modelName, msg);
                return Response.status(502)
                        .entity(Map.of("error", "AI model is not available."))
                        .build();
            }
            LOG.error("Gemini call failed", e);
            return Response.ok(Map.of("answer", "Sorry, I couldn't process that question right now.")).build();
        }
    }
}
