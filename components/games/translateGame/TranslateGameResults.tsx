import { Panel } from "primereact/panel";
import { Question } from '../../../types/words/Question';
import { InputText } from "primereact/inputtext";

interface TranslateGameResultsProps {
    questions: Question[]
    status: number
}

const TranslateGameResults: React.FC<TranslateGameResultsProps> = ({questions, status}) => {
    
    return (
        <div>
            {questions.map((question, index)=>

                <Panel key={index} header={`Question No. ${index + 1}`} className="mb-2" toggleable>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center" style={{ flex: '1' }}>
                            <p className="m-0">{question.word!.content}</p>
                        </div>
                        <div style={{ flex: '1' }}>
                            <InputText id="answer" value={question.answer} required autoComplete='off' className={`form-control`} autoFocus={true} disabled={true}/>
                        </div>
                    </div>
                </Panel>

            )}
        </div>
    )
}

export default TranslateGameResults;