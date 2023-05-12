import React, {useContext, useState} from 'react';
import {Link} from "react-router-dom";
import styles from '../Authorization.module.css'
import {Input} from '../../../ui/Input';
import {Button} from '../../../ui/Button'
import {Context} from "../../../index";
import {useForm} from "react-hook-form";

export const RegistrationForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState<string>('')

    const {store} = useContext(Context)

    const {register, handleSubmit, formState: {errors}} = useForm({})

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        const response = await store.registration(data.username, data.name, data.password)
        if (response?.status !== 200) setError('Ошибка при регистрации')
        setIsLoading(false)
    })

    return (
        <form onSubmit={onSubmit}>
            <h1 className={styles.Authorization__title}>Регистрация</h1>
            <Input
                register={register}
                name={'username'}
                validationSchema={{required: true, minLength: 3, maxLength: 32}}
                className={styles.Authorization__input}
                size={'lg'}
                placeholder={errors.username ? 'Некорректный логин' : 'Логин'}
                error={Boolean(errors.username)}
                label
            />
            <Input
                register={register}
                name={'name'}
                validationSchema={{required: true, minLength: 3, maxLength: 32}}
                className={styles.Authorization__input}
                size={'lg'}
                placeholder={errors.name ? 'Некорректное имя' : 'Имя'}
                error={Boolean(errors.name)}
                label
            />
            <Input
                register={register}
                name={'password'}
                validationSchema={{required: true, minLength: 6, maxLength: 256}}
                type={"password"}
                className={styles.Authorization__input}
                size={'lg'}
                placeholder={errors.password ? 'Некорректный пароль' : 'Пароль'}
                error={Boolean(errors.password)}
                label
            />
            <Button loading={isLoading} className={styles.Authorization__button} size={'lg'} stretched>
                Зарегистрироваться
            </Button>
            <p className={styles.Authorization__action}>Уже есть учетная запись? <Link to={'/login'}>Войти</Link></p>
        </form>
    )
}
