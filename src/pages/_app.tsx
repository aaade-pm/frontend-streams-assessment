import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { inter, bricolage } from "@/styles/font";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <main className={`${inter.variable} ${bricolage.variable}`}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </ErrorBoundary>
  );
}
