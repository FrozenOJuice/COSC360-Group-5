import { useEffect } from "react";
import { getRouteRedirect, requiresResolvedSession } from "./routes";

function RouteGuard({ route, authLoading, authUser }) {
  const shouldWaitForSession = authLoading && requiresResolvedSession(route);
  const redirectHash = shouldWaitForSession ? null : getRouteRedirect(route, authUser);

  useEffect(() => {
    if (!redirectHash || window.location.hash === redirectHash) {
      return;
    }

    window.location.hash = redirectHash;
  }, [redirectHash]);

  if (shouldWaitForSession) {
    return <main className="page-status">Checking session...</main>;
  }

  if (redirectHash) {
    return null;
  }

  const RouteComponent = route.component;
  return <RouteComponent key={route.renderKey} {...route.props} />;
}

export default RouteGuard;
