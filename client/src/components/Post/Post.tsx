import React, {FC, useContext, useEffect, useState} from 'react'
import styles from './Post.module.css'
import {IPost} from "../../models/IPost";
import {Avatar} from "../../ui/Avatar";
import {Icon20LikeOutline, Icon20Like} from "@vkontakte/icons";
import {format} from "date-fns";
import PostService from "../../services/PostService";
import {Context, store} from "../../index";
import clsx from "clsx";
import {useNavigate} from "react-router-dom";

interface PostProps {
    post: IPost
}

export const Post: FC<PostProps> = ({post}) => {

    const {store} = useContext(Context)

    const [likeNumber, setLikeNumber] = useState<number>(0)

    const [isLiked, setIsLiked] = useState<boolean>(false)

    useEffect(() => {
        setIsLiked(post.likes.includes(store.user.id))
        setLikeNumber(post.likes.length)
    }, [])

    const toggleLike = async () => {
        await PostService.toggleLike(post._id).catch(error => {
            console.log()
        })
        setLikeNumber(likeNumber + (isLiked ? -1 : 1))
        setIsLiked(!isLiked)
    }

    const navigate = useNavigate();

    function handleClick() {
        navigate(`/profile/${post.author.username}`);
    }

    return (
        <div className={styles.Post}>
            <div onClick={handleClick}>
                <Avatar username={post.author.name} size={48} src={post.author.avatar}/>
            </div>
            <div className={styles['Post--left']}>
                <div onClick={handleClick} className={styles.Post__header_info}>
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
                {store.isAuth &&
                    <div className={styles.Post__bottom_action}>
                        <div
                            className={clsx(
                                styles.LikeButton,
                                isLiked && styles['LikeButton--active']
                            )}
                            onClick={toggleLike}
                        >
                            {isLiked ? <Icon20Like/> : <Icon20LikeOutline/>}
                            {likeNumber}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}