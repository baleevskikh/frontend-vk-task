import React, {FC} from 'react'
import styles from './Post.module.css'
import {IPost} from "../../models/IPost";
import {Avatar} from "../../ui/Avatar";
import {Icon20LikeOutline} from "@vkontakte/icons";
import {format} from "date-fns";

interface PostProps {
    post: IPost
}

export const Post: FC<PostProps> = ({post}) => {
    return (
        <div className={styles.Post}>
            <Avatar username={post.author.name} size={48} src={post.author.avatar}/>
            <div className={styles['Post--left']}>
                <div className={styles.Post__header_info}>
                    <span className={styles['Post__header_info--user']}>{post.author.name}</span>
                    <span className={styles['Post__header_info--other']}>@{post.author.username}</span>
                    <span className={styles['Post__header_info--other']}><span>&#183;</span></span>
                    <span className={styles['Post__header_info--other']}>
                        {format(new Date(post.createdAt), 'dd.MM.yyyy HH:mm')}
                    </span>
                </div>
                <p className={styles.Post__content}>
                    {post.content}
                </p>
                {post.image && <img className={styles.Post__image} src={post.image} alt={post.content}/>}
                <div className={styles.Post__bottom_action}>
                    <div className={styles.LikeButton}>
                        <Icon20LikeOutline/> {post.likes.length}
                    </div>
                </div>
            </div>
        </div>
    )
}