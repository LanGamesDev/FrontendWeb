import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from 'react';
import getAllWords from "../../../services/words/getAllWords";
import { Word } from "../../../types/words/Word";
import { Button } from "primereact/button";
import { MessageService } from "../../../types/general/MessageService";
import { MSG_TYPE_SUCCESS } from "../../../utils/constants/general/ConstantsRoutes";
import { formatDate } from "../../../utils/functions/general/stringsHandle";

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
        <DataTable value={words} tableStyle={{ minWidth: '50rem' }} size={"small"} sortField="id" sortOrder={-1}
            paginator rows={15} rowsPerPageOptions={[15,30,50]} paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="{first} to {last} of {totalRecords}">
            <Column body={buttonsTemplate} exportable={false} style={{ width: '8rem' }} header="Actions"></Column>
            <Column field="id" style={{ width: '8rem' }} header="ID" sortable></Column>
            <Column field="content" header="Content"></Column>
            <Column field="createdDate" header="Creation Date" body={(rowData) => formatDate(rowData.createdDate)}></Column>
        </DataTable>
    );
}

export default FormWordMaintenanceList