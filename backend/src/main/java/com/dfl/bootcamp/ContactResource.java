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

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> sendContact(ContactRequest req) {
        if (req == null) {
            return Map.of("status", "error", "error", "Empty request");
        }

        // Honeypot tripped — silently pretend success, don't tell the bot why.
        if (req.honeypot() != null && !req.honeypot().isBlank()) {
            LOG.debug("Honeypot field filled — dropping likely spam submission silently.");
            return Map.of("status", "ok");
        }

        if (req.message() == null || req.message().isBlank()) {
            return Map.of("status", "error", "error", "Message is required");
        }

        String name = (req.name() == null || req.name().isBlank()) ? "Anonymous" : req.name();
        String replyEmail = (req.email() == null || req.email().isBlank()) ? "not provided" : req.email();

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
