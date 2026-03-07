import User from "../models/User.js";

export async function findByEmail(email) {
    return User.findOne({ email });
}

export async function findById(userId) {
    return User.findById(userId);
}

export async function createUser(userData) {
    return User.create(userData);
}

export async function saveUser(user) {
    return user.save();
}



export async function setRefreshTokenHash(userId, refreshTokenHash) {
    return User.findByIdAndUpdate(
        userId,
        { refreshTokenHash },
        { new: true }
    );
}

export async function clearRefreshTokenHash(userId) {
    return User.findByIdAndUpdate(
        userId,
        { refreshTokenHash: null },
        { new: true }
    );
}
