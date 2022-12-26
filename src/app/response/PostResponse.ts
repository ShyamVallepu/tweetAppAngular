import { User } from "../models/UserRequest/user";


export interface PostResponse{
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    duration: string,
    tweetText: string,
    replyCounter: number,
    retweetCounter: number,
    likeCounter: number,
    retweetedBy?: User,
    quote?: PostResponse
}