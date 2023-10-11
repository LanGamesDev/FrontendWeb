import axios from "axios";
import { Word } from "../../types/words/Word";

const deleteOneWord = async(word: Word): Promise<Word> => {
    try {
        const deletedWords: Word = await axios.delete(`http://localhost:3001/api/words/${word.id}`).then(resp => {
            return resp.data;
        });

        return deletedWords;
    } catch (error) {
        console.error("An error occurred while deleting the word:", error);
        throw error;
    }
}

export default deleteOneWord