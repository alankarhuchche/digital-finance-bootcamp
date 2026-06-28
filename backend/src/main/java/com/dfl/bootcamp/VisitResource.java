package com.dfl.bootcamp;

import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import org.jboss.logging.Logger;

import java.util.Map;
import java.util.concurrent.ExecutionException;

/**
 * Anonymous visit counter. No identifying information is collected —
 * this endpoint increments and reads a single Firestore document.
 *
 * Intentionally minimal per the build plan: this is a hit counter,
 * not an analytics/session-tracking system.
 */
@Path("/api/visits")
public class VisitResource {

    private static final Logger LOG = Logger.getLogger(VisitResource.class);
    private static final String COLLECTION = "counters";
    private static final String DOC_ID = "site-visits";
    private static final String FIELD = "count";

    @Inject
    Firestore firestore;

    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> recordVisit() {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION).document(DOC_ID);
            docRef.set(Map.of(FIELD, FieldValue.increment(1)),
                    com.google.cloud.firestore.SetOptions.merge()).get();
            long count = readCount(docRef);
            return Map.of("count", count);
        } catch (InterruptedException | ExecutionException e) {
            LOG.error("Failed to record visit", e);
            Thread.currentThread().interrupt();
            return Map.of("count", -1, "error", "counter unavailable");
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> getCount() {
        try {
            DocumentReference docRef = firestore.collection(COLLECTION).document(DOC_ID);
            return Map.of("count", readCount(docRef));
        } catch (InterruptedException | ExecutionException e) {
            LOG.error("Failed to read visit count", e);
            Thread.currentThread().interrupt();
            return Map.of("count", -1, "error", "counter unavailable");
        }
    }

    private long readCount(DocumentReference docRef) throws InterruptedException, ExecutionException {
        var snapshot = docRef.get().get();
        Long count = snapshot.exists() ? snapshot.getLong(FIELD) : null;
        return count != null ? count : 0L;
    }
}
