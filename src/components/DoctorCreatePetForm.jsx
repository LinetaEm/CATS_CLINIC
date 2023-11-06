// HOOKS
import { useState } from 'react';

// FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';

// MUI
import { Dna } from 'react-loader-spinner'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';

// CSS
import "../css/components/CreatePetForm.css"

export default function DoctorCreatePetForm ({ isCreateModalOpen, setIsCreateModalOpen, handleCreatePet,  allClients }) {

    const [clientId, setClientId] = useState("")


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
                userId: ''
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

                    await handleCreatePet({ name, breed, age, usersId: clientId })

                    setIsCreateModalOpen(false)
                    setSubmitting(false)
                } catch (error) {
                    // TODO ALERT HERE
                }
            }}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Modal
                    open={isCreateModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Form id='create-pet-form'>
                        <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientId}
                                    label="Client"
                                    onChange={(e) => { 
                                        setClientId(e.target.value)
                                        setFieldValue("userId", e.target.value) }
                                    }
                                >
                                    {allClients.map(client => <MenuItem key={client.id} value={client.id}>{client.email}</MenuItem>)}
                                </Select>
                            </FormControl>
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






