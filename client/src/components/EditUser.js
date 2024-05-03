
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUser = () => {
  const [user, setUser] = useState(null);
  const userId = '66350beee45392718284ff0b'; // The user ID you want to fetch

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log('Fetching user...');
        const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
        console.log('User data:', response.data); // Log user data
        setUser(response.data); // Update state with user data
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [userId]);

  return (
    <div>
      {user ? (
        <div>
          <h2>User Details</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Admin:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
          <p><strong>Doctor:</strong> {user.isDoctor ? 'Yes' : 'No'}</p>
          {/* Add more user details as needed */}
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default EditUser;
