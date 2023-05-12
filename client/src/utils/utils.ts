import axios from "axios";
import {API_URL} from "../http";

export const pluralize = (count: number, v1: string, v2: string, v3: string) => {
    return (20 >= count && count >= 5) ? v3 : ((count % 10) === 1) ? v1 : (4 >= (count % 10) && (count % 10) >= 2) ? v2 : v3
}

export const uploadImage = async (file: File) => {
    const formData = new FormData()
    formData.append('image', file)

    const result = await axios.post(
        `${API_URL}/images`,
        formData
    )
    return result
}