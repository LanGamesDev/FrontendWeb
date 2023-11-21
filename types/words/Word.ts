import { Translate } from "./Translate";

export type Word = {
    id?: number;
    content?: string;
    translates?: Translate[];
    createdDate?: Date;
    updatedDate?: Date;
}