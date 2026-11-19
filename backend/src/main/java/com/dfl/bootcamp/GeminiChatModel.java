package com.dfl.bootcamp;

import com.google.genai.Client;
import com.google.genai.types.Content;
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.GenerateContentResponse;
import com.google.genai.types.Part;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.ApplicationScoped;
import org.eclipse.microprofile.config.inject.ConfigProperty;
import org.jboss.logging.Logger;

import java.util.List;

/** Gemini implementation of {@link ChatModel}. The API key stays server-side. */
@ApplicationScoped
public class GeminiChatModel implements ChatModel {

    private static final Logger LOG = Logger.getLogger(GeminiChatModel.class);

    @ConfigProperty(name = "gemini.api-key", defaultValue = "")
    String apiKey;

    @ConfigProperty(name = "gemini.model", defaultValue = "gemini-2.5-flash")
    String modelName;

    private Client client;

    @PostConstruct
    void init() {
        if (apiKey == null || apiKey.isBlank()) {
            LOG.warn("GEMINI_API_KEY is not configured — /api/chat will return 503 until the secret is wired");
            return;
        }
        client = Client.builder().apiKey(apiKey).build();
        LOG.infof("Gemini client initialised (model: %s)", modelName);
    }

    @Override
    public boolean isConfigured() {
        return client != null;
    }

    @Override
    public String generate(String systemPrompt, String userMessage) throws Exception {
        GenerateContentConfig config = GenerateContentConfig.builder()
                .temperature(0.15f)
                .maxOutputTokens(512)
                .topP(0.8f)
                .systemInstruction(Content.builder()
                        .parts(List.of(Part.builder().text(systemPrompt).build()))
                        .build())
                .build();
        try {
            GenerateContentResponse response = client.models.generateContent(modelName, userMessage, config);
            return response.text();
        } catch (Exception e) {
            String msg = e.getMessage();
            if (msg != null && (msg.contains("404") || msg.contains("no longer available") || msg.contains("not found"))) {
                // Log the model and the provider's error only: never the visitor's question.
                LOG.errorf("Gemini model not available (%s): %s", modelName, msg);
                throw new ModelUnavailableException(msg);
            }
            throw e;
        }
    }
}
