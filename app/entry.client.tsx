import { RemixBrowser, useLocation, useMatches } from "@remix-run/react";
import { hydrate } from "react-dom";
import * as Sentry from "@sentry/remix";
import { useEffect } from "react";

Sentry.init({
    dsn: window.GLOBALS.SENTRY_DSN,
    tracesSampleRate: 1.0,
    integrations: [
        new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.remixRouterInstrumentation(
                useEffect,
                useLocation,
                useMatches,
            ),
        }),
    ],
    release: "0.0.1"
});

declare global {
    interface Window {
        GLOBALS: Record<string, string | undefined>;
    }
}

hydrate(<RemixBrowser />, document);
