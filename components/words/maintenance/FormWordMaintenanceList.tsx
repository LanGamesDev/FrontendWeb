import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from 'react';
import getAllWords from "../../../services/words/getAllWords";
import { Word } from "../../../types/words/Word";
import { Button } from "primereact/button";
import { MessageService } from "../../../types/general/MessageService";
import { MSG_TYPE_SUCCESS } from "../../../constants/general/ConstantsRoutes";

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
            try{
                const response: MessageService = await getAllWords();
                console.log(response);
                
                if(response.type === MSG_TYPE_SUCCESS){
                    setWords(response.data);
                }
                else{
                    setWords([]);
                    // toast.current?.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
            }catch(error){
    
            }
        };

        fetchData();

    }, [setWords]);

    const buttonsTemplate = (rowData: Word) => {
        return (
            <>
                <Button icon="pi pi-pencil" outlined className="me-1 buttonTable" size="small" onClick={() => editWord(rowData)}/>
                <Button icon="pi pi-trash" outlined className="buttonTable" severity="danger" size="small" onClick={() => confirmDeleteWord(rowData)} />
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
            <Column body={buttonsTemplate} exportable={false} style={{ width: '8rem' }} header="Actions"></Column>
            <Column field="id" header="ID"></Column>
            <Column field="content" header="Content"></Column>
        </DataTable>
    );
}

export default FormWordMaintenanceList