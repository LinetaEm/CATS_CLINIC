import { useContext } from 'react';

// FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';
// CONTEXT
import { AuthContext } from '../context/AuthContext';
// MUI
import { Button, Paper } from '@mui/material';
import { Dna } from 'react-loader-spinner'

// XHR ADAPTERS
import { registerClient } from "../adapters/registerPageAdapter"

// CONSTANTS
import CONSTANTS from '../constants'

// CSS
import "../css/components/RegisterForm.css"

// TOASTIFY 
import { ToastContainer, toast } from 'react-toastify';


export default function RegisterForm({ navigate }) {

    const { localLogin } = useContext(AuthContext)

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                address: '',
                phone: '',
                email: '',
                password: ''
            }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Required';
                }
                if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                if (!values.password) {
                    errors.password = 'Required'
                }
                if (!values.firstName) {
                    errors.firstName = 'Required'
                }
                if (!values.lastName) {
                    errors.lastName = 'Required'
                }
                if (!values.address) {
                    errors.address = 'Required'
                }
                if (!values.phone) {
                    errors.phone = 'Required'
                }

                return errors;
            }}
            onSubmit={async (values, { setSubmitting, setFieldError }) => {
                try {
                    const { email, password, firstName, lastName, address, phone } = values

                    const registerClientResponse = await registerClient({ email, password, firstName, lastName, address, phone })

                    const registeredClient = { ...registerClientResponse.data.user, accessToken: registerClientResponse.data.accessToken }

                    localLogin(registeredClient)
                    setSubmitting(false)
                    navigate("/visits")
                } catch (error) {
                    const errorResponseData = error?.response?.data
                    if (errorResponseData) {
                        if (CONSTANTS.LOGIN_AND_EMAIL_FIELD_ERRORS.includes(errorResponseData)) {
                            setFieldError('email', error.response.data)
                            setFieldError('password', error.response.data)
                        }

                        if (CONSTANTS.EMAIL_FIELD_ERRORS.includes(errorResponseData)) {
                            setFieldError('email', error.response.data)
                        }

                        if (CONSTANTS.PASSWORD_FIELD_ERRORS.includes(errorResponseData)) {
                            setFieldError('password', error.response.data)
                        }
                        toast.error(errorResponseData);
                    } else {
                        toast.error(error.message);

                        setFieldError('email', error.message)
                    }
                }
            }}
        >
            {({ isSubmitting }) => (
                <Paper id="register-form-paper" elevation={1} >  <ToastContainer />
                    <Form id='register-form'>
                        <label>Email:</label>
                        <Field type="email" name="email" />
                        <ErrorMessage name="email" component="div" className="error" />
                        <label >Password:</label>
                        <Field type="password" name="password" />
                        <ErrorMessage name="password" component="div" className="error" />
                        <label >First Name:</label>
                        <Field width="100%" type="text" name="firstName" />
                        <ErrorMessage name="firstName" component="div" className="error" />
                        <label >Last Name:</label>
                        <Field type="text" name="lastName" />
                        <ErrorMessage name="lastName" component="div" className="error" />
                        <label>Address:</label>
                        <Field type="text" name="address" />
                        <ErrorMessage name="address" component="div" className="error" />
                        <label >Phone:</label>
                        <Field type="text" name="phone" />
                        <ErrorMessage name="phone" component="div" className="error" />
                        <Button sx={{ mt: "2vh" }} type="submit">Register</Button>
                    </Form>
                    {isSubmitting && <Dna
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper"
                    />}
                </Paper>
            )}
        </Formik >
    )
}






