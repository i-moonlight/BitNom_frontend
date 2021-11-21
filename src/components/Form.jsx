import { Formik } from 'formik';

export default function Form({
    initialValues,
    onSubmit,
    validationSchema,
    children,
    enterSubmit,
}) {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, values }) => {
                return (
                    <>
                        <div
                            onKeyUp={(e) => {
                                if (enterSubmit) {
                                    if (e.key === 'Enter') {
                                        !isSubmitting && onSubmit(values);
                                    }
                                }
                            }}
                        >
                            {children}
                        </div>
                    </>
                );
            }}
        </Formik>
    );
}
