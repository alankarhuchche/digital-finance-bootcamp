package com.dfl.bootcamp;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

import java.util.Map;
import java.util.Optional;

/**
 * Site chat. For topics with curated, server-held context (see {@link ChatContextRegistry}) the
 * answer is grounded only in that context, plus the scene the visitor was using; any page text
 * the browser sends is ignored. Other topics keep the earlier behaviour, with the browser's text
 * labelled as untrusted.
 */
@Path("/api/chat")
public class ChatResource {

    private static final Logger LOG = Logger.getLogger(ChatResource.class);

    @Inject
    ChatModel model;

    @Inject
    ChatContextRegistry contexts;

    public record ChatRequest(String moduleId, String moduleTitle, String moduleContent, String question, String sceneId) {}

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response chat(ChatRequest req) {
        if (!model.isConfigured()) {
            return Response.status(Response.Status.SERVICE_UNAVAILABLE)
                    .entity(Map.of("error", "AI chat is not configured for this environment."))
                    .build();
        }
        if (req == null || req.question() == null || req.question().isBlank()) {
            return Response.ok(Map.of("answer", "Please ask a question.")).build();
        }
        if (req.question().length() > ChatPrompt.MAX_QUESTION_LENGTH) {
            return Response.ok(Map.of("answer", "Question too long (max " + ChatPrompt.MAX_QUESTION_LENGTH + " characters).")).build();
        }

        Optional<ChatContextRegistry.CuratedContext> curated = contexts.find(req.moduleId());
        String userMessage = curated
                .map(ctx -> ChatPrompt.curated(ctx, req.sceneId(), req.question()))
                .orElseGet(() -> ChatPrompt.clientExcerpt(req.moduleTitle(), req.moduleContent(), req.question()));

        try {
            String answer = model.generate(ChatPrompt.SYSTEM_PROMPT, userMessage);
            return Response.ok(Map.of("answer", answer != null && !answer.isBlank() ? answer : "No response generated.")).build();
        } catch (ChatModel.ModelUnavailableException e) {
            return Response.status(502).entity(Map.of("error", "AI model is not available.")).build();
        } catch (Exception e) {
            // Record the failure type only; the visitor's question is never logged.
            LOG.errorf("Chat model call failed: %s", e.getClass().getSimpleName());
            return Response.ok(Map.of("answer", "Sorry, I couldn't process that question right now.")).build();
        }
    }
}
