import { Formik } from 'formik';
import React from 'react';

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <>
            {children}
            {/* {JSON.stringify(errors) !== "{}" &&
              JSON.stringify(touched) !== "{}" && (
                <div className="container">
                  <div className="alert alert-danger">
                    Check the errors above
                  </div>
                </div>
              )} */}
          </>
        );
      }}
    </Formik>
  );
}
