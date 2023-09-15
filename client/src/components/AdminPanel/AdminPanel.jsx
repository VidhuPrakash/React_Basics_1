import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminPage() {
  let navigate = useNavigate();
  const [users, setUser] = useState([]);
  // const [selectedUser, setSelectedUser] = useState(null);
// to show user data
  useEffect(() => {
    fetchUsers();
  }, []);
// 
  const updateUser = async (index, updatedUser) => {
    setUser(users.map((user, i) => (i === index ? updatedUser : user)));
    // Make an API call to update the user in the backend
  if (updatedUser) {
    await axios.put(`/admin/${updatedUser._id}`, updatedUser);
  }
  };

  const fetchUsers = async () => {
    const response = await axios.get("/admin");
    if (Array.isArray(response.data)) {
      setUser(response.data);
    } else {
      console.error('API did not return an array');
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`admin/${id}`);
    fetchUsers();
  };

  const AddUser = () => {
    navigate("user");
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <button onClick={AddUser}>Add User</button>
      {users.map((user,index) => (
        <div key={user._id}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateUser(user);
            }}
          >
            <table>
              <thead>
                <tr>
                  <td>UserName</td>
                  <td>Name</td>
                  <td>PhoneNumber</td>
                  <td>Email</td>
                  <td>Address</td>
                </tr>
              </thead>
              <tbody>
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
                        updateUser(index, { ...user, phoneNumber: e.target.value })
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
                    <input
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
          </form>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
