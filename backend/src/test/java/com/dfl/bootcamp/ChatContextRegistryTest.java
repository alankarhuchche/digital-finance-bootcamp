package com.dfl.bootcamp;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ChatContextRegistryTest {

    private final ChatContextRegistry registry = new ChatContextRegistry();

    @Test
    void loadsACuratedContextAndItsScenes() {
        var ctx = registry.find("test-topic").orElseThrow();
        assertEquals("Test topic", ctx.title());
        assertTrue(ctx.scene("journey").isPresent());
        assertTrue(ctx.scene("missing").isEmpty());
    }

    @Test
    void rejectsIdsThatCouldEscapeTheContextFolder() {
        assertTrue(registry.find("../application").isEmpty());
        assertTrue(registry.find("chat-context/test-topic").isEmpty());
        assertTrue(registry.find("Test-Topic").isEmpty());
        assertTrue(registry.find("").isEmpty());
        assertTrue(registry.find(null).isEmpty());
    }

    @Test
    void unknownTopicsHaveNoCuratedContext() {
        assertTrue(registry.find("no-such-topic").isEmpty());
    }

    @Test
    void theStablecoinsContextShipsWithTheAppAndCoversEveryMajorScene() {
        var ctx = registry.find("stablecoins").orElseThrow(() -> new AssertionError("stablecoins.json missing from resources"));
        for (String scene : new String[]{"journey", "routes", "liquidity", "crossledger"}) {
            assertTrue(ctx.scene(scene).isPresent(), "missing scene " + scene);
        }
        assertFalse(ctx.asOf().isBlank());
        // Keep model calls affordable: the whole reference stays well under ~20k characters.
        int size = ctx.overview().length() + ctx.sources().length()
                + ctx.scenes().values().stream().mapToInt(String::length).max().orElse(0);
        assertTrue(size < 24000, "curated context too large: " + size);
    }
}
