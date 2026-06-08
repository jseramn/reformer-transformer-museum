"use client";

import en from "@/messages/en.json";
import es from "@/messages/es.json";
import { useI18n, type Locale } from "./provider";

const messages: Record<Locale, typeof es> = {
  es,
  en,
};

type Messages = typeof es;

export function useTranslations(): Messages {
  const { locale } = useI18n();
  return messages[locale];
}