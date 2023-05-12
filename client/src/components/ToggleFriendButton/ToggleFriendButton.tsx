import React, {FC, useState} from 'react'
import UserService from "../../services/UserService";
import {Button, ButtonProps} from "../../ui/Button/Button";

interface ToggleFriendButtonProps extends ButtonProps {
    userId: string
    friendStatus: 'add' | 'cancel' | 'accept' | 'remove' | 'owner'
}

export const ToggleFriendButton: FC<ToggleFriendButtonProps> = ({userId, friendStatus, ...restProps}) => {
    const [status, setStatus] = useState(friendStatus)

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const addToFriend = async () => {
        setIsLoading(true)
        await UserService.addToFriend(userId).catch(error => {
        })
        setIsLoading(false)
        setStatus(status === 'add' ? 'cancel' : 'remove')
    }

    const removeFriend = async () => {
        setIsLoading(true)
        await UserService.removeFriend(userId).catch(error => {
        })
        setIsLoading(false)
        setStatus('add')
    }

    switch (status) {
        case 'add':
            return <Button loading={isLoading} onClick={addToFriend} {...restProps}>Добавить</Button>
        case 'cancel':
            return <Button loading={isLoading} onClick={removeFriend} mode={'bordered'} {...restProps}>Отменить</Button>
        case 'accept':
            return <Button loading={isLoading} onClick={addToFriend} {...restProps}>Принять</Button>
        case 'remove':
            return <Button loading={isLoading} onClick={removeFriend} mode={'bordered'} {...restProps}>Удалить</Button>
        default:
            return <></>
    }
}