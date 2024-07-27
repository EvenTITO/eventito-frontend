const APP_URL = "https://gateway-pv5n.onrender.com"
export const USERS_URL = `${APP_URL}/api/v1/users`
export const EVENTS_URL = `${APP_URL}/api/v1/events`
export const HOME_PATH = "/"
export const LOGIN_PATH = "/login"
export const SIGNUP_PATH = "/sing-up"
export const FORGOT_PASSWORD_PATH = "/forgot-password"
export const PRIVATE_POLICY_PATH = "/private-policy"
export const TERMS_CONDITIONS_PATH = "/terms-and-conditions"


export const USER_ROLES = [
    {
        key: "ADMIN",
        label: "Administrador"
    }, {
        key: "EVENT_CREATOR",
        label: "Creador de eventos"
    }, {
        key: "DEFAULT",
        label: "Default"
    }
]


export const EVENT_ROLES = [
    {
        key: "ORGANIZER",
        label: "Organizador"
    }, {
        key: "REVIEWER",
        label: "Revisor"
    }
]
