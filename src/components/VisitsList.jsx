import { useContext } from "react";

// HOOKS
import { useNavigate } from "react-router";

// MUI
import { IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// CONTEXT
import { AuthContext } from "../context/AuthContext";
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';

export default function VisitsList ({ setIsEditModalOpen, handleRemoveVisit, setEditableVisitId, clients, pets, visitsToDisplay }) {


  const navigate = useNavigate()

  const { userState } = useContext(AuthContext)

  const displayClientFullName = (usersId) => {
    const client = clients.filter(client => client.id === usersId)[0]

    return `${client.firstName} ${client.lastName}`
  }

  const displayClientEmail = (usersId) => {
    const client = clients.filter(client => client.id === usersId)[0]

    return `${client.email}`
  }

  const displayPetName = (petsId) => {

    const filteredPets = pets.filter(pet => petsId.includes(pet.id));

    const petNames = filteredPets.map(pet => pet.name)

    return petNames.join(', ');
  }

  const diplayPetBreed = (petsId) => {
    const filteredPets = pets.filter(pet => petsId.includes(pet.id));

    const petBreeds = filteredPets.map(pet => pet.breed)

    return petBreeds.join(', ');
  }

  const sortObjectsByTime = (array) => {
    return array.sort((a, b) => new Date(a.selectedTime) - new Date(b.selectedTime));
  }

  const displayVisitTime = (dateString) => {
    const date = new Date(dateString)

    return date.toLocaleString("lt-LT")
  }

  const isDatePassed = (providedDate) => {
    const providedDateTime = new Date(providedDate);
    const currentDateTime = new Date();

    if (providedDateTime < currentDateTime) {
      return true;
    } else {
      return false;
    }
  }

  const sortedVisitsByTime = () => {
    if (visitsToDisplay) {
      return sortObjectsByTime(visitsToDisplay)
    }

    return []
  }

  return (
    <List id='visits-page-list'>
      {sortedVisitsByTime()?.map(({ comment, selectedTime, id, usersId, petsId }) =>
        <Paper key={id} sx={{ m: '1vh' }}>
          <ListItem
            sx={{ p: "1vw" }}
            secondaryAction={
              <>
                <IconButton onClick={() => navigate(`/pets/${usersId}/${[petsId[0]]}`)} >
                  <PetsIcon />
                </IconButton>
                <IconButton onClick={() => navigate(`/clients/${usersId}`)}>
                  <PersonIcon />
                </IconButton>
                {userState.role === "doctor" && <IconButton onClick={() => {
                  setIsEditModalOpen(true)
                  setEditableVisitId(id)
                }}>
                  <EditNoteIcon />
                </IconButton>}
                <IconButton onClick={() => handleRemoveVisit(id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <AccessTimeIcon color={isDatePassed(selectedTime) && "error" || "info"} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <p><b>Time: </b>{displayVisitTime(selectedTime)}</p>}
              secondary={
                <p><b>Comment: </b>{comment}</p>
              }
            />
            <ListItemText
              primary={
                <p>
                  <b>Pets: </b>
                  {displayPetName(petsId)}
                </p>

              }
              secondary={
                <p><b>Breeds: </b>{diplayPetBreed(petsId)}</p>
              }
            />
            <ListItemText
              primary={
                <p>
                  <b>Owner: </b>
                  {displayClientFullName(usersId)}
                </p>

              }
              secondary={
                <p><b>Email: </b>{displayClientEmail(usersId)}</p>

              }
            />
          </ListItem>
        </Paper>
      )}
    </List>
  )
}

