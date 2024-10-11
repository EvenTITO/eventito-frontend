import { EVENTS_URL, USERS_URL } from '@/lib/Constants'
import { HTTPClient } from './HTTPClient'

export const eventsClient = new HTTPClient(EVENTS_URL)
export const usersClient = new HTTPClient(USERS_URL)
