import {IUser} from "./IUser";

interface likes {

}

export interface IPost {
    _id: string
    content: string
    image: string
    likes: []
    author: IUser
    createdAt: Date
}