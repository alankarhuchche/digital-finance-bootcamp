package com.dfl.bootcamp;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.enterprise.context.ApplicationScoped;
import org.jboss.logging.Logger;

import java.io.InputStream;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

/**
 * Curated, source-backed chat context per topic, loaded from
 * {@code src/main/resources/chat-context/<moduleId>.json}. Those files are generated from the
 * same TypeScript content model that renders the page (see frontend/scripts/build-chat-context.ts),
 * so the assistant and the page cannot drift apart.
 *
 * <p>Only ids matching {@link #ID} are ever looked up, so a visitor cannot steer the lookup to
 * another resource.
 */
@ApplicationScoped
public class ChatContextRegistry {

    private static final Logger LOG = Logger.getLogger(ChatContextRegistry.class);
    static final Pattern ID = Pattern.compile("^[a-z0-9-]{1,60}$");

    public record CuratedContext(String moduleId, String title, String asOf, String overview,
                                 Map<String, String> scenes, String sources) {
        public Optional<String> scene(String sceneId) {
            if (sceneId == null || !ID.matcher(sceneId).matches() || scenes == null) return Optional.empty();
            return Optional.ofNullable(scenes.get(sceneId));
        }
    }

    private final ObjectMapper mapper = new ObjectMapper();
    private final Map<String, Optional<CuratedContext>> cache = new ConcurrentHashMap<>();

    public Optional<CuratedContext> find(String moduleId) {
        if (moduleId == null || !ID.matcher(moduleId).matches()) return Optional.empty();
        Optional<CuratedContext> hit = cache.get(moduleId);
        if (hit != null) return hit;
        Optional<CuratedContext> loaded = load(moduleId);
        // Only found contexts are cached, so lookups of arbitrary ids can't grow the cache.
        loaded.ifPresent(ctx -> cache.putIfAbsent(moduleId, loaded));
        return loaded;
    }

    @SuppressWarnings("unchecked")
    private Optional<CuratedContext> load(String moduleId) {
        String path = "chat-context/" + moduleId + ".json";
        try (InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(path)) {
            if (in == null) return Optional.empty();
            Map<String, Object> raw = mapper.readValue(in, Map.class);
            Map<String, String> scenes = new LinkedHashMap<>();
            Object rawScenes = raw.get("scenes");
            if (rawScenes instanceof Map<?, ?> m) {
                m.forEach((k, v) -> scenes.put(String.valueOf(k), String.valueOf(v)));
            }
            return Optional.of(new CuratedContext(
                    moduleId,
                    String.valueOf(raw.getOrDefault("title", moduleId)),
                    String.valueOf(raw.getOrDefault("asOf", "")),
                    String.valueOf(raw.getOrDefault("overview", "")),
                    Map.copyOf(scenes),
                    String.valueOf(raw.getOrDefault("sources", ""))));
        } catch (Exception e) {
            LOG.errorf("Could not load curated chat context %s: %s", path, e.getMessage());
            return Optional.empty();
        }
    }
}
