import { Button } from "primereact/button";
import { Toolbar } from 'primereact/toolbar';
import { Word } from "../../../types/words/Word";

import 'primeicons/primeicons.css';

interface FormWordMaintenanceToolbarProps {
    selectedWords: Word[],
    setWordDialogVisible: (data: boolean) => void,
    setWordForm: (data: Word) => void
}

const FormWordMaintenanceToolbar: React.FC<FormWordMaintenanceToolbarProps> = ({selectedWords,setWordDialogVisible,setWordForm}) => {

    const openNew = () => {
        setWordForm({id: 0, content: '', context: '', translates: []})
        setWordDialogVisible(true);
    }

    const confirmDeleteSelected = () => {
        
    }

    const exportCSV = () => {
        
    }

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedWords || !selectedWords.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };    

    return (
        <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
    );
}

export default FormWordMaintenanceToolbar