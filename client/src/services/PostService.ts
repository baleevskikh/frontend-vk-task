import $api from "../http";
import {AxiosResponse} from 'axios';
import {IPost} from "../models/IPost";

export default class PostService {
    static createPost(content: string, postImage: string): Promise<AxiosResponse<IPost>> {
        return $api.post<IPost>('/createPost', {content, postImage})
    }

    static getUserPosts(username: string): Promise<AxiosResponse<IPost[]>> {
        return $api.post<IPost[]>('/getUserPosts', {username})
    }

    static getTape(): Promise<AxiosResponse<IPost[]>> {
        return $api.get<IPost[]>('/getTape')
    }

    static toggleLike(postId: string): Promise<AxiosResponse<IPost[]>> {
        return $api.post<IPost[]>('/toggleLike', {postId})
    }
}