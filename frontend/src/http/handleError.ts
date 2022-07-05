import axios, { AxiosError } from "axios";

const handleError = (error: Error | AxiosError | any): string => {
    if (axios.isAxiosError(error)) {
        let message = typeof error.response !== "undefined" ? error.response.data.msg : "Unknown error";
        return message
    }
    return "Unresolved error!"
}

export default handleError