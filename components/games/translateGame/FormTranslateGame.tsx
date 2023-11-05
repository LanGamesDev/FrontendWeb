import { Word } from "../../../types/words/Word";
import QuestionTranslate from "./QuestionTranslate";

interface FormTranslateGameProps {
    words: Word[]
}

const FormTranslateGame: React.FC<FormTranslateGameProps> = ({words}) => {
    return (
        <div>
            {words.map((item, index) => (
                <QuestionTranslate key={index} word={item} index={index}></QuestionTranslate>
            ))}
        </div>
    )
}

export default FormTranslateGame;