import React, { useState, useEffect } from 'react';
import { fetchProfile, updateProfile } from '../services/api';

const Profile = () => {
  const [profile, setProfile] = useState({ name: '', bio: '', avatar: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetchProfile();
        setProfile(response.data);
      } catch (error) {
        setMessage('Error fetching profile');
      }
    };

    getProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(profile);
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" onChange={handleChange} value={profile.name} placeholder="Name" required />
      <input type="text" name="bio" onChange={handleChange} value={profile.bio} placeholder="Bio" />
      <input type="text" name="avatar" onChange={handleChange} value={profile.avatar} placeholder="Avatar URL" />
      <button type="submit">Update Profile</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default Profile;

