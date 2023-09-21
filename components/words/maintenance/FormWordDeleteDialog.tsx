import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Word } from '../../../types/words/Word';
import deleteOneWord from '../../../services/words/deleteOneWord';

interface FormWordDeleteDialogProps {
    deleteWordDialogVisible: boolean
    wordForm?: Word
    setDeleteWordDialogVisible: (data: boolean) => void
    setWords: (data: any) => void
    toast: any
}

const FormWordDeleteDialog: React.FC<FormWordDeleteDialogProps> = ({deleteWordDialogVisible, wordForm, setDeleteWordDialogVisible, setWords, toast}) => {   
    console.log(wordForm);
    

    const hideDeleteWordDialog = () => {
        setDeleteWordDialogVisible(false);
    };
    
    const deleteWord = async() => {
        const data: Word = await deleteOneWord(wordForm!);
        setWords((_words: Word[])=>{
            return _words.filter((_word) => _word.id !== data.id);
        });
        setDeleteWordDialogVisible(false);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const deleteWordDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteWordDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteWord} />
        </>
    );

    return (
        <Dialog visible={deleteWordDialogVisible} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteWordDialogFooter} onHide={hideDeleteWordDialog}>
            <div className="confirmation-content">
                <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                {wordForm && (
                    <span>
                        Are you sure you want to delete <b>{wordForm.content}</b>?
                    </span>
                )}
            </div>
        </Dialog>
    )

}

export default FormWordDeleteDialog