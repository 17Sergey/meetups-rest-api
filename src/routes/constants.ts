export const VERSIONS = {
  V1: "/v1",
};

export const ROUTES = {
  VERSIONS,
  AUTH: "/auth",
  MEETUPS: "/meetups",
  USERS: "/users",
};

export const routesHelpers = {
  getAuthRoute(version = VERSIONS.V1) {
    return this.buildVersionRoute(version, ROUTES.AUTH);
  },
  getMeetupsRoute(version = VERSIONS.V1) {
    return this.buildVersionRoute(version, ROUTES.MEETUPS);
  },
  getUsersRoute(version = VERSIONS.V1) {
    return this.buildVersionRoute(version, ROUTES.USERS);
  },

  buildVersionRoute(version: string, route: string) {
    return `${version}${route}`;
  },
};

export const authRoute = routesHelpers.getAuthRoute();
export const meetupsRoute = routesHelpers.getMeetupsRoute();
export const usersRoute = routesHelpers.getUsersRoute();
