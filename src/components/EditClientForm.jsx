// FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';

// MUI
import { Box, Button, Modal } from '@mui/material';
import { Dna } from 'react-loader-spinner'

// CONSTANTS
import CONSTANTS from '../constants'

// CSS
import "../css/components/RegisterForm.css"

export default function EditClientForm ({ editableClientId, isEditModalOpen, handleEditClient, setIsEditModalOpen, clients }) {

    const handleClose = () => setIsEditModalOpen(false);
    const editableClient = clients.find(client => client.id === editableClientId)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };


    return (
        <Formik
            initialValues={{
                firstName: editableClient.firstName,
                lastName: editableClient.lastName,
                address: editableClient.address,
                phone: editableClient.phone,
                email: editableClient.email,
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

                    await handleEditClient({ email, password, firstName, lastName, address, phone })

                    setIsEditModalOpen(false)
                    setSubmitting(false)
                } catch (error) {
                    if (error.response) {
                        const errorResponseData = error.response.data

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
                    }
                }
            }}
        >
            {({ isSubmitting }) => (
                <Modal
                    open={isEditModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
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
                            <Button sx={{ mt: "2vh" }} type="submit">Edit</Button>
                            {isSubmitting && <Dna
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="dna-loading"
                                wrapperStyle={{}}
                                wrapperClass="dna-wrapper"
                            />}
                        </Form>
                    </Box>
                </Modal>
            )}
        </Formik >
    )
}






