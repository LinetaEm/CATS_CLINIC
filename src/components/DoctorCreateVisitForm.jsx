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
import "../css/components/CreateVisitForm.css"

// COMPONENTS
import MultipleSelect from './MultipleSelect';
import BasicDateTimePicker from './BasicDateTimePicker';

// LIB
import { extractObjectsWithId } from '../lib';

export default function DoctorCreateVisitForm ({ allPets, isCreateModalOpen, setIsCreateModalOpen, handleCreateVisit, clients }) {

    const [clientId, setClientId] = useState("")

    const handleClose = () => setIsCreateModalOpen(false);

    const clientPets = extractObjectsWithId(allPets, clientId)

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
                usersId: '',
                dateTime: '',
                comment: '',
                petsId: [],
            }}
            validate={values => {
                const errors = {};
                if (!values.usersId) errors.clientId = 'Required'
                if (!values.dateTime) errors.dateTime = 'Required'
                if (values.petsId.length < 1) errors.petsId = 'Required'
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const { dateTime: selectedTime, comment, petsId, usersId } = values

                    await handleCreateVisit({ usersId, selectedTime, comment, petsId })

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
                        <Form id='create-visit-form'>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Client</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={clientId}
                                    label="Client"
                                    onChange={(e) => { 
                                        setClientId(e.target.value)
                                        setFieldValue("usersId", e.target.value) }
                                    }
                                >
                                    {clients.map(client => <MenuItem key={client.id} value={client.id}>{client.email}</MenuItem>)}
                                </Select>
                            </FormControl>
                            <ErrorMessage name="clientId" component="div" className="error" />
                            <MultipleSelect setFieldValue={setFieldValue} pets={clientPets} />
                            <ErrorMessage name="petsId" component="div" className="error" />
                            <BasicDateTimePicker setFieldValue={setFieldValue} />
                            <ErrorMessage name="dateTime" component="div" className="error" />
                            <label>Comment:</label>
                            <Field as="textarea" id="comment" name="comment" placeholder="Enter your comment" />
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






