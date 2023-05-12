import $api from "../http";
import {AxiosResponse} from 'axios';
import {IUser, IUserFull} from "../models/IUser";
import {FieldValues} from "react-hook-form";

export default class UserService {
    static getUserByUsername(username: string): Promise<AxiosResponse<IUserFull>> {
        return $api.post<IUserFull>('/getUserByUsername', {username})
    }

    static getUserById(id: string): Promise<AxiosResponse<IUserFull>> {
        return $api.post<IUserFull>('/getUserById', {id})
    }

    static setUser(data: FieldValues): Promise<AxiosResponse<IUserFull>> {
        return $api.post<IUserFull>('/setUser', data)
    }

    static getFriends(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/getFriends')
    }

    static addToFriend(id: string): Promise<AxiosResponse> {
        return $api.post('/addToFriend', {id})
    }

    static removeFriend(id: string): Promise<AxiosResponse> {
        return $api.post('/removeFriend', {id})
    }

    static searchUsers(query: string): Promise<AxiosResponse<IUser[]>> {
        return $api.post<IUser[]>('/searchUsers', {query})
    }
}