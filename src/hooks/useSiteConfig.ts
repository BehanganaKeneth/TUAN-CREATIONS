import { useEffect, useState } from "react";
import { getSiteConfig, SiteConfig } from "../services/api";

let configCache: SiteConfig | null = null;
let configPromise: Promise<SiteConfig> | null = null;

export function useSiteConfig(): [SiteConfig, boolean, string | null] {
  const [config, setConfig] = useState<SiteConfig>(configCache || {});
  const [isLoading, setIsLoading] = useState(!configCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (configCache) {
      setConfig(configCache);
      setIsLoading(false);
      return;
    }

    if (!configPromise) {
      configPromise = getSiteConfig().then((data) => {
        configCache = data;
        return data;
      });
    }

    configPromise
      .then((data) => {
        setConfig(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError((err as Error).message);
        setIsLoading(false);
      });
  }, []);

  return [config, isLoading, error];
}
