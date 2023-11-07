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

import {findClientByPet} from "../lib/index"


export default function EditPetForm ({ isEditModalOpen, setIsEditModalOpen, handleEditPet, editablePetId, petsToDisplay, allClients }) {

    const { userState } = useContext(AuthContext)

    const handleClose = () => setIsEditModalOpen(false);

    const editablePet = petsToDisplay.find(pet => pet.id === editablePetId)


    const petClient = findClientByPet(allClients, editablePet)


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
                name: editablePet.name,
                breed: editablePet.breed,
                age: editablePet.age,
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
                const { name, breed, age } = values
                              await handleEditPet({ name, breed, age, usersId: petClient.id })
                setIsEditModalOpen(false)
                setSubmitting(false)
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Modal
                    open={isEditModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Form id='create-visit-form'>
                            <label>Name</label>
                            <Field type="text" name="name" />
                            <ErrorMessage name="name" component="div" />
                            <label>Breed</label>
                            <Field type="text" name="breed" />
                            <ErrorMessage name="breed" component="div" />
                            <label>Age</label>
                            <Field type="text" name="age" />
                            <ErrorMessage name="age" component="div" />
                            <Button onClick={handleSubmit}>Edit</Button>
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






