import { Panel } from "primereact/panel";
import { Question } from '../../../types/words/Question';
import { InputText } from "primereact/inputtext";
import { STATE_TRANSLATEGAME_SENDED } from "../../../utils/constants/general/ConstantsForms";
import { Fieldset } from 'primereact/fieldset';

interface TranslateGameResultsProps {
    questions: Question[]
    status: number
    validateAnswer: (question: Question) => boolean
}

const TranslateGameResults: React.FC<TranslateGameResultsProps> = ({questions, status, validateAnswer}) => {
    
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
                        {(status === STATE_TRANSLATEGAME_SENDED) &&
                            <div className="d-flex align-items-center">
                                {
                                    (validateAnswer(question)) 
                                    ? <i className="pi pi-check-circle ms-2" style={{ color: 'green', fontSize: '2rem' }}></i>
                                    : <i className="pi pi-times-circle ms-2" style={{ color: 'red', fontSize: '2rem' }}></i>
                                }
                            </div>
                        }
                    </div>
                    {(status === STATE_TRANSLATEGAME_SENDED) &&
                        <div>
                            <ul>
                                {
                                    question.word.translates!.map((translate, index1)=>(
                                        <li key={index1}>{translate.content}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </Panel>

            )}
        </div>
    )
}

export default TranslateGameResults;