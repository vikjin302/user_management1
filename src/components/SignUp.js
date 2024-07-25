import React ,{useState} from 'react';
import {signup} from '../services/api';

const SingnUp=()=>{
    const [formData,setFormData]=useState({
        email:'',
        password:'',
        name:''
    });
    const [message,setMessage]= useState('');

    const handleChange=(e)=>{
        const {name,value} = e.target;
        setFormData({ ...formData,[name]:value});
    };
    if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      setError('');

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response = await SingnUp(formData);
            setMessage(response.data);
        }
        catch(error){
            setMessage('Error During SignUp!');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h1>SingnUp Page</h1>
            <input type="email" name="email" onChange={handleChange} value={formData.email} placeholder='Please enter your E-mail'/>
            <input type="password" name="password" onChange={handleChange} value={formData.password} placeholder='Enter your password!'/>
            <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder="Confirm Password"/>
            <input type="text" name="name" onChange={handleChange} value={formData.name} placeholder='Enter your name'/>
            <button type="submit">Sign Up!</button>
            {error && <p style={{ color :'red' }}>{error}</p>}
            {message && <p>{message}</p>}
        
            
        </form>
    );

};