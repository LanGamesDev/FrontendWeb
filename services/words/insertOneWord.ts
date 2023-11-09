import axios from "axios";
import { Word } from "../../types/words/Word";
import { ROUTE_API_LOCAL } from "../../constants/general/ConstantsRoutes";

const insertOneWord = async(word: Word): Promise<Word> => {
    try {
        const newWord: Word = await axios.post(`${ROUTE_API_LOCAL}words`, word).then(resp => {
            return resp.data;
        });

        return newWord;
    } catch (error) {
        console.error("An error occurred while saving the word:", error);
        throw error;
    }
}

export default insertOneWord