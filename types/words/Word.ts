import { Translate } from "./Translate";

export type Word = {
    id?: number;
    content?: string;
    context?: string;
    translates?: Translate[];
    createdDate?: Date;
    updatedDate?: Date;
}