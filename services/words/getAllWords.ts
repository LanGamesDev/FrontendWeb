import axios from "axios";
import { Word } from "../../types/words/Word";

const getAllWords = async(): Promise<Word[]> => {
    try {
        const words: Word[] = await axios.get('http://localhost:3001/api/words').then(resp => {
            return resp.data;
        });

        return words;
    } catch (error) {
        console.error("Error al obtener las palabras:", error);
        throw error;
    }
}

export default getAllWords