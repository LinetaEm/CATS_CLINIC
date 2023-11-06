// MUI
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import EditNoteIcon from '@mui/icons-material/EditNote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// LIB
import { stringAvatar } from "../lib";

// HOOKS
import { useNavigate } from "react-router";


export default function ClientsList({
  setIsEditModalOpen, clientsToDisplay, handleRemoveClient,
  setEditableClientId,
  pets
}){

  const navigate = useNavigate()

  const displayClientFullName = ({ firstName, lastName }) => {
    return `${firstName} ${lastName}`
  }

  const diplayClientEmail = (email) => {
    return email
  }

  const displayClientPhone = (phone) => {
    return phone
  }

  const displayClientAddress = (address) => {
    return address
  }

  const displayPetName = (usersId) => {

    const filteredPets = pets.filter(pet => pet.usersId === usersId);

    const petNames = filteredPets.map(pet => pet.name)

    return petNames.join(', ');
  }

  const diplayPetBreed = (usersId) => {
    const filteredPets = pets.filter(pet => pet.usersId === usersId);

    const petBreeds = filteredPets.map(pet => pet.breed)

    return petBreeds.join(', ');
  }



  return (
    <List id='clients-page-list'>
      {clientsToDisplay?.map(({ firstName, lastName, email, address, phone, id }) =>
        <Paper key={id} sx={{ m: '1vh' }}>
          <ListItem
            sx={{ p: "1vw" }}
            secondaryAction={
              <>
                <IconButton onClick={() => navigate(`/visits/${id}`)}>
                  <AccessTimeIcon />
                </IconButton>
                <IconButton onClick={() => {
                  setIsEditModalOpen(true)
                  setEditableClientId(id)
                }}>
                  <EditNoteIcon />
                </IconButton>
                <IconButton onClick={() => navigate(`/pets/${id}`)} >
                  <PetsIcon />
                </IconButton>
                <IconButton onClick={() => handleRemoveClient(id)} >
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar  {...stringAvatar(`${firstName} ${lastName}`)} />
            </ListItemAvatar>
            <ListItemText
              primary={displayClientFullName({ firstName, lastName })}
              secondary={diplayClientEmail(email)}
            />
            <ListItemText
              primary={<p><b>Phone: </b>{displayClientPhone(phone)}</p>}
              secondary={<p><b>Address: </b>{displayClientAddress(address)}</p>}
            />
            <ListItemText
              primary={<p><b>Pets: </b>{displayPetName(id)}</p>}
              secondary={<p><b>Breeds: </b>{diplayPetBreed(id)}</p>}
            />
          </ListItem>
        </Paper>
      )}
    </List>
  )
}

