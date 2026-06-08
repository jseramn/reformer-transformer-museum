"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { captureLanguageChange } from "@/lib/analytics/posthog-client";

export type Locale = "es" | "en";

const STORAGE_KEY = "museo-reformer-locale";
const DEFAULT_LOCALE: Locale = "es";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function parseLocale(value: string | null): Locale {
  if (value === "es" || value === "en") return value;
  return DEFAULT_LOCALE;
}

function getLocaleSnapshot(): Locale {
  return parseLocale(localStorage.getItem(STORAGE_KEY));
}

function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function subscribeToLocale(callback: () => void): () => void {
  const handler = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  window.addEventListener("locale-change", callback);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("locale-change", callback);
  };
}

function useLocaleStorage(): [Locale, (locale: Locale) => void] {
  const locale = useSyncExternalStore(
    subscribeToLocale,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );

  const setLocale = useCallback((next: Locale) => {
    localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event("locale-change"));
  }, []);

  return [locale, setLocale];
}

type I18nProviderProps = {
  children: ReactNode;
};

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useLocaleStorage();
  const localeRef = useRef(locale);
  localeRef.current = locale;

  const setLocale = useCallback((next: Locale) => {
    const previous = localeRef.current;
    if (previous === next) return;
    setLocaleState(next);
    captureLanguageChange(previous, next);
  }, [setLocaleState]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale],
  );

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}