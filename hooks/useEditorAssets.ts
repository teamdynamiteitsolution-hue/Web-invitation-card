"use client";

import { useState, useEffect } from "react";

interface EditorAssets {
  templates: any[];
  animations: any[];
  durations: any[];
}

export function useEditorAssets() {
  const [data, setData] = useState<EditorAssets | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadAssets() {
      try {
        setLoading(true);
        const res = await fetch("/api/create", { cache: "no-store" });
        if (!res.ok) {
          throw new Error("Failed to load editor assets");
        }
        const json = await res.json();
        const payload: EditorAssets = json.data || { templates: [], animations: [], durations: [] };

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
