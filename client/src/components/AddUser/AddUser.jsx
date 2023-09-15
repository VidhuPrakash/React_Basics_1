import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

    function AddUserPage() {
      let navigate = useNavigate();
      // set user data initial null
        const [user, setUser] = useState({ username: '', name: '', email: '', phone: '', address: '' });
      // set user data from change in handle
        const handleChange = (e) => {
          setUser({ ...user, [e.target.name]: e.target.value });
        };

        const goAdmin=()=>{
          navigate('/admin');
        }
      // post user data when clicking the form
        const handleSubmit = async (e) => {
          e.preventDefault();
          // Make a POST request to your API to create the user
          await fetch('/admin/newuser', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
          });
          setUser({ username: '', name: '', email: '', phoneNumber: '', address: '' });
        };
      
        return (
          <>
          <button onClick={goAdmin}>Go TO ADMIN PAGE</button>
          <form onSubmit={handleSubmit}>
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleChange} />
            <textarea name="address" placeholder="Address" value={user.address} onChange={handleChange} />
            <button type="submit">Add User</button>
          </form>
          </>
  )
}

export default AddUserPage;