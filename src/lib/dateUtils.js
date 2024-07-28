import {format, parse} from "date-fns";
import {es} from "date-fns/locale";

export const toFormatedTime = (time) => {
    return time ? format(time, "HH:mm", {locale: es}) : null
}

export const toFormatedDate = (date) => {
    return date ? format(date, "yyyy-MM-dd", {locale: es}) : null
}

export const toDate = (formatedDate) => {
    return formatedDate ? parse(`${formatedDate}T00:00:00`, "yyyy-MM-dd'T'HH:mm:ss", new Date()) : null;
}

export const toTime = (formatedTime) => {
    return formatedTime ? parse(`0001-01-01T${formatedTime}`, "yyyy-MM-dd'T'HH:mm:ss", new Date()) : null;
}
