// HOOKS
import { useContext, useEffect } from 'react';

// ROUTER DOM
import { useNavigate } from "react-router-dom";

// CONTEXT
import { AuthContext } from '../context/AuthContext';

// COMPONENTS
import RegisterForm from '../components/RegisterForm';

// CSS
import '../css/pages/Register.css'

export default function Register() {
  const { userState } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (userState) navigate('/visits')
  }, [userState])

  return (
    <div id='register-page'>
      <RegisterForm
        navigate={navigate}
         />
    </div>
  );
}

