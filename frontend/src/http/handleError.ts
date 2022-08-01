import axios, { AxiosError } from "axios";
import { httpErrors } from './httpErrors';

const handleError = (error: Error | AxiosError | any): string => {
    if (axios.isAxiosError(error)) {
        if (error.response?.status === 504) return httpErrors.API_ERROR
        let message = typeof error.response !== "undefined" ? error.response.data.msg : httpErrors.UNKNOWN_ERROR;
        return message
    }
    return httpErrors.UNRESOLVED_ERROR
}

export default handleError