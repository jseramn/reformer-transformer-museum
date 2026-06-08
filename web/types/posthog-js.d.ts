import "posthog-js";

declare module "posthog-js" {
  interface PostHog {
    __loaded?: boolean;
  }
}