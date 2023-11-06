// HOOKS
import { useContext } from 'react';

// FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';

// MUI
import { Dna } from 'react-loader-spinner'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

// CONTEXT
import { AuthContext } from '../context/AuthContext';

// CSS
import "../css/components/CreateVisitForm.css"

export default function CreatePetForm({ isCreateModalOpen, setIsCreateModalOpen, handleCreatePet }) {

    const { userState } = useContext(AuthContext)

    const handleClose = () => setIsCreateModalOpen(false);

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
                name: '',
                breed: '',
                age: '',
            }}
            validate={values => {
                const errors = {};
                if (!values.name) {
                    errors.name = 'Required'
                }
                if (!values.breed) {
                    errors.breed = 'Required'
                }
                if (!values.age) {
                    errors.age = 'Required'
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const { name, breed, age } = values

                    await handleCreatePet({ name, breed, age, usersId: userState.id })

                    setIsCreateModalOpen(false)
                    setSubmitting(false)
                } catch (error) {
                    // TODO ALERT HERE
                }
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Modal
                    open={isCreateModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Form id='create-pet-form'>
                            <label>Name</label>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" component="div" className='error' />
                            <label>Breed</label>
                            <Field type="text" name="breed" />
                            <ErrorMessage name="breed" component="div" className='error'/>
                            <label>Age</label>
                            <Field type="text" name="age" />
                            <ErrorMessage name="age" component="div" className='error' />
                            <Button onClick={handleSubmit}>Register</Button>
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






