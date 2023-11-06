// CONTEXT
import { AuthContext } from '../context/AuthContext';

// MUI
import {  Box } from '@mui/material';
import { Dna } from 'react-loader-spinner'

// HOOKS
import { useContext, useEffect, useState } from 'react';
import HeaderBar from '../components/HeaderBar';
import { useNavigate, useParams } from 'react-router';

// COMPONENTS
import DoctorCreateVisitForm from '../components/DoctorCreateVisitForm';
import EditVisitForm from '../components/EditVisitForm';
import VisitsList from '../components/VisitsList';
import CreateVisitForm from '../components/CreateVisitForm';

// XHR ADAPTERS
import { createVisit, deleteVisit, editVisit, getAllVisits, getClientVisits } from '../adapters/visitsPageAdapter';
import { getAllClients } from '../adapters/clientsPageAdapter';
import { getAllPets, getPets } from '../adapters/petsPageAdapter';

// CSS
import '../css/pages/Visits.css'

// LIB
// import { searchObjects } from '../lib';


// TOASTIFY 
import { ToastContainer, toast } from 'react-toastify';


export default function Visits() {

  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [visits, setVisits] = useState();
  const [allVisits, setAllVisits] = useState();
  const [pets, setPets] = useState();
  const [allPets, setAllPets] = useState();
  const [allClients, setAllClients] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editableVisitId, setEditableVisitId] = useState()
  // const [client, setClient] = useState()


  const params = useParams()
  const navigate = useNavigate()
  const { userState } = useContext(AuthContext)
  const role = userState?.role

  useEffect(() => {
    (async () => {
      if (userState) {
        const pets = await fetchPets();
        const visits = await fetchVisits();
        // const client = await fetchClient();
        const allClients = await fetchAllClients();
        const allPets = await fetchAllPets();
        const allVisits = await fetchAllVisits();


        // setClient(client)
        setPets(pets)
        setVisits(visits)
        setAllVisits(allVisits)
        setAllPets(allPets)
        setAllClients(allClients)
        setIsLoading(false)
      }
    })()
  }, [userState])

  const visitsToDisplay = () => {
    if (role === "client") {
      return visits
    }

    if (role === "doctor") {
      if (params.usersId) {
        return allVisits?.filter(visit => visit.usersId === Number(params.usersId))
      }

      return allVisits
    }
  }

  // const fetchClient = async () => {
  //   try {
  //     setIsLoading(true)
  //     const clientResponse = await getClient(userState.id)
  //     return clientResponse.data
  //   } catch (error) {
  //     <Alert severity="error">{error.message}</Alert>
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const fetchAllVisits = async () => {
    try {
      setIsLoading(true)
      const visitsResponse = await getAllVisits()
      return visitsResponse.data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllPets = async () => {
    try {
      setIsLoading(true)
      const petsResponse = await getAllPets()
      return petsResponse.data
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAllClients = async () => {
    try {
      const clientsResponse = await getAllClients()
      return clientsResponse.data
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchVisits = async () => {
    try {
      const clientVisitsReponse = await getClientVisits(userState.id)
      return clientVisitsReponse.data
    } catch (error) {
      toast.error(error.message);
    }
  }

  const fetchPets = async () => {
    try {
      const petsResponse = await getPets(userState.id)
      return petsResponse.data
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleCreateVisit = async (values) => {
    try {
      setIsLoading(true)
      let payload
      if (role === "doctor") {
        payload = values
      }

      if (role === "client") {
        payload = {...values, usersId: userState.id}
      }
      await createVisit(payload)
      navigate("/visits")
      navigate(0)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveVisit = async (id) => {
    try {
      setIsLoading(true)
      await deleteVisit(id)
      navigate("/visits")
      navigate(0)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditVisit = async (values) => {
    try {
      setIsLoading(true)
      await editVisit(values, editableVisitId)
      navigate("/visits")
      navigate(0)
    } catch (error) {
      toast.error(error.message);
    }
    finally {
      setIsLoading(false)
    }
  }

  // const handleSearchVisits = (searchValue) => {
  //   const visitsToSearch = userState.role === "doctor" && allVisits || visits
  //   const petsToSearch = userState.role === "doctor" && allPets || pets
  //   const clientsToSearch = userState.role === "doctor" && allClients || client
  // }



  return (
    <div id='visits-page'>
      <HeaderBar
        disabled
        // handleSearchVisits={handleSearchVisits}
        title={"Visits"}
        setIsCreateModalOpen={setIsCreateModalOpen}
        userState={userState} />
        <ToastContainer />
        {isCreateModalOpen && pets
          && userState.role === "doctor" &&
          <DoctorCreateVisitForm
            handleCreateVisit={handleCreateVisit}
            allPets={allPets}
            isCreateModalOpen={isCreateModalOpen}
            clients={allClients}
            setIsCreateModalOpen={setIsCreateModalOpen} />}
        {isCreateModalOpen && pets
          && userState.role === "client" &&
          <CreateVisitForm
            handleCreateVisit={handleCreateVisit}
            pets={pets}
            isCreateModalOpen={isCreateModalOpen}
            setIsCreateModalOpen={setIsCreateModalOpen} />}
        {isEditModalOpen &&
          <EditVisitForm
            allVisits={allVisits}
            allPets={allPets}
            pets={pets}
            editableVisitId={editableVisitId}
            setEditableVisitId={setEditableVisitId}
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            handleEditVisit={handleEditVisit}
          />
        }
        <Box id='visits-page-box'>
          {isLoading && <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          /> || <VisitsList
              visitsToDisplay={visitsToDisplay()}
              setIsEditModalOpen={setIsEditModalOpen}
              setEditableVisitId={setEditableVisitId}
              clients={allClients}
              handleRemoveVisit={handleRemoveVisit}
              visits={visits}
              allVisits={allVisits}
              pets={allPets} />}
        </Box>
    </div>
  );
}
