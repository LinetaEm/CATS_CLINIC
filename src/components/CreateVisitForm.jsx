// FORMIK
import { Formik, Form, Field, ErrorMessage } from 'formik';

// MUI
import { Dna } from 'react-loader-spinner'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

// COMPONENTS
import MultipleSelect from './MultipleSelect';
import BasicDateTimePicker from './BasicDateTimePicker';

// CSS
import "../css/components/CreateVisitForm.css"

export default function CreateVisitForm ({ pets, isCreateModalOpen, setIsCreateModalOpen, handleCreateVisit }) {

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
                dateTime: '',
                comment: '',
                petsId: [],
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

                    await handleCreateVisit({ selectedTime, comment, petsId })

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
                            <MultipleSelect setFieldValue={setFieldValue} pets={pets} />
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






