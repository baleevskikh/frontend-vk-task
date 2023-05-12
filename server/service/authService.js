const User = require('../models/User')
const ApiError = require("../exceptions/apiError");
const bcrypt = require("bcrypt");
const tokenService = require('./tokenService')
const {UserAuthDto} = require("../dtos/userDto");

class AuthService {
    async registration(username, name, password) {
        const candidate = await User.findOne({username})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с логином ${username} уже существует`)
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await User.create({username, name, password: hashPassword})
        const userDto = new UserAuthDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }

    async login(username, password) {
        const user = await User.findOne({username})
        if (!user) {
            throw ApiError.BadRequest('Пользователь с таким логином не найден')
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserAuthDto(user);
        const tokens = tokenService.generateTokens({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return {...tokens, user: userDto}
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)

        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await User.findById(userData.id)
        const userDto = new UserAuthDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens, user: userDto}
    }
}

module.exports = new AuthService()