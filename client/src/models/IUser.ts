export interface IUser {
    id: string
    username: string
    name: string
    avatar: string
    friendStatus: 'add' | 'cancel' | 'accept' | 'remove' | 'owner'
}

export interface IUserFull extends IUser {
    bio: string
    city: string
    birthday: Date
    posts: number
    friends: number
    subscribers: number
}