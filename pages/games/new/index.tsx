//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     

//core
import "primereact/resources/primereact.min.css";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState, useEffect, useRef } from 'react';
import LayoutSidebar from "../../../components/general/layout/LayoutSidebar";
import FormTranslateGame from "../../../components/games/translateGame/FormTranslateGame";
import { MessageService } from "../../../types/general/MessageService";
import { MSG_TYPE_SUCCESS } from "../../../utils/constants/general/ConstantsRoutes";
import { Toast } from "primereact/toast";
import getWordsForGame from "../../../services/words/getWordsForGame";
import { Question } from "../../../types/words/Question";
import { Word } from "../../../types/words/Word";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import TranslateGameResults from "../../../components/games/translateGame/TranslateGameResults";
import { STATE_TRANSLATEGAME_ANSWERING, STATE_TRANSLATEGAME_PREVIEW, STATE_TRANSLATEGAME_SENDED } from "../../../utils/constants/general/ConstantsForms";
import FinalScoreGame from "../../../components/games/general/FinalScoreGame";
import { removeAccents } from "../../../utils/functions/general/stringsHandle";

const NewGame = () => {

    const toast: any = useRef(null);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [status, setStatus] = useState<number>(0);

    type QuestionFormik = {
        answer?: string;
    }

    const formik = useFormik({
        initialValues: {
            answer: ''
        },
        validate: (data) => {
            let errors: QuestionFormik = {};

            return errors;
        },
        onSubmit: async (data) => {
            if(currentQuestion + 1 < questions.length){
                changeCurrentQuestion(currentQuestion+1)
            }else{
                finishGame()
            }
        }
    });

    const scrollToTop = () => {
        document.getElementById("mainSection")!.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const fetchData = async () => {
        try{
            const response: MessageService = await getWordsForGame();
            
            if(response.type === MSG_TYPE_SUCCESS){
                const listQuestions: Question[] = response.data.map((word: Word)=>{
                    const question: Question = {
                        word: word,
                        answer: ''
                    }
                    return question;
                })
                setQuestions(listQuestions);
                setCurrentQuestion(0);
                setStatus(STATE_TRANSLATEGAME_ANSWERING);
            }
            else{
                toast.current?.show({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        }catch(error){
            console.log(error);
        }
    };

    const changeCurrentQuestion = async (newIndex: number) => {
        try{
            setQuestions((oldQuestions: Question[])=>{
                const newQuestion = [...oldQuestions];
                newQuestion[currentQuestion].answer = formik.values.answer;
                
                return newQuestion;
            })
            setCurrentQuestion(newIndex)
            formik.setFieldValue('answer', questions[newIndex].answer || "");
        }catch(error){
            console.log(error);
        }
    };

    const finishGame = async () => {
        try{
            setQuestions((oldQuestions: Question[])=>{
                const newQuestion = [...oldQuestions];
                newQuestion[currentQuestion].answer = formik.values.answer;
                
                return newQuestion;
            })
            setStatus(STATE_TRANSLATEGAME_PREVIEW);
        }catch(error){
            console.log(error);
        }
    };

    const sendAnswers = async () => {
        setStatus(STATE_TRANSLATEGAME_SENDED);
        scrollToTop();
    };

    const backAnswering = async () => {
        setStatus(STATE_TRANSLATEGAME_ANSWERING);
    };

    const newGame = async () => {
        await fetchData();
        formik.setFieldValue('answer', "");
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const validateAnswer = (question: Question): boolean => {
        const findIndex: number = question.word.translates?.findIndex((translate)=>{
            return removeAccents(translate.content?.trim().toLowerCase()!) === removeAccents(question.answer?.trim().toLowerCase()!)
        })!;
        
        return findIndex >= 0 ? true : false;
    }

    return (
        <LayoutSidebar>
            <Toast ref={toast} />
            <div className="container pt-4">
                <h1 className="mb-4 text-center">Translation Game</h1>
                {
                    (status === STATE_TRANSLATEGAME_SENDED) &&
                    <FinalScoreGame questions={questions} validateAnswer={validateAnswer}></FinalScoreGame>
                }
                {
                    (status === STATE_TRANSLATEGAME_ANSWERING) ?
                        <FormTranslateGame questions={questions} currentQuestion={currentQuestion} formik={formik}></FormTranslateGame>
                    : <TranslateGameResults questions={questions} status={status} validateAnswer={validateAnswer}></TranslateGameResults>
                }
                <div className="d-flex justify-content-between">
                    {(status === STATE_TRANSLATEGAME_ANSWERING) && <Button label="Previous" icon="pi pi-times" outlined onClick={()=>{changeCurrentQuestion(currentQuestion-1)}} 
                        disabled={currentQuestion === 0}/>}
                    {(currentQuestion <= questions.length - 2) && <Button label="Next" icon="pi pi-check" onClick={()=>{changeCurrentQuestion(currentQuestion+1)}} />}
                    {(currentQuestion + 1 === questions.length && (status === STATE_TRANSLATEGAME_ANSWERING)) && <Button label="Guardar" icon="pi pi-check" onClick={()=>{finishGame()}} />}
                    {(currentQuestion + 1 === questions.length && (status === STATE_TRANSLATEGAME_PREVIEW)) && <Button label="Back" outlined icon="pi pi-check" onClick={()=>{backAnswering()}} />}
                    {(currentQuestion + 1 === questions.length && (status === STATE_TRANSLATEGAME_PREVIEW)) && <Button label="Send" icon="pi pi-check" onClick={()=>{sendAnswers()}} />}
                    {(status === STATE_TRANSLATEGAME_SENDED) && <Button label="New Game" icon="pi pi-check" onClick={()=>{newGame()}} />}
                </div>
            </div>
        </LayoutSidebar>
    );
    
}

export default NewGame;
  