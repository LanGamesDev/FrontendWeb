import axios from "axios";
import { Word } from "../../types/words/Word";
import { ROUTE_API_LOCAL } from "../../utils/constants/general/ConstantsRoutes";

const updateOneWord = async(word: Word): Promise<Word> => {
    try {
        const updatedWord: Word = await axios.put(`${ROUTE_API_LOCAL}words/${word.id}`, word).then(resp => {
            return resp.data;
        });

        return updatedWord;
    } catch (error) {
        console.error("An error occurred while updating the word:", error);
        throw error;
    }
}

export default updateOneWord