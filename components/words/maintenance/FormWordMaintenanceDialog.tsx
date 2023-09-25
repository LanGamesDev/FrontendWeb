import { Dialog } from 'primereact/dialog';
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import insertOneWord from '../../../services/words/insertOneWord';
import { Word } from '../../../types/words/Word';
import {useEffect} from 'react';
import updateOneWord from '../../../services/words/updateOneWord';

interface FormWordMaintenanceDialogProps {
    setWords: (data: any) => void,
    setWordDialogVisible: (data: boolean) => void,
    visible: boolean
    wordForm?: Word
    toast: any
}

const FormWordMaintenanceDialog: React.FC<FormWordMaintenanceDialogProps> = ({setWords,setWordDialogVisible,visible,wordForm,toast}) => {

    const formik = useFormik({
        initialValues: {
            id: 0,
            content: ''
        },
        validate: (data) => {
            let errors: Word = {};

            if (!data.content) {
                errors.content = 'Content is required.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            if(data.id === 0){
                await createWord(data)
            }else{
                await updateWord(data)
            }
            formik.resetForm();
        }
    });

    useEffect(() => {
        if (wordForm && wordForm.id !== formik.values.id) {
            formik.setValues({
                id: wordForm.id || 0,
                content: wordForm.content || ''
            });
        }
    }, [wordForm, formik]);

    const createWord = async (word: Word) => {
        try {
            const data: Word = await insertOneWord(word);
            setWords((oldWords: Word[])=>{return [...oldWords, data]})
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        } catch (error) {
            console.error("Error getting words:", error);
        }
    };

    const updateWord = async (word: Word) => {
        try {
            const data: Word = await updateOneWord(word);
            setWords((oldWords: Word[])=>{
                const index = oldWords.findIndex(word => word.id === data.id);
                oldWords[index] = data;
                return [...oldWords]
            })
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });

        } catch (error) {
            console.error("Error getting words:", error);
        }
    };

    const isFormFieldInvalid = (name: keyof Word) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: keyof Word) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const closeDialog = () => {
        formik.resetForm();
        setWordDialogVisible(false)
    }

    const saveWord = async() => {
        await formik.submitForm();
        setWordDialogVisible(false);
    }
    
    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={closeDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveWord} />
        </>
    );
    

    return (
        <Dialog header="Header" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => closeDialog()} footer={productDialogFooter}>
            <div className="flex justify-content-center">
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                    <div className="field">
                        <label htmlFor="content" className="font-bold">
                            Content
                        </label>
                        <InputText id="content" value={formik.values?.content} onChange={(e) => {
                                    formik.setFieldValue('content', e.target.value);
                                }} required autoFocus className={`form-control ${classNames({ 'p-invalid': isFormFieldInvalid('content') })}`} />
                        {getFormErrorMessage('content')}
                    </div>
                </form>
            </div>
        </Dialog>
    )
}

export default FormWordMaintenanceDialog