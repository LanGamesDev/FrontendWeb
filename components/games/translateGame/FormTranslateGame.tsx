import { Panel } from "primereact/panel";
import { Question } from "../../../types/words/Question";
import { InputText } from "primereact/inputtext";
import TranslateGameResults from "./TranslateGameResults";

interface FormTranslateGameProps {
    questions: Question[]
    currentQuestion: number
    formik: any
}

const FormTranslateGame: React.FC<FormTranslateGameProps> = ({questions, currentQuestion, formik}) => {
    
    return (
        (questions.length > 0) &&
        <Panel header={`Question No. ${currentQuestion + 1}`} className="mb-2" toggleable>
            <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center" style={{ flex: '1' }}>
                    <p className="m-0">{questions[currentQuestion].word!.content}</p>
                </div>
                <div style={{ flex: '1' }}>
                    <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                        <InputText id="answer" value={formik.values?.answer} onChange={(e) => {
                                    formik.setFieldValue('answer', e.target.value);
                                }} required autoComplete='off' className={`form-control`} autoFocus={true} />
                    </form>
                </div>
            </div>
        </Panel>
    )
}

export default FormTranslateGame;