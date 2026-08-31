import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";

import poppins900 from "../assets/fonts/poppins-900-latin.woff2";
import landingCss from "../styles/landing.css?inline";

const pageStyle: CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: 16,
  background: "#fff",
  color: "#172033",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const contentStyle: CSSProperties = { width: "100%", maxWidth: 448, textAlign: "center" };

const primaryLinkStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minHeight: 44,
  padding: "10px 16px",
  borderRadius: 8,
  background: "#172033",
  color: "#fff",
  fontSize: 14,
  fontWeight: 700,
  textDecoration: "none",
};

function NotFoundComponent() {
  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <h1 style={{ margin: 0, fontSize: 72, lineHeight: 1, fontWeight: 800 }}>404</h1>
        <h2 style={{ margin: "16px 0 0", fontSize: 22 }}>Página no encontrada</h2>
        <p style={{ margin: "8px 0 24px", color: "#5e6874", fontSize: 14 }}>
          La página que buscas no existe o fue movida.
        </p>
        <a href="/" style={primaryLinkStyle}>
          Volver al inicio
        </a>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error; reset: () => void }) {
  console.error(error);

  return (
    <div style={pageStyle}>
      <div style={contentStyle}>
        <h1 style={{ margin: 0, fontSize: 22 }}>No fue posible cargar esta página</h1>
        <p style={{ margin: "8px 0 24px", color: "#5e6874", fontSize: 14 }}>
          Actualiza la página o vuelve al inicio para intentarlo nuevamente.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
          <a href="" style={primaryLinkStyle}>
            Intentar de nuevo
          </a>
          <a href="/" style={{ ...primaryLinkStyle, background: "#eef1f3", color: "#172033" }}>
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<Record<string, never>>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [{ rel: "icon", href: "/favicon.ico", type: "image/x-icon" }],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="script-src 'unsafe-inline'; font-src 'self' data:"
        />
        <meta name="theme-color" content="#fff9f1" />
        <title>+1000 Ejercicios Adaptados para Adultos Mayores</title>
        <meta
          name="description"
          content="Kit con más de 1000 ejercicios y actividades adaptadas para adultos mayores, organizados por nivel y objetivo."
        />
        <meta property="og:title" content="+1000 Ejercicios Adaptados para Adultos Mayores" />
        <meta
          property="og:description"
          content="Kit con más de 1000 ejercicios y actividades adaptadas para adultos mayores, organizados por nivel y objetivo."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preload" as="font" href={poppins900} type="font/woff2" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{ __html: landingCss }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
