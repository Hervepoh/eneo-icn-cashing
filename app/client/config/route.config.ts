import { Language } from "./language.config";

/**
 * An Array of routes that are available  in the navigation bar 
 * @type {string[]}
 */
export const navbarRoutes: {href:string,label:string}[] = [
    {
        href: "/",
        label: Language.overview["fr"]
    },
    {
        href: "/requests",
        label: Language.demand["fr"]
    },
    {
        href: "/accounts",
        label: "Gestion ACI",
    },
    {
        href: "/categories",
        label: "Impayés ACI",
    },
    {
        href: "/categories",
        label: "Journal ACI",
    },
    {
        href: "/settings",
        label: "Settings",
    },
];

/**
 * An Array of routes that are available to the public.
 * Theses routes do not require authentication  
 * @type {string[]}
 */
export const publicRoutes: string[] = [
    "/public",
];

/**
 * Magic link Login path 
 * @type {string}
 */
export const URI_LOGIN_MAGIC: string = "/auth/sign-magic";

/**
 * Login path 
 * @type {string}
 */
export const URI_LOGIN: string = "/login";

/**
 * Regitration path 
 * @type {string}
 */
export const URI_REGISTER: string = "/register";
/**
 * An Array of routes that are used for authentication
 * Theses routes will redirect logged un users to /settings
 * @type {string[]}
 */
export const authRoutes: string[] = [
    URI_LOGIN_MAGIC,
    URI_LOGIN,
    URI_REGISTER,
];

/**
 * The prefix for API authentication reoutes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = "/api/auth"

/**
 * The default redirect path after login
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT_URI: string = "/";