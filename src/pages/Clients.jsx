// CONTEXT
import { AuthContext } from '../context/AuthContext';

// MUI
import {  Box } from '@mui/material';
import { Dna } from 'react-loader-spinner'

// HOOKS
import { useNavigate, useParams } from 'react-router';
import { useContext, useEffect, useState } from 'react';

// COMPONENTS
import HeaderBar from '../components/HeaderBar';
import ClientsList from '../components/ClientsList';
import CreateClientForm from '../components/CreateClientForm';
import EditClientForm from '../components/EditClientForm';

// XHR ADAPTERS
import { getAllPets } from '../adapters/petsPageAdapter';
import { getAllClients } from '../adapters/clientsPageAdapter';
import { createClient, deleteClient, editClient } from '../adapters/clientsPageAdapter';

// CSS
import '../css/pages/Clients.css'

// LIB
import { searchObjects } from '../lib';

// TOASTIFY 
import { ToastContainer, toast } from 'react-toastify';

export default function Clients() {

  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editableClientId, setEditableClientId] = useState()
  const [allClients, setAllClients] = useState();
  const [pets, setPets] = useState();
  const [searchedClients, setSearchedClients] = useState()
  const [searchValue, setSearchValue] = useState()

  const navigate = useNavigate()
  const params = useParams()
  const { userState } = useContext(AuthContext)
  const role = userState?.role

  useEffect(() => {
    (async () => {
      if (role === "doctor") {
        const allClients = await fetchAllClients()
        const allPets = await fetchAllPets();

        setAllClients(allClients)
        setPets(allPets)
      }
    })()

  }, [userState])

  const clientsToDisplay = () => {
    if (role === "client") {
      return []
    }

    if (role === "doctor") {
      if (params.usersId) {
        return allClients?.filter(client => client.id === Number(params.usersId))
      }
      if (searchedClients) {
        return searchedClients
      }
      return allClients
    }
    return []
  }

  const fetchAllPets = async () => {
    try {
      const petsResponse = await getAllPets()
      return petsResponse.data
    } catch (error) {
      toast.error(error.message);
    }
  }


  const fetchAllClients = async () => {
    try {
      const clientsResponse = await getAllClients()
      return clientsResponse.data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }


  const handleCreateClient = async (values) => {
    try {
      setIsLoading(true)
      await createClient(values)
      navigate("/clients")
      navigate(0)
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setIsLoading(false)
    }

  }

  const handleRemoveClient = async (id) => {
    try {
      setIsLoading(true)
      await deleteClient(id)
      navigate('/clients')
      navigate(0)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditClient = async (values) => {
    try {
      setIsLoading(true)
      await editClient(values, editableClientId)
      navigate("/clients")
      navigate(0)
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setIsLoading(false)
    }
  }

  const handleSearchClients = (searchValue) => {
    const clientsToSearch = userState.role === "doctor" && allClients
    const result = searchObjects([clientsToSearch], searchValue)
    setSearchedClients(result)
  }

  return (
    <div id='clients-page'>
      <HeaderBar
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        handleSearchClients={handleSearchClients}
        title={"Clients"}
        setIsCreateModalOpen={setIsCreateModalOpen}
        userState={userState} />
      <ToastContainer />
      {isCreateModalOpen
        &&
        <CreateClientForm
          handleCreateClient={handleCreateClient}
          isCreateModalOpen={isCreateModalOpen}
          setIsCreateModalOpen={setIsCreateModalOpen} />}
      {isEditModalOpen &&
        <EditClientForm
          clients={allClients}
          editableClientId={editableClientId}
          isEditModalOpen={isEditModalOpen}
          handleEditClient={handleEditClient}
          setIsEditModalOpen={setIsEditModalOpen}
        />}
      <Box id='visits-page-box'>
        {isLoading && <Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        /> || <ClientsList
            setIsEditModalOpen={setIsEditModalOpen}
            setEditableClientId={setEditableClientId}
            handleRemoveClient={handleRemoveClient}
            clientsToDisplay={clientsToDisplay()}
            pets={pets}
          />}
      </Box>
    </div>
  );
}
