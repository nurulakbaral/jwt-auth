import React from 'react'
import { Field, ErrorMessage } from 'formik'

const CustomTextField = (props) => {
    const { form, field, ...rest } = props
    return (
        <input
            {...field}
            {...rest}
        />
    )
}

const FormikTextField = (props) => {
    const { formikProps, name, ...rest } = props
    return (
        <div>
            <Field
                disabled={formikProps.isSubmitting}
                component={CustomTextField}
                name={name}
                {...rest}
            />
            <ErrorMessage name={name} />
        </div >
    )
}

export default FormikTextField