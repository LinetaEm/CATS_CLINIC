// CONTEXT
import { AuthContext } from '../context/AuthContext';
// MUI
import { Dna } from 'react-loader-spinner'
import { Box } from '@mui/material';

// HOOKS
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';

// COMPONENTS
import DoctorCreatePetForm from '../components/DoctorCreatePetForm';
import EditPetForm from '../components/EditPetForm';
import PetsList from '../components/PetsList';
import CreatePetForm from '../components/CreatePetForm';
import HeaderBar from '../components/HeaderBar';

// XHR ADAPTERS
import { createPet, deletePet, editPet, getAllPets, getPets } from '../adapters/petsPageAdapter';
import { getAllClients } from '../adapters/clientsPageAdapter';

// CSS
import "../css/pages/Pets.css"

// TOASTIFY 
import { ToastContainer, toast } from 'react-toastify';
import handleError from '../lib';

export default function Pets() {

  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [pets, setPets] = useState(null)
  const [allPets, setAllPets] = useState()
  const [editablePetId, setEditablePetId] = useState()
  const [allClients, setAllClients] = useState()

  const navigate = useNavigate()
  const params = useParams()
  const { userState } = useContext(AuthContext);
  const role = userState?.role


  useEffect(() => {
    (async () => {
      if (role === "client") {
        const pets = await fetchPets()
        setPets(pets)
      }
      if (role === "doctor") {
        const allPets = await fetchAllPets()
        const allClients = await fetchAllClients()

        setAllPets(allPets)
        setAllClients(allClients)
      }
    })()
  }, [userState])


  const fetchAllClients = async () => {
    try {
      const clientsResponse = await getAllClients()
      return clientsResponse.data
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const petsToDisplay = () => {
    if (role === "client") {
      return pets
    }

    if (role === "doctor") {
      if (params.usersId && params.petsId) {
        const filteredPets = allPets?.filter(pet => pet.usersId === Number(params.usersId) && pet.id === Number(params.petsId))
        return filteredPets
      }
      if (params.usersId) {
        return allPets?.filter(pet => pet.usersId === Number(params.usersId))
      }
      return allPets
    }
    return []
  }

  const handleRemovePet = async (id) => {
    try {
      setIsLoading(true)
      await deletePet(id)
      navigate("/pets")
      navigate(0)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePet = async (values) => {
    try {
      setIsLoading(true)
      await createPet(values)
      navigate("/pets")
      navigate(0)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllPets = async () => {
    try {
      setIsLoading(true)
      const allPetsResponse = await getAllPets()
      return allPetsResponse.data
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchPets = async () => {
    try {
      setIsLoading(true)
      const petsReponse = await getPets(userState.id)
      return petsReponse.data
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPet = async (values) => {
    try {
  
      setIsLoading(true)
      await editPet(values, editablePetId)
      navigate("/pets")
      navigate(0)
    } catch (error) {
      handleError(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div id='pets-page'>
      <HeaderBar
        disabled
        title={"Pets"}
        setIsCreateModalOpen={setIsCreateModalOpen} />
      <ToastContainer />
      {
        isCreateModalOpen && role === "client"
        &&
        <CreatePetForm
          handleCreatePet={handleCreatePet}
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen} />}
      {isCreateModalOpen &&
        allClients && role === "doctor" &&
        <DoctorCreatePetForm
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen}
          handleCreatePet={handleCreatePet}
          allClients={allClients}
        />}
      {isEditModalOpen &&
        <EditPetForm
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          handleEditPet={handleEditPet}
          editablePetId={editablePetId}
        petsToDisplay={petsToDisplay()}
        allClients={allClients}

        />
      }
      <Box id='pets-page-box'>
        {
          isLoading
          &&
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
          ||
          <PetsList
            petsToDisplay={petsToDisplay()}
            setIsEditModalOpen={setIsEditModalOpen}
            setEditablePetId={setEditablePetId}
            handleRemovePet={handleRemovePet}
  
          />
        }
      </Box>
    </div>
  );
}

