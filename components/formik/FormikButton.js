import React from 'react'

const FormikButton = (props) => {
    const { isSubmitting, isValid, children, ...rest } = props
    return (
        <button {...rest} type='submit'>
            {children}
        </button>
    )
}

export default FormikButton