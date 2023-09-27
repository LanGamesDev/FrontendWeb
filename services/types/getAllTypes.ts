import axios from "axios";
import { Type } from "../../types/general/Type";

const getAllTypes = async(): Promise<Type[]> => {
    try {
        const types: Type[] = await axios.get('http://localhost:3001/api/types').then(resp => {
            return resp.data;
        });

        return types;
    } catch (error) {
        console.error("Error getting types:", error);
        throw error;
    }
}

export default getAllTypes