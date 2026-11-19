package com.dfl.bootcamp;

/**
 * The language model behind /api/chat. An interface so the resource can be tested with a
 * fake, without credentials or paid calls.
 */
public interface ChatModel {

    /** False when no API key is configured; the endpoint then answers 503. */
    boolean isConfigured();

    /**
     * Generate an answer.
     *
     * @throws ModelUnavailableException when the configured model does not exist or has been retired
     * @throws Exception                 for any other failure
     */
    String generate(String systemPrompt, String userMessage) throws Exception;

    /** The configured model name no longer exists or is unavailable. Mapped to HTTP 502. */
    class ModelUnavailableException extends Exception {
        public ModelUnavailableException(String message) {
            super(message);
        }
    }
}
