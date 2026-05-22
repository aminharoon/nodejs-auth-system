import { api } from '../../../utils/api.url.js';

export const register = async () => {
    try {

        const response = await api.post("/register", {

        })

    } catch (e) {
        throw new Error("something went wrong ", e.message)

    }
}