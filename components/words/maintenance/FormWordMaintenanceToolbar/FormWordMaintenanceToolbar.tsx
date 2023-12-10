import { Button } from "primereact/button";
import { AutoComplete, AutoCompleteCompleteEvent } from 'primereact/autocomplete';
import { Word } from "../../../../types/words/Word";

import 'primeicons/primeicons.css';
import './FormWordMaintenanceToolbar.css';
import { InputText } from "primereact/inputtext";
import { useState } from 'react';

interface FormWordMaintenanceToolbarProps {
    selectedWords: Word[],
    setWordDialogVisible: (data: boolean) => void,
    setWordForm: (data: Word) => void,
    context: string,
    setContext: (data: string) => void
    uniqueContexts: string[]
}

const FormWordMaintenanceToolbar: React.FC<FormWordMaintenanceToolbarProps> = ({selectedWords,setWordDialogVisible,setWordForm,context,setContext,uniqueContexts}) => {

    const [contextItems, setContextItems] = useState<string[]>([]);

    const openNew = () => {
        setWordForm({id: 0, content: '', context: '', translates: []})
        setWordDialogVisible(true);
    }

    const searchContext = (e: AutoCompleteCompleteEvent) => {
        setContextItems(uniqueContexts.filter((context)=>context.toUpperCase().includes(e.query.toUpperCase())))
    }

    const confirmDeleteSelected = () => {
        
    }

    const exportCSV = () => {
        
    }

    return (
        <div className="form-container">
            <div className="p-inputgroup mb-2">
                <label htmlFor="staticEmail" className="col-2 col-form-label d-flex align-items-center">Context: </label>
                <AutoComplete value={context} suggestions={contextItems} completeMethod={searchContext} onChange={(e) => setContext(e.value)} className="p-inputtext-sm" id="staticEmail" />
            </div>
            <div className="d-flex justify-content-between">
                <div>
                    <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} className="me-2" />
                    <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedWords || !selectedWords.length} />
                </div>
                <div>
                    <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
                </div>
            </div>
        </div>
    );
}

export default FormWordMaintenanceToolbar