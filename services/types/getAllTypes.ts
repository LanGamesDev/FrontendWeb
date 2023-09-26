import axios from "axios";
import { Word } from "../../types/words/Word";

const getAllTypes = async(): Promise<Word[]> => {
    try {
        const words: Word[] = await axios.get('http://localhost:3001/api/types').then(resp => {
            return resp.data;
        });

        return words;
    } catch (error) {
        console.error("Error getting types:", error);
        throw error;
    }
}

export default getAllTypes