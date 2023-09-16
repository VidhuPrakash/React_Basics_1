import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import '../AddUser/adduser.css'
    function AddUserPage({fetchUsers}) {
      // set user data initial null
        const [user, setUser] = useState({ username: '', name: '', email: '', phone: '', address: '' });
      // set user data from change in handle
      const [error,setError] = useState('')
      const handleChange = (e) => {
        // if(e.target.value !== null && e.target.value.trim() !== ''){
          console.log(e.target.value)
          setUser({ ...user, [e.target.name]: e.target.value });
        // }
      };

      // post user data when clicking the form
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user.username || !user.name || !user.email || !user.phoneNumber || !user.address) {
          setError('All field must be filled out');
          return;
        }
        try {
          // Make a POST request to your API to create the user
          await axios.post('/admin', user);
          setError('');
          fetchUsers();
          setUser({ username: '', name: '', email: '', phoneNumber: '', address: '' });
        } catch (error) {
          console.error("Error creating user:", error);
        }
      };
      
        return (
          <div className='adduser'>
            <h1 className="title-head">ADD NEW USER</h1>
          <form onSubmit={handleSubmit} className='add-user-form'>
            <input type="text" name="username" placeholder="Username" value={user.username} onChange={handleChange} />
            <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
            <input type="tel" name="phoneNumber" placeholder="Phone Number" value={user.phoneNumber} onChange={handleChange} />
            <textarea name="address" placeholder="Address" value={user.address} onChange={handleChange} />
            <button type="submit">Add User</button>
          </form>
            {error &&<p>{error}</p>}
          </div>
  )
}

export default AddUserPage;