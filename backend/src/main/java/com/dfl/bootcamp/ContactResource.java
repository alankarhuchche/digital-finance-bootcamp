package com.dfl.bootcamp;

import io.quarkus.mailer.Mail;
import io.quarkus.mailer.Mailer;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;

import java.util.Map;

/**
 * Contact form. Sends a plain-text email to a fixed recipient — this is not
 * a general mail-sending API, just a "get in touch" form backing a single
 * mailbox. Includes a honeypot field: a hidden form field real visitors
 * never fill in, but simple bots often do, used to silently drop spam
 * without giving the bot useful feedback.
 */
@Path("/api/contact")
public class ContactResource {

    private static final Logger LOG = Logger.getLogger(ContactResource.class);
    private static final String RECIPIENT = "alankarhuchche@gmail.com";

    @Inject
    Mailer mailer;

    public record ContactRequest(String name, String email, String message, String honeypot) {}

    private static final int MAX_NAME_LENGTH = 200;
    private static final int MAX_EMAIL_LENGTH = 254;
    private static final int MAX_MESSAGE_LENGTH = 5000;
    private static final java.util.regex.Pattern EMAIL_PATTERN =
            java.util.regex.Pattern.compile("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$");

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> sendContact(ContactRequest req) {
        if (req == null) {
            return Map.of("status", "error", "error", "Empty request");
        }

        if (req.honeypot() != null && !req.honeypot().isBlank()) {
            LOG.debug("Honeypot field filled — dropping likely spam submission silently.");
            return Map.of("status", "ok");
        }

        if (req.message() == null || req.message().isBlank()) {
            return Map.of("status", "error", "error", "Message is required");
        }
        if (req.message().length() > MAX_MESSAGE_LENGTH) {
            return Map.of("status", "error", "error", "Message too long (max " + MAX_MESSAGE_LENGTH + " characters)");
        }
        if (req.name() != null && req.name().length() > MAX_NAME_LENGTH) {
            return Map.of("status", "error", "error", "Name too long");
        }
        if (req.email() != null && !req.email().isBlank()) {
            if (req.email().length() > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.matcher(req.email()).matches()) {
                return Map.of("status", "error", "error", "Invalid email address");
            }
        }

        String name = (req.name() == null || req.name().isBlank()) ? "Anonymous" : req.name().strip();
        String replyEmail = (req.email() == null || req.email().isBlank()) ? "not provided" : req.email().strip();

        String body = "New message from the Digital Finance Bootcamp contact form:\n\n"
                + "Name: " + name + "\n"
                + "Email: " + replyEmail + "\n\n"
                + "Message:\n" + req.message();

        try {
            Mail mail = Mail.withText(RECIPIENT, "Bootcamp contact form: " + name, body);
            if (req.email() != null && !req.email().isBlank()) {
                mail.setReplyTo(req.email());
            }
            mailer.send(mail);
            return Map.of("status", "ok");
        } catch (Exception e) {
            LOG.error("Failed to send contact form email", e);
            return Map.of("status", "error", "error", "Could not send message right now");
        }
    }
}
