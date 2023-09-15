import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const FormWordMaintenance = () => {

    interface FormValues {
        value: string;
    }

    interface FormErrors {
        value?: string;
    }

    const formik = useFormik({
        initialValues: {
            value: ''
        },
        validate: (data) => {
            let errors: FormErrors = {};

            if (!data.value) {
                errors.value = 'Name - Surname is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name: keyof FormValues) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name: keyof FormValues) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <span className="p-float-label">
                    <InputText
                        id="value"
                        name="value"
                        value={formik.values.value}
                        onChange={(e) => {
                            formik.setFieldValue('value', e.target.value);
                        }}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('value') })}
                    />
                    <label htmlFor="input_value">Name - Surname</label>
                </span>
                {getFormErrorMessage('value')}
                <Button type="submit" label="Submit" />
            </form>
        </div>
    )
}

export default FormWordMaintenance