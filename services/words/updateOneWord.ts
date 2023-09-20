import axios from "axios";
import { Word } from "../../types/words/Word";

const updateOneWord = async(word: Word): Promise<Word> => {
    try {
        const updatedWord: Word = await axios.put(`http://localhost:3001/api/words/${word.id}`, word).then(resp => {
            return resp.data;
        });

        return updatedWord;
    } catch (error) {
        console.error("Error al obtener las palabras:", error);
        throw error;
    }
}

export default updateOneWord