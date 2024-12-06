import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { publicUrl } from "@/modules/common/helpers/public-url";
import { App } from "./app";

import "@/modules/common/i18n/config";
import { ErrorBoundary } from "../common/ui/error-boundary";
import { InformedContextProvider } from "../common/contexts/informed";

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider manifestUrl={publicUrl("tonconnect-manifest.json")}>
        <InformedContextProvider>
          <App />
        </InformedContextProvider>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
