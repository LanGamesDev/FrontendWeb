import axios from "axios";
import { Word } from "../../types/words/Word";
import { MessageService } from "../../types/general/MessageService";
import { MSG_TYPE_ERROR, MSG_TYPE_SUCCESS, ROUTE_API_LOCAL } from "../../utils/constants/general/ConstantsRoutes";

const getAllWords = async(): Promise<MessageService> => {
    try {
        const words: Word[] = await axios.get(`${ROUTE_API_LOCAL}words`).then(resp => {
            return resp.data;
        })
        .catch(error => {
            throw error;
        });

        return {type: MSG_TYPE_SUCCESS, data: words, message: ''};
    } catch (error: any) {
        const errorMessage: string = "An error occurred while fetching the words: " + error.message;
        console.error(errorMessage);
        return {type: MSG_TYPE_ERROR, data: null, message: errorMessage};
    }
}

export default getAllWords