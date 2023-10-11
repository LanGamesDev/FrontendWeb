import axios from "axios";
import { Word } from "../../types/words/Word";

const insertOneWord = async(word: Word): Promise<Word> => {
    try {
        const newWord: Word = await axios.post('http://localhost:3001/api/words', word).then(resp => {
            return resp.data;
        });

        return newWord;
    } catch (error) {
        console.error("An error occurred while saving the word:", error);
        throw error;
    }
}

export default insertOneWord