class UserAuthDto {
    id
    username
    name
    avatar

    constructor(model) {
        this.id = model._id
        this.username = model.username
        this.name = model.name
        this.avatar = model.avatar
    }
}

class UserDto {
    id
    username
    name
    bio
    birthday
    city
    avatar

    constructor(model) {
        this.id = model._id
        this.username = model.username
        this.name = model.name
        this.bio = model.bio
        this.birthday = model.birthday
        this.city = model.city
        this.avatar = model.avatar
    }
}

class UserSerialize {
    username
    name
    bio
    birthday
    city
    avatar

    constructor(model) {
        this.username = model.username
        this.name = model.name
        this.bio = model.bio
        this.birthday = model.birthday
        this.city = model.city
        this.avatar = model.avatar ? model.avatar.includes(process.env.SERVER_URL) ? model.avatar : `${process.env.SERVER_URL}/api/images/${model.avatar}` : model.avatar
    }
}


module.exports = {UserAuthDto, UserDto, UserSerialize}