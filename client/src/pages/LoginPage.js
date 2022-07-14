/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../__redux__/actions/auth.action';

const LoginPage = ({ loginUser }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const onChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleChange = (e) => {
        e.preventDefault();
        const user = {email: formData.email, password: formData.password};
        loginUser(user);
        navigate("/createArticle");
    }

  return (
    <div className='w-full mr-1'>
        <h1 className="text-5xl text-center mb-5">Login</h1>
        <form>
            <div className="mt-3 mb-3">
                <input type="email" value={formData.email} onChange={onChange} name="email" placeholder='Enter Email' className="outline-none rounded-0 border-2 border-[#3944f7] w-full px-2 py-5" />
            </div>
            <div className="mt-3 mb-3">
                <input type="password" value={formData.password} onChange={onChange} name="password" placeholder='Enter Password' className="outline-none rounded-0 border-2 border-[#3944f7] w-full px-2 py-5" />
            </div>
            <div className="mt-3 mb-3">
                <button type="submit" className="outline-none rounded-0 border-2 border-[#3944f7] bg-[#3944f7] text-[#ffffff] w-full px-2 py-5" onClick={handleChange}>Login</button>
            </div>
        </form>
    </div>
  )
}

export default connect(null, { loginUser })(LoginPage)