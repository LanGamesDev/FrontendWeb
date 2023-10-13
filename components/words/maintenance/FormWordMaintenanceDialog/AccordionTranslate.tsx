import { AccordionTab } from 'primereact/accordion';
import { useState } from 'react';
import { Translate } from '../../../../types/words/Translate';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

interface AccordionTranslateProps {
    toast: any
}

const AccordionTranslate: React.FC<AccordionTranslateProps> = ({toast}) => {
    const [translates, setTranslates] = useState<Translate[]>([]);

    const translateForm = useFormik({
        initialValues: {
            id: 0,
            content: ''
        },
        validate: (data) => {
            let errors: Translate = {};

            if (!data.content) {
                errors.content = 'Content is required.';
            }

            return errors;
        },
        onSubmit: async (data) => {
            let result: boolean = false;
            console.log(data)
            addTranslate(data);
            translateForm.resetForm();
        }
    });

    const isFormFieldInvalid = (name: keyof Translate) => !!(translateForm.touched[name] && translateForm.errors[name]);

    const getFormErrorMessage = (name: keyof Translate) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{translateForm.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    const buttonsTemplate = (rowData: Translate) => {
        return (
            <>
                <Button icon="pi pi-pencil" outlined className="mr-2 buttonTable" size="small" onClick={() => editTranslate(rowData)}/>
                <Button icon="pi pi-trash" outlined className="buttonTable" severity="danger" size="small" onClick={() => deleteTranslate(rowData)} />
            </>
        );
    };

    const editTranslate = (rowData: Translate) => {

    };

    const deleteTranslate = (rowData: Translate) => {

    };

    const addTranslate = (data: Translate) => {
        setTranslates((oldTranslates: Translate[])=>{return [...oldTranslates, data]})
    };

    return (
        <div className="flex justify-content-center">
            <form onSubmit={translateForm.handleSubmit} className="flex flex-column gap-2">
                <div className="field">
                    <label htmlFor="content" className="font-bold">
                        Content
                    </label>
                    <div className="p-inputgroup flex-1">
                        <InputText id="content" value={translateForm.values?.content} onChange={(e) => {
                                translateForm.setFieldValue('content', e.target.value);
                            }} required autoFocus autoComplete='off' className={`p-inputtext-sm inputSmall ${classNames({ 'p-invalid': isFormFieldInvalid('content') })}`} />
                        <Button icon="pi pi-plus" className="p-button-info buttonTable" size="small" type='submit' />
                    </div>
                </div>
            </form>
            <DataTable value={translates} showGridlines tableStyle={{ minWidth: '50rem' }} size={"small"} className="mt-2">
                <Column body={buttonsTemplate} field="code" header="" style={{ minWidth: '4rem' }}></Column>
                <Column field="content" header="Translate" style={{ minWidth: '20rem' }}></Column>
            </DataTable>
        </div>
    )
    
}

export default AccordionTranslate