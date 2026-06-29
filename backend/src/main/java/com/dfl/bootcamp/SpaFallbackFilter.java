package com.dfl.bootcamp;

import io.vertx.ext.web.Router;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.enterprise.event.Observes;

@ApplicationScoped
public class SpaFallbackFilter {

    void installRoute(@Observes Router router) {
        router.route("/*").order(Integer.MAX_VALUE).handler(ctx -> {
            String path = ctx.normalizedPath();
            if (!path.startsWith("/api/") && !path.contains(".")) {
                ctx.reroute("/index.html");
            } else {
                ctx.next();
            }
        });
    }
}
