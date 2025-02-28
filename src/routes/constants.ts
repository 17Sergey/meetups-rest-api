export const VERSIONS = {
  V1: "/v1",
};

export const ROUTES = {
  VERSIONS,
  AUTH: "/auth",
  MEETUPS: "/meetups",
  API_DOCS: "/api-docs",
};

export const routesHelpers = {
  buildVersionRoute(version: string, route: string) {
    return `${version}${route}`;
  },
};

export const authRoute = routesHelpers.buildVersionRoute(
  VERSIONS.V1,
  ROUTES.AUTH,
);
export const meetupsRoute = routesHelpers.buildVersionRoute(
  VERSIONS.V1,
  ROUTES.MEETUPS,
);
export const docsRoute = routesHelpers.buildVersionRoute(
  VERSIONS.V1,
  ROUTES.API_DOCS,
);
