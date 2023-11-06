// HOOKS
import { useContext, useEffect, useState } from 'react';

// ROUTER DOM
import { useNavigate } from "react-router-dom";

// CONTEXT
import { AuthContext } from '../context/AuthContext';

// COMPONENTS
import LoginForm from '../components/LoginForm';

// CSS
import "../css/pages/Login.css"

export default function Login() {
  const [isLoginAsDoctor, setIsLoginAsDoctor] = useState(false)
  const { userState } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (userState) navigate('/visits')
  }, [userState])

  const handleCheckBox = (e) => {
    const { target: { checked } } = e
    setIsLoginAsDoctor(checked)
  }

  return (
    <div id='login-page'>
        <LoginForm
          handleCheckBox={handleCheckBox}
          isLoginAsDoctor={isLoginAsDoctor}
          navigate={navigate} />
    </div>
  )
}

