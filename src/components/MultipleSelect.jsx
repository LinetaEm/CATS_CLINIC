// HOOKS
import { useEffect, useState } from 'react';

// MUI
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ editablePets, pets, setFieldValue }) {
  const [petName, setPetName] = useState([]);


  useEffect(() => {
    if (editablePets) {
      const petNames = editablePets.map(pet => pet.name)
      setPetName(petNames)
    }
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setFieldValue("petsId", mapPetNamesToIds(value))

    setPetName(
      // On autofill we get a stringifqied value.
      typeof value === 'string' ? value.split(',') : value,
    );

  };

  const mapPetNamesToIds = (names) => {
    const petIds = [];

    pets.forEach(pet => {
      if (names.includes(pet.name)) {
        petIds.push(pet.id);
      }
    });

    return petIds
  }


  return (
    <div>
      <FormControl fullWidth sx={{ mt: 1 }}>
        <InputLabel id="demo-multiple-name-label">Pets</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={petName}
          onChange={handleChange}
          input={<OutlinedInput label="Pets" />}
          MenuProps={MenuProps}
        >
          {editablePets && editablePets.map(({ name, id }) => (
            <MenuItem
              key={name}
              value={name}
              id={id}
            >
              {name}
            </MenuItem>
          ))}
          {pets.map(({ name, id }) => (
            <MenuItem
              key={name}
              value={name}
              id={id}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
} 