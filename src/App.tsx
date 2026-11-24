import { useEffect, useState } from "react";
import { PreviewRibbon } from "./components/Shared";
import { LandingPage } from "./components/LandingPage";
import { StrategyPage } from "./components/StrategyPage";
import { track } from "./lib/analytics";

type Route = "landing" | "strategy";

const BASE_TITLE = "Balloon Decor in London | Breathtaking Balloon Co.";
const STRATEGY_TITLE = "Strategy Brief | Breathtaking Balloon Co.";

function routeFromHash(): Route {
  return window.location.hash.startsWith("#/strategy") ? "strategy" : "landing";
}

export default function App() {
  const [route, setRoute] = useState<Route>(() => routeFromHash());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(routeFromHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = route === "strategy" ? STRATEGY_TITLE : BASE_TITLE;
    if (route === "strategy") track("strategy_room_open", { source: "preview_nav" });
  }, [route]);

  function go(next: Route) {
    window.location.hash = next === "strategy" ? "#/strategy" : "#/";
    setRoute(next);
    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("main-content")?.focus({ preventScroll: true });
  }

  return (
    <div className="min-h-screen bg-ivory text-ink">
      <a
        href="#main-content"
        onClick={(event) => {
          event.preventDefault();
          const target = document.getElementById("main-content");
          target?.focus();
          target?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        className="sr-only z-[200] bg-butter px-4 py-3 text-sm font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-sm"
      >
        Skip to page content
      </a>

      <PreviewRibbon
        mode={route}
        onNavigate={() => go(route === "landing" ? "strategy" : "landing")}
      />

      <div id="main-content" tabIndex={-1} className="outline-none">
        {route === "landing" ? (
          <LandingPage onOpenStrategy={() => go("strategy")} />
        ) : (
          <StrategyPage onOpenLanding={() => go("landing")} />
        )}
      </div>
    </div>
  );
}
