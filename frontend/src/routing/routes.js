import AdminPage from "../pages/AdminPage";
import AdminProfilePage from "../pages/AdminProfilePage";
import EmployerPage from "../pages/EmployerPage";
import EmployerProfilePage from "../pages/EmployerProfilePage";
import HomePage from "../pages/HomePage";
import JobDetailsPage from "../pages/JobDetailsPage";
import JobSeekerPage from "../pages/JobSeekerPage";
import JobSeekerProfilePage from "../pages/JobSeekerProfilePage";
import JobsPage from "../pages/JobsPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

const JOB_DETAILS_HASH_PATTERN = /^#jobs\/([^/]+)$/;
const ADMIN_PROFILE_HASH_PATTERN = /^#admin\/profiles\/(seeker|employer)\/([^/]+)$/;

function createExactHashMatcher(expectedHash) {
  return (hash) => (hash === expectedHash ? {} : null);
}

function createPrefixHashMatcher(prefix) {
  return (hash) => (hash.startsWith(prefix) ? {} : null);
}

function createRegexHashMatcher(pattern, buildParams) {
  return (hash) => {
    const match = hash.match(pattern);
    return match ? buildParams(match) : null;
  };
}

const routeDefinitions = [
  {
    id: "login",
    match: createExactHashMatcher("#login"),
    component: LoginPage,
    publicOnly: true,
  },
  {
    id: "jobDetails",
    match: createRegexHashMatcher(JOB_DETAILS_HASH_PATTERN, (match) => ({
      jobId: match[1],
    })),
    component: JobDetailsPage,
    getProps: (params) => ({ jobId: params.jobId }),
  },
  {
    id: "jobs",
    match: createPrefixHashMatcher("#jobs"),
    component: JobsPage,
  },
  {
    id: "adminProfile",
    match: createRegexHashMatcher(ADMIN_PROFILE_HASH_PATTERN, (match) => ({
      profileRole: match[1],
      userId: match[2],
    })),
    component: AdminProfilePage,
    requiredRole: "admin",
    getProps: (params) => ({
      profileRole: params.profileRole,
      userId: params.userId,
    }),
  },
  {
    id: "admin",
    match: createPrefixHashMatcher("#admin"),
    component: AdminPage,
    requiredRole: "admin",
  },
  {
    id: "employerProfile",
    match: createPrefixHashMatcher("#employer-profile"),
    component: EmployerProfilePage,
    requiredRole: "employer",
  },
  {
    id: "employer",
    match: createPrefixHashMatcher("#employer"),
    component: EmployerPage,
    requiredRole: "employer",
  },
  {
    id: "jobSeekerProfile",
    match: createPrefixHashMatcher("#job-seeker-profile"),
    component: JobSeekerProfilePage,
    requiredRole: "seeker",
  },
  {
    id: "jobSeeker",
    match: createPrefixHashMatcher("#job-seeker"),
    component: JobSeekerPage,
    requiredRole: "seeker",
  },
  {
    id: "register",
    match: createExactHashMatcher("#register"),
    component: RegisterPage,
    publicOnly: true,
  },
  {
    id: "home",
    match: () => ({}),
    component: HomePage,
  },
];

export function getLandingHash(role) {
  if (role === "admin") return "#admin";
  if (role === "employer") return "#employer";
  return "#job-seeker";
}

export function getNavbarVariant(user) {
  if (user?.role === "admin") return "admin";
  if (user?.role === "seeker") return "jobSeeker";
  if (user?.role === "employer") return "employer";
  return "public";
}

export function resolveRoute(hash) {
  const normalizedHash = typeof hash === "string" ? hash : "";

  for (const routeDefinition of routeDefinitions) {
    const params = routeDefinition.match(normalizedHash);
    if (!params) {
      continue;
    }

    return {
      ...routeDefinition,
      params,
      props: routeDefinition.getProps ? routeDefinition.getProps(params) : {},
      renderKey: normalizedHash ? `${routeDefinition.id}:${normalizedHash}` : routeDefinition.id,
    };
  }

  return {
    ...routeDefinitions[routeDefinitions.length - 1],
    params: {},
    props: {},
    renderKey: "home",
  };
}

export function requiresResolvedSession(route) {
  return Boolean(route?.requiredRole || route?.publicOnly);
}

export function getRouteRedirect(route, user) {
  if (!route) {
    return null;
  }

  if (route.requiredRole) {
    if (!user) {
      return "#login";
    }

    if (user.role !== route.requiredRole) {
      return getLandingHash(user.role);
    }
  }

  if (route.publicOnly && user) {
    return getLandingHash(user.role);
  }

  return null;
}
