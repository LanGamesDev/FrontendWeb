import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import insertOneWord from '../../services/words/insertOneWord';
import { Word } from '../../types/words/Word';

const FormWordMaintenance = () => {

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
            await createWord(data)
            formik.resetForm();
        }
    });

    const createWord = async (word: Word) => {
        try {
            const data = await insertOneWord(word);

        } catch (error) {
            console.error("Error getting words:", error);
        }
    };

    const isFormFieldInvalid = (name: keyof Word) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: keyof Word) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <span className="p-float-label">
                    <InputText
                        id="content"
                        name="content"
                        value={formik.values.content}
                        onChange={(e) => {
                            formik.setFieldValue('content', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('content') })}
                    />
                    <label htmlFor="input_value">Name - Surname</label>
                </span>
                {getFormErrorMessage('content')}
                <Button type="submit" label="Submit" />
            </form>
        </div>
    )
}

export default FormWordMaintenance