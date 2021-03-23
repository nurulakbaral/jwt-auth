import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikController from './formik/FormikController'
import FormikButton from './formik/FormikButton'
import axios from 'axios'

const FormRegister = (props) => {
    const initialValues = {
        fullName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }
    const validationSchema = Yup.object({
        fullName: Yup
            .string()
            .required('Required'),
        email: Yup
            .string()
            .email('Enter your valid email')
            .required('Required'),
        password: Yup
            .string()
            .required('Required'),
        passwordConfirm: Yup.
            string()
            .oneOf([Yup.ref('password'), ''], 'Password does not match')
            .required('Required'),
    })
    const handleRegister = async (values, onSubmitProps) => {
        await axios
            .post(process.env.URL_REGISTER, {
                ...values
            })
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                console.log(err.response)
            })
        onSubmitProps.setSubmitting(false)
    }
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
        >
            {(formikProps) => (
                <Form {...props} >
                    <FormikController
                        control='TextField'
                        type='text'
                        label='Full Name'
                        name='fullName'
                        placeholder='Full Name'
                        formikProps={formikProps}
                    />
                    <FormikController
                        control='TextField'
                        type='email'
                        label='Email'
                        name='email'
                        placeholder='Email'
                        formikProps={formikProps}
                    />
                    <FormikController
                        control='TextField'
                        type='password'
                        label='Password'
                        name='password'
                        placeholder='Password'
                        formikProps={formikProps}
                    />
                    <FormikController
                        control='TextField'
                        type='password'
                        label='Confirm Password'
                        name='passwordConfirm'
                        placeholder='Confirm Password'
                        formikProps={formikProps}
                    />
                    <FormikButton isSubmitting={formikProps.isSubmitting}  >
                        Register
                    </FormikButton>
                </Form>
            )}
        </Formik >
    )
}

export default FormRegister