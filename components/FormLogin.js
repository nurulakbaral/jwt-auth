import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikController from './formik/FormikController'
import FormikButton from './formik/FormikButton'
import axios from 'axios'
import { useRouter } from 'next/router'

const FormLogin = (props) => {
    const router = useRouter()
    const initialValues = {
        email: '',
        password: '',
    }
    const validationSchema = Yup.object({
        email: Yup
            .string()
            .email('Enter your valid email')
            .required('Required'),
        password: Yup
            .string()
            .required('Required'),
    })
    const handleLogin = async (values, onSubmitProps) => {
        const username = values.email.split('@')[0]
        await axios
            .post(process.env.URL_LOGIN, {
                ...values
            })
            .then((result) => {
                console.log(result)
                router.push({
                    pathname: '/[username]',
                    query: { username }
                })
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
            onSubmit={handleLogin}
        >
            {(formikProps) => (
                <Form {...props} >
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
                    <FormikButton isSubmitting={formikProps.isSubmitting}  >
                        Login
                    </FormikButton>
                </Form>
            )}
        </Formik >
    )
}

export default FormLogin