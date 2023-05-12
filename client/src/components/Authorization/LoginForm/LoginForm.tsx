import React, {useContext, useState} from 'react'
import {useForm} from 'react-hook-form'
import {Link} from "react-router-dom"
import styles from '../Authorization.module.css'
import {Input} from '../../../ui/Input'
import {Button} from '../../../ui/Button'
import {Context} from "../../../index"

export const LoginForm = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [error, setError] = useState<string>('')

    const {store} = useContext(Context)

    const {register, handleSubmit, formState: {errors}} = useForm({})

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true)
        const response = await store.login(data.username, data.password)
        if (response?.status !== 200) setError('Неправильный логин или пароль')
        setIsLoading(false)
    })


    return (
        <form onSubmit={onSubmit}>
            <h1 className={styles.Authorization__title}>Авторизация</h1>
            {/*{error && <p>{error}</p>}*/}
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
                name={'password'}
                validationSchema={{required: true, minLength: 6, maxLength: 256}}
                type={"password"}
                className={styles.Authorization__input}
                size={'lg'}
                placeholder={errors.password ? 'Некорректный пароль' : 'Пароль'}
                error={Boolean(errors.password)}
                label
            />
            <Button loading={isLoading} type={'submit'} className={styles.Authorization__button} size={'lg'} stretched>
                Войти
            </Button>
            <p className={styles.Authorization__action}>
                Не учетной записи?<Link to={'/join'}> Зарегистрируйтесь</Link>
            </p>
        </form>
    )
}
