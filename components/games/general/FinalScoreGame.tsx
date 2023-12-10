import { COLOR_RESULT_DANGER, COLOR_RESULT_SUCCESS, COLOR_RESULT_WARNING } from "../../../utils/constants/general/ConstantsForms";
import { Question } from "../../../types/words/Question";
import { Knob } from 'primereact/knob';

interface FinalScoreGameProps {
    questions: Question[]
    validateAnswer: (question: Question) => boolean
}

const FinalScoreGame: React.FC<FinalScoreGameProps> = ({questions, validateAnswer}) => {

    const finalScore: number = questions.filter((question: Question)=>{
        return validateAnswer(question);
    }).length;

    const percentScore: number = finalScore/questions.length*100;

    let colorScore: string = "";

    if (percentScore < 40) {
        colorScore = COLOR_RESULT_DANGER;
    } else if (percentScore >= 40 && percentScore < 80) {
        colorScore = COLOR_RESULT_WARNING;
    } else if (percentScore >= 80) {
        colorScore = COLOR_RESULT_SUCCESS;
    }
    
    return (
        <div className="d-flex justify-content-center">
            <Knob value={percentScore} valueColor={colorScore} rangeColor="#CACACA" readOnly valueTemplate={`${finalScore.toString()} / ${questions.length.toString()}`} size={200}/>
        </div>
    )
}

export default FinalScoreGame;