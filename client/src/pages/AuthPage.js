import React from 'react'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

const AuthPage = () => {
  return (
    <div className='flex justify-between'>
        <LoginPage />
        <RegisterPage />
    </div>
  )
}

export default AuthPage