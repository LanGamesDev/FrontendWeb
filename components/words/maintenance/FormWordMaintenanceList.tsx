import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from 'react';
import getAllWords from "../../../services/words/getAllWords";
import { Word } from "../../../types/words/Word";
import { Button } from "primereact/button";

interface FormWordMaintenanceListProps {
    setWords: (data: any) => void,
    words: Word[],
    setWordDialogVisible: (data: boolean) => void,
    setDeleteWordDialogVisible: (data: boolean) => void,
    setWordForm: (data: Word) => void,
}

const FormWordMaintenanceList: React.FC<FormWordMaintenanceListProps> = ({setWords, words,setWordDialogVisible,setWordForm,setDeleteWordDialogVisible}) => {

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getAllWords();
                setWords(data);
            } catch (error) {
                console.error("Error getting words:", error);
            }
        };

        fetchData();

    }, [setWords]);

    const buttonsTemplate = (rowData: Word) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2 buttonTable" size="small" onClick={() => editWord(rowData)}/>
                <Button icon="pi pi-trash" rounded outlined className="buttonTable" severity="danger" size="small" onClick={() => confirmDeleteWord(rowData)} />
            </>
        );
    };
    
    const editWord = (word: Word) => {
        setWordForm({ ...word });
        setWordDialogVisible(true);
    };

    const confirmDeleteWord = (word: Word) => {
        setWordForm({...word});
        setDeleteWordDialogVisible(true);
    };

    return (
        <DataTable value={words} tableStyle={{ minWidth: '50rem' }} size={"small"}>
            <Column field="id" header="ID"></Column>
            <Column field="content" header="Content"></Column>
            <Column body={buttonsTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>
    );
}

export default FormWordMaintenanceList