import { Dialog } from 'primereact/dialog';
import { FormikConfig, useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import insertOneWord from '../../../services/words/insertOneWord';
import { Word } from '../../../types/words/Word';
import {useEffect, useState, useRef} from 'react';
import updateOneWord from '../../../services/words/updateOneWord';
import { Accordion, AccordionTab } from 'primereact/accordion';
import AccordionTranslate, { AccordionTranslateRef } from './FormWordMaintenanceDialog/AccordionTranslate';
import { Translate } from '../../../types/words/Translate';
import { STATE_TYPE_EDIT } from '../../../utils/constants/general/ConstantsRoutes';

interface FormWordMaintenanceDialogProps {
    setWords: (data: any) => void,
    setWordDialogVisible: (data: boolean) => void,
    visible: boolean
    wordForm?: Word
    toast: any,
    setWordForm: (data: Word) => void
}

const FormWordMaintenanceDialog: React.FC<FormWordMaintenanceDialogProps> = ({setWords,setWordDialogVisible,visible,wordForm,toast,setWordForm}) => {

    const [typeForm, setTypeForm] = useState("");
    const [translates, setTranslates] = useState<Translate[]>([]);
    const deletedTranslates = useRef<Translate[]>([]);
    const childComponentRef = useRef<AccordionTranslateRef>(null);
    
    const formik = useFormik({
        initialValues: {
            id: 0,
            content: '',
            translates: [] as Translate[],
            deletedTranslates: [] as Translate[]
        },
        validate: (data) => {
            let errors: Word = {};

            if (!data.content) {
                errors.content = 'Content is required.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            const validTranslate: boolean = childComponentRef.current!.validateCurrentTranslate();
            if(validTranslate){

                let result: boolean = false;
                if(data.id === 0){
                    result = await createWord(data)
                    if(result === true){
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                    }
                }else{
                    result = await updateWord(data)
                    if(result === true){
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    }
                }
                closeDialog();

            }else{
                toast.current.show({ severity: 'warn', summary: 'Warning', detail: 'You have a translate pending to save. ', life: 3000 });
            }
        }
    });

    useEffect(() => {
        if (wordForm && wordForm.id !== formik.values.id) {
            formik.setValues({
                id: wordForm.id || 0,
                content: wordForm.content || '',
                translates: wordForm.translates || [],
                deletedTranslates: []
            });

            setTranslates(wordForm.translates!.map(translate => {
                translate.typeState = STATE_TYPE_EDIT;
                translate.modified = false;
                return translate;
            }));
        }

        if(wordForm && wordForm.id! > 0){
            setTypeForm("E");
        }else{
            setTypeForm("N");
        }
    }, [wordForm, formik]);



    const createWord = async (word: Word): Promise<boolean> => {
        try {
            const data: Word = await insertOneWord(word);
            setWords((oldWords: Word[])=>{return [...oldWords, data]})
            return true;
        } catch (error) {
            console.error("Error getting words:", error);
        }
        return false;
    };

    const updateWord = async (word: Word): Promise<boolean> => {
        try {
            const data: Word = await updateOneWord(word);
            
            setWords((oldWords: Word[])=>{
                const index = oldWords.findIndex(word => word.id === data.id);
                const newWords = [...oldWords];
                newWords[index] = data;
                
                return newWords;
            })
            return true;
        } catch (error) {
            console.error("Error getting words:", error);
        }
        return false;
    };

    const isFormFieldInvalid = (name: keyof Word) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: keyof Word) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]?.toString()}</small> : <small className="p-error">&nbsp;</small>;
    };

    const closeDialog = () => {
        formik.resetForm();
        setWordDialogVisible(false);
        setTranslates([]);
        setWordForm({id: 0, content: '', translates: []});
    }

    const saveWord = async() => {
        await formik.submitForm();
    }
    
    const productDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={closeDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveWord} />
        </>
    );
    

    return (
        <Dialog header={(typeForm === "E") ? "Edit Word" : "Create word"} visible={visible} maximizable style={{ width: '50vw' }} onHide={() => closeDialog()} footer={productDialogFooter}>
            <div className="flex justify-content-center">
                <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                    <div className="field">
                        <label htmlFor="content" className="font-bold" >
                            Content
                        </label>
                        <InputText id="content" value={formik.values?.content} onChange={(e) => {
                                    formik.setFieldValue('content', e.target.value);
                                }} required autoComplete='off' className={`form-control ${classNames({ 'p-invalid': isFormFieldInvalid('content') })}`} autoFocus={true} />
                        {getFormErrorMessage('content')}
                    </div>
                </form>
            </div>
            <Accordion className="accordionSmall" activeIndex={0}>
                <AccordionTab header="Translates" className="accordionTab">
                    <AccordionTranslate ref={childComponentRef} toast={toast} translates={translates} setTranslates={setTranslates} formikWord={formik} deletedTranslates={deletedTranslates.current}></AccordionTranslate>
                </AccordionTab>
            </Accordion>
        </Dialog>
    )
}

export default FormWordMaintenanceDialog