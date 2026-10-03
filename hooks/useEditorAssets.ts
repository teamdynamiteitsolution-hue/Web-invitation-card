"use client";

import { useState, useEffect } from "react";

interface EditorAssets {
  templates: any[];
  animations: any[];
  durations: any[];
}

let memoryCache: EditorAssets | null = null;

export function useEditorAssets() {
  const [data, setData] = useState<EditorAssets | null>(memoryCache);
  const [loading, setLoading] = useState<boolean>(!memoryCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If already in memory cache, avoid all network overhead
    if (memoryCache) {
      setData(memoryCache);
      setLoading(false);
      return;
    }

    // Try reading from sessionStorage
    try {
      const sessionData = sessionStorage.getItem("editor_assets_cache");
      if (sessionData) {
        const parsed = JSON.parse(sessionData);
        if (parsed.templates?.length > 0) {
          memoryCache = parsed;
          setData(parsed);
          setLoading(false);
          return;
        }
      }
    } catch {
      // Ignore session storage error
    }

    let isMounted = true;

    async function loadAssets() {
      try {
        setLoading(true);
        const res = await fetch("/api/create");
        if (!res.ok) {
          throw new Error("Failed to load editor assets");
        }
        const json = await res.json();
        const payload: EditorAssets = json.data || { templates: [], animations: [], durations: [] };

        memoryCache = payload;
        try {
          sessionStorage.setItem("editor_assets_cache", JSON.stringify(payload));
        } catch {
          // Ignore quota errors
        }

        if (isMounted) {
          setData(payload);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || "Failed to load assets");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadAssets();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
