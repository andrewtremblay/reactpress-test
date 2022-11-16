export const rootPath =
  process.env.NODE_ENV === "production" ? "/blog/reactpress-test" : "/";

type RoutePattern = `${typeof rootPath}${string}`;

export const ROUTES: { [key: string]: RoutePattern } = {
  HOME: `${rootPath}`,
  LOGIN: `${rootPath}login`,
  REGISTER: `${rootPath}register`,
} as const;
