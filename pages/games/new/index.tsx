//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     

//core
import "primereact/resources/primereact.min.css";

import React, { useState, useEffect, useRef } from 'react';
import LayoutSidebar from "../../../components/general/layout/LayoutSidebar";
import FormTranslateGame from "../../../components/games/translateGame/FormTranslateGame";
import { MessageService } from "../../../types/general/MessageService";
import { MSG_TYPE_SUCCESS } from "../../../constants/general/ConstantsRoutes";
import { Word } from "../../../types/words/Word";
import { Toast } from "primereact/toast";
import getWordsForGame from "../../../services/words/getWordsForGame";

const NewGame = () => {

    const toast: any = useRef(null);
    const [words, setWords] = useState<Word[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    const fetchData = async () => {
        try{
            const response: MessageService = await getWordsForGame();
            console.log(response);
            
            if(response.type === MSG_TYPE_SUCCESS){
                setWords(response.data);
            }
            else{
                toast.current?.show({ severity: 'error', summary: 'Error', detail: response.message, life: 3000 });
            }
        }catch(error){
            console.log(error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <LayoutSidebar>
            <Toast ref={toast} />
            <div className="container pt-5">
                <h1 className="mb-4 text-center">Translate Game</h1>
                <FormTranslateGame words={words}></FormTranslateGame>
            </div>
        </LayoutSidebar>
    );
    
}

export default NewGame;
  