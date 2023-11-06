// HOOKS
import { useNavigate } from "react-router";

// MUI
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Paper } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PetsIcon from '@mui/icons-material/Pets';
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';

export default function PetsList({ petsToDisplay,
  setIsEditModalOpen,
  setEditablePetId,
  handleRemovePet
 }) {
  
  const navigate = useNavigate()
  
  return (
    <List id='visits-page-list'>
      {petsToDisplay?.map(({ name, breed, age, id, usersId }) =>
        <Paper key={id} sx={{ m: '1vh' }}>
          <ListItem
            sx={{ p: "1vw" }}
            secondaryAction={
              <>
                 <IconButton onClick={() => navigate(`/clients/${usersId}`)}>
                <PersonIcon />
              </IconButton>
                <IconButton onClick={() => {
                  setIsEditModalOpen(true)
                  setEditablePetId(id)
                }}>
                        <EditNoteIcon />
                </IconButton>
                <IconButton onClick={() => handleRemovePet(id)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <PetsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={name}
              secondary={
                <p>
                  <b>Breed: </b>
                  {breed}
                  {" "}
                  <b>Age: </b>
                  {age}
                </p>
              }
            />
          </ListItem>
        </Paper>
      )}
    </List>
  )
}