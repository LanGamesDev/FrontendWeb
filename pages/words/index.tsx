//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";     

//core
import "primereact/resources/primereact.min.css";

import React, { useState, useEffect } from 'react';

import { Word } from "../../types/words/Word";
import FormWordMaintenanceList from "../../components/words/maintenance/FormWordMaintenanceList";
import 'bootstrap/dist/css/bootstrap.min.css';
import getAllWords from "../../services/words/getAllWords";
import FormWordMaintenanceToolbar from "../../components/words/maintenance/FormWordMaintenanceToolbar";
import FormWordMaintenanceDialog from "../../components/words/maintenance/FormWordMaintenanceDialog";

export default function WordsPage() {
    const [words, setWords] = useState<Word[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

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
            <div className="container">
                <FormWordMaintenanceToolbar selectedProducts={[]} setVisible={setVisible}></FormWordMaintenanceToolbar>
                <FormWordMaintenanceList setWords={setWords} words={words}></FormWordMaintenanceList>
            </div>
            <FormWordMaintenanceDialog visible={visible} setVisible={setVisible} setWords={setWords}></FormWordMaintenanceDialog>
        </>
    );
}
  