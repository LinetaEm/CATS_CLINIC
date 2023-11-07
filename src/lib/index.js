import { toast } from "react-toastify";

export function stringToColor(string) {
    let hash = 0;
    let i;
  
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
  
    return color;
  }
  
  export function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }


  export function extractObjectsWithId(array, id) {
    return array.filter(obj => obj.usersId === id);
  }
  
  export function searchObjects (arrays, searchValue) {
    const results = [];
    arrays.forEach(array => {
      array.forEach(obj => {
        if (Object.values(obj).some(value => value.toString().includes(searchValue))) {
          results.push(obj);
        }
      });
    });
    return results;
  }

  
export default function handleError(error) {
  const errorResponseData = error?.response?.data;
  const errorMessage = errorResponseData || error.message;
  toast.error(errorMessage);
}

export function findClientByPet(clients, pet) {

  const foundClient = clients.find(client => client.id === pet.usersId);
  return foundClient;
}