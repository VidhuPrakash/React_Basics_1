import React, { useState, useEffect } from "react";
import axios from "axios";
import AddUserPage from "./components/AddUser/AddUser";
import "../src/components/AdminPanel/adminpanel.css";
function AdminPage() {
  // let navigate = useNavigate();
  const [users, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  // const [selectedUser, setSelectedUser] = useState(null);
  // to show user data
  useEffect(() => {
    fetchUsers();
  }, []);
  //
  const updateUser = async (index, updatedUser) => {
    // setUser new updated user details
    setUser(users.map((user, i) => (i === index ? updatedUser : user)));
  
    // Make an API call to update the user in the backend
    if (updatedUser) {
      try {
        await axios.put(`/admin/${updatedUser._id}`, updatedUser);
        updatedUser.errorMessage('');
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          updatedUser.errorMessage = error.response.data.error; // Set the error message in state
        } else if (error.request) {
          // The request was made but no response was received
          updatedUser.errorMessage = 'No response received from server.';
        } else {
          // Something happened in setting up the request that triggered an Error
          updatedUser.errorMessage='';

        }
      }
    }
  };

  const fetchUsers = async () => {
    const response = await axios.get("/admin");
    if (Array.isArray(response.data)) {
      setUser(response.data);
    } else {
      console.error("API did not return an array");
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`admin/${id}`);
    fetchUsers();
  };

  return (
    <div className="container">
      <div className="navbar">
        <h1 className="Title">Admin Panel</h1>
      </div>
      <AddUserPage fetchUsers={fetchUsers} />
      <div className="showUser">
        <div className="title-head">
          <h1>USERS DATA</h1>
        </div>
      {users.map((user, index) => (
        <div key={user._id}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(user);
            }}
          >
            <table>
              <thead className="thead">
                <tr>
                  <td>UserName</td>
                  <td>Name</td>
                  <td>PhoneNumber</td>
                  <td>Email</td>
                  <td>Address</td>
                </tr>
              </thead>
              <tbody className="tbody">
                <tr>
                  <td>
                    <input
                      type="text"
                      value={user.username}
                      onChange={(e) =>
                        updateUser(index, { ...user, username: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={user.name}
                      onChange={(e) =>
                        updateUser(index, { ...user, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={user.phoneNumber}
                      onChange={(e) =>
                        updateUser(index, {
                          ...user,
                          phoneNumber: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={user.email}
                      onChange={(e) =>
                        updateUser(index, { ...user, email: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      type="text"
                      value={user.address}
                      onChange={(e) =>
                        updateUser(index, { ...user, address: e.target.value })
                      }
                    />
                  </td>

                  <td>
                    <button type="submit">Update</button>
                  </td>
                  <td>
                    <button type="button" onClick={() => deleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {user.errorMessage&&<p>{user.errorMessage}</p>}
          </form>
        </div>
      ))}
      </div>
    </div>
  );
}

export default AdminPage;
