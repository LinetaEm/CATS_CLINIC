// HOOKS
import { useContext } from 'react';

// FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';

// CONTEXT
import { AuthContext } from '../context/AuthContext';

// MUI
import { Button, Checkbox, FormControlLabel, Paper } from '@mui/material';
import { Dna } from 'react-loader-spinner'

// XHR ADAPTERS
import { clientLogin } from '../adapters/loginPageAdapter';

// CONSTANTS
import CONSTANTS from '../constants'

// CSS
import "../css/components/LoginForm.css"
import 'react-toastify/dist/ReactToastify.css';

// TOASTIFY 
import { ToastContainer, toast } from 'react-toastify';

export default function LoginForm ({ navigate, handleCheckBox, isLoginAsDoctor }) {

  const { localLogin } = useContext(AuthContext)

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
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
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, setFieldError}) => {
        try {

          const response = await clientLogin(values)
          const user = { ...response.data.user, accessToken: response.data.accessToken }
          if (isLoginAsDoctor && user.role === "doctor") {
            localLogin(user)
            navigate("/visits")
          }
          else if (isLoginAsDoctor && user.role !== "doctor") {
            throw new Error("User is not a doctor")
          }
          else if (!isLoginAsDoctor && user.role !== "client") {
            throw new Error("User is not a client")
          }
          else {
            localLogin(user)
            navigate("/visits")
          }
          setSubmitting(false)
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
          }
          else {
            toast.error(error.message);

            setFieldError('email', error.message)
          }
        }
      }}
    >
      {({ isSubmitting }) => (
        <Paper id="login-form-paper" elevation={1} >
           <ToastContainer />
          <Form id='login-form'>
            <label>Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
            <label>Password</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />
            <Button type="submit" disabled={isSubmitting}>
              Login
            </Button>
            <Button onClick={() => navigate("/register")} type="button" >
              Register
            </Button>
          </Form>
          {isSubmitting && <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />}
          <FormControlLabel control={<Checkbox onChange={handleCheckBox} />} label="login as doctor" />
        </Paper>
      )}
    </Formik>
  )
}