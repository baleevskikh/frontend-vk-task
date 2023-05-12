import React, {ChangeEvent, useContext, useRef, useState} from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './PostForm.module.css'
import {Avatar} from "../../ui/Avatar";
import {Button} from "../../ui/Button";
import {Icon24PictureOutline, Icon24Cancel} from '@vkontakte/icons';
import PostService from "../../services/PostService";
import {Spinner} from "../../ui/Spinner";
import {uploadImage} from "../../utils/utils";
import {IPost} from "../../models/IPost";
import {Post} from "../Post";
import {List} from "../List";
import {Context} from "../../index";

export const PostForm = () => {

    const {store} = useContext(Context)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [selectedImage, setSelectedImage] = useState<File>()

    const imageSelector = useRef<HTMLInputElement>(null)

    const [postData, setPostData] = useState({text: '', image: ''})

    const [posts, setPosts] = useState<IPost[]>([])

    const createPost = async () => {
        setIsLoading(true)
        await PostService.createPost(postData.text, postData.image).then(response => {
            setPosts([response.data, ...posts])
        }).catch(error => {
        })
        setPostData({text: '', image: ''})
        setSelectedImage(undefined)
        setIsLoading(false)
    }

    const pickImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setSelectedImage(event.target.files[0])
            uploadImage(event.target.files[0]).then(response => {
                setPostData({text: postData.text, image: response.data.imageName})
            })
        }
    }

    const unpickImage = () => {
        setSelectedImage(undefined)
        setPostData({text: postData.text, image: ''})
    }

    return (
        <>
            <div className={styles.PostForm}>
                {isLoading && <div className={styles.PostForm__loader}><Spinner/></div>}
                <Avatar username={store.user.name} size={48} src={store.user.avatar}/>
                <div className={styles.PostForm__left}>
                    <div className={styles.PostForm__field_wrapper}>
                        <TextareaAutosize
                            value={postData.text}
                            onChange={(e) => {
                                setPostData({text: e.target.value, image: postData.image})
                            }}
                            placeholder={'Что у вас новго?'}
                            className={styles.PostForm__field}
                        />
                        {selectedImage && (
                            <div className={styles.PostForm__image_wrapper}>
                                <div className={styles.PostForm__image_remove}>
                                    <button onClick={unpickImage}
                                            className={styles.PostForm__action_button}>
                                        <Icon24Cancel/>
                                    </button>
                                </div>
                                <img
                                    className={styles.PostForm__image}
                                    alt="not found"
                                    src={URL.createObjectURL(selectedImage)}
                                />
                            </div>
                        )}
                    </div>
                    <div className={styles.PostForm__actions}>
                        <button
                            onClick={() => {
                                imageSelector?.current?.click()
                            }}
                            className={styles.PostForm__action_button}
                        >
                            <Icon24PictureOutline/>
                        </button>
                        <Button
                            disabled={postData.text === '' && postData.image === ''}
                            onClick={createPost}
                            size={'sm'}
                            mode={'primary'}
                        >
                            Опубликовать
                        </Button>
                    </div>
                    <input
                        style={{display: 'none'}}
                        ref={imageSelector}
                        accept={'image/*'}
                        type={'file'}
                        name={'image'}
                        onChange={pickImage}
                    />
                </div>
            </div>
            <List items={posts} renderItem={(post: IPost) => <Post post={post} key={post._id}/>}/>
        </>
    )
}
