import { Status } from "./status";

export interface Article {
    id: string,
    title: string,
    image: string,
    description: string,
    content: string
    location: string,
    timeToShow: Date,
    status: Status
}