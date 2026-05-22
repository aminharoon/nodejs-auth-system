export const generateAccessAndRefreshToken = async (user) => {
    try {
        const AccessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save();
        return { AccessToken, refreshToken }


    } catch (e) {
        console.log("something went wrong ")

    }

}

