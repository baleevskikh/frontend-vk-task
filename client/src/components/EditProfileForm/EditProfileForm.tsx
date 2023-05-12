import React, {ChangeEvent, useContext, useEffect, useRef, useState} from 'react';
import styles from './EditProfileForm.module.css'
import {Input} from "../../ui/Input";
import {Context} from "../../index";
import {useForm} from "react-hook-form";
import {IUserFull} from "../../models/IUser";
import UserService from "../../services/UserService";
import {Preloader} from "../Preloader";
import {Button} from "../../ui/Button";
import {Avatar} from "../../ui/Avatar";
import {Icon36CameraOutline} from '@vkontakte/icons';
import {uploadImage} from "../../utils/utils";

export const EditProfileForm = () => {
    const [username, setUsername] = useState<string>('')
    const [avatar, setAvatar] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(true)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState<string>('')

    const {store} = useContext(Context)

    const {register, handleSubmit, setValue, formState: {errors}} = useForm({})

    const [selectedImage, setSelectedImage] = useState<File>()

    const imageSelector = useRef<HTMLInputElement>(null)

    useEffect(() => {
        UserService.getUserById(store.user.id).then(response => {
            const user = response.data
            setUsername(user.name)
            setAvatar(user.avatar)
            setValue('avatar', user.avatar)
            setValue('username', user.username)
            setValue('name', user.name)
            setValue('bio', user.bio)
            setValue('birthday', user.birthday)
            setValue('city', user.city)
        }).catch().finally(() => setLoading(false))
    }, [])

    const pickImage = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            setSelectedImage(event.target.files[0])
            uploadImage(event.target.files[0]).then(response => {
                setValue('avatar', response.data.imageName)
            })
        }
    }

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        const response = await UserService.setUser(data)
        if (response?.status !== 200) setError('Неправильный логин или пароль')
        await store.checkAuth()
        setIsLoading(false)
    })

    if (loading) return <Preloader/>

    return (
        <form onSubmit={onSubmit} className={styles.EditProfileForm}>
            <div onClick={() => {
                imageSelector?.current?.click()
            }} className={styles.EditProfileForm__avatar_wrapper}>
                <div className={styles.EditProfileForm__avatar_input}><Icon36CameraOutline/></div>
                {selectedImage && <Avatar size={142} username={username} src={URL.createObjectURL(selectedImage)}/>}
                {!selectedImage && <Avatar size={142} username={username} src={avatar}/>}
            </div>
            <input
                style={{display: 'none'}}
                ref={imageSelector}
                accept={'image/*'}
                type={'file'}
                name={'avatar'}
                onChange={pickImage}
            />
            <Input
                stretched
                register={register}
                name={'username'}
                validationSchema={{required: true, minLength: 3, maxLength: 32}}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={errors.username ? 'Некорректный логин' : 'Логин'}
                error={Boolean(errors.username)}
                label
            />
            <Input
                stretched
                register={register}
                name={'name'}
                validationSchema={{required: true, minLength: 3, maxLength: 32}}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={errors.name ? 'Некорректное имя' : 'Имя'}
                error={Boolean(errors.name)}
                label
            />
            <Input
                stretched
                register={register}
                name={'bio'}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={'О себе'}
                label
            />
            <Input
                stretched
                type={'date'}
                register={register}
                validationSchema={{valueAsDate: true}}
                name={'birthday'}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={'Дата рождения'}
                label
            />
            <Input
                stretched
                register={register}
                name={'city'}
                className={styles.EditProfileForm__input}
                size={'lg'}
                placeholder={'Город'}
                label
            />
            <Button loading={isLoading} type={'submit'} size={'lg'} stretched>
                Сохранить
            </Button>
        </form>
    )
}