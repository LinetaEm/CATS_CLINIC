// FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';

// MUI
import { Dna } from 'react-loader-spinner'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MultipleSelect from './MultipleSelect';
import BasicDateTimePicker from './BasicDateTimePicker';
import { Button } from '@mui/material';

// CSS
import "../css/components/CreateVisitForm.css"

export default function EditVisitForm ({ pets, isEditModalOpen, setIsEditModalOpen, handleEditVisit, editableVisitId, allVisits, allPets }) {


    const handleClose = () => setIsEditModalOpen(false);

    const editableVisit = allVisits.find(visit => visit.id === editableVisitId)
   
    const editablePets = allPets.filter(pet => editableVisit.petsId.includes(pet.id))

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
                dateTime: '',
                comment: editableVisit.comment,
                petsId: editableVisit.petsId,
            }}
            validate={values => {
                const errors = {};
                if (!values.dateTime) {
                    errors.dateTime = 'Required'
                }
                if (values.petsId.length < 1) {
                    errors.petsId = 'Required'
                }
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    const { dateTime: selectedTime, comment, petsId } = values

                    await handleEditVisit({ selectedTime, comment, petsId })

                    setIsEditModalOpen(false)
                    setSubmitting(false)
                } catch (error) {
                    // TODO ALERT HERE
                }
            }}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Modal
                    open={isEditModalOpen}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Form id='create-visit-form'>
                            <MultipleSelect editablePets={editablePets} setFieldValue={setFieldValue} pets={pets} />
                            <ErrorMessage name="petsId" component="div" className="error" />
                            <BasicDateTimePicker editableVisit={editableVisit}  setFieldValue={setFieldValue} />
                            <ErrorMessage name="dateTime" component="div" className="error" />
                            <label>Comment:</label>
                            <Field as="textarea" id="comment" name="comment" placeholder="Enter your comment" />
                            <Button sx={{mt: 1}} onClick={handleSubmit}>Edit</Button>
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
