//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     

//core
import "primereact/resources/primereact.min.css";

import React, { useState, useEffect, useRef } from 'react';

import { Word } from "../../types/words/Word";
import FormWordMaintenanceList from "../../components/words/maintenance/FormWordMaintenanceList";
import 'bootstrap/dist/css/bootstrap.min.css';
import getAllWords from "../../services/words/getAllWords";
import FormWordMaintenanceToolbar from "../../components/words/maintenance/FormWordMaintenanceToolbar";
import FormWordMaintenanceDialog from "../../components/words/maintenance/FormWordMaintenanceDialog";
import FormWordDeleteDialog from "../../components/words/maintenance/FormWordDeleteDialog";
import { Toast } from 'primereact/toast';

const WordsPage = () => {
    const [words, setWords] = useState<Word[]>([]);
    const [visible, setWordDialogVisible] = useState<boolean>(false);
    const [deleteWordDialogVisible, setDeleteWordDialogVisible] = useState<boolean>(false);

    const [wordForm, setWordForm] = useState<Word>();
    const toast = useRef(null);

    const fetchData = async () => {
        try {
            const data = await getAllWords();
            setWords(data);
        } catch (error) {
            console.error("Error getting words:", error);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);
    

    return (
        <>
            <Toast ref={toast} />
            <div className="container">
                <FormWordMaintenanceToolbar selectedWords={[]} setWordDialogVisible={setWordDialogVisible} setWordForm={setWordForm}></FormWordMaintenanceToolbar>
                <FormWordMaintenanceList setWords={setWords} words={words} setWordDialogVisible={setWordDialogVisible} setWordForm={setWordForm} setDeleteWordDialogVisible={setDeleteWordDialogVisible}></FormWordMaintenanceList>
            </div>
            <FormWordMaintenanceDialog visible={visible} setWordDialogVisible={setWordDialogVisible} setWords={setWords} wordForm={wordForm} toast={toast}></FormWordMaintenanceDialog>
            <FormWordDeleteDialog deleteWordDialogVisible={deleteWordDialogVisible} setWords={setWords} setDeleteWordDialogVisible={setDeleteWordDialogVisible} toast={toast} wordForm={wordForm}></FormWordDeleteDialog>
        </>
    );
}

export default WordsPage;
  