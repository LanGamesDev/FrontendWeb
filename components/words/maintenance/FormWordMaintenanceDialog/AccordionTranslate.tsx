import { AccordionTab } from 'primereact/accordion';
import { useState } from 'react';
import { Translate } from '../../../../types/words/Translate';
import { InputText } from 'primereact/inputtext';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';

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
            if(data.id === 0){
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }else{
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            translateForm.resetForm();
        }
    });

    const isFormFieldInvalid = (name: keyof Translate) => !!(translateForm.touched[name] && translateForm.errors[name]);

    const getFormErrorMessage = (name: keyof Translate) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{translateForm.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="flex justify-content-center">
            <form onSubmit={translateForm.handleSubmit} className="flex flex-column gap-2">
                <div className="field">
                    <label htmlFor="content" className="font-bold">
                        Content
                    </label>
                    <InputText id="content" value={translateForm.values?.content} onChange={(e) => {
                                translateForm.setFieldValue('content', e.target.value);
                            }} required autoFocus autoComplete='off' className={`form-control ${classNames({ 'p-invalid': isFormFieldInvalid('content') })}`} />
                </div>
            </form>
        </div>
    )
    
}

export default AccordionTranslate