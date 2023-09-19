import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect } from 'react';
import getAllWords from "../../../services/words/getAllWords";
import { Word } from "../../../types/words/Word";
import { Button } from "primereact/button";

interface FormWordMaintenanceListProps {
    setWords: (data: any) => void,
    words: Word[]
}

const FormWordMaintenanceList: React.FC<FormWordMaintenanceListProps> = ({setWords, words}) => {

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

    return (
        <DataTable value={words} tableStyle={{ minWidth: '50rem' }}>
            <Column field="id" header="ID"></Column>
            <Column field="content" header="Content"></Column>
        </DataTable>
    );
}

export default FormWordMaintenanceList