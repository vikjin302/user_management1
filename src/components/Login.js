import React ,{useState} from 'recat';
import { loginOtp } from '../services/api';

const Login = ()=>{
    const[email,setEmail] = useState('');
    const[otp,setOtp] = useState('');
    const[message,setMessage] = useState('');
    const handleEmailSubmit = async(e)=>{
        e.preventDefault();
        setMessage('OTP has been sent to your email-id');
    };

    const hadleOtpEmail = async(e)=>{
        e.preventDefault();
        try{
            const response = await loginOtp({email,otp});
            localStorage.setItem('token',response.data.token);
            setMessage('Login Success');
        }catch(error){
            setMessage('Error during OTP');
        }
    };
    return(
        <>
        <div>
            <form onSubmit={handleEmailSubmit}>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your Email' required/>
                <button type="submit">Get OTP</button>
            </form>
            <form onSubmit={handleOtpSubmit}>
                <input type="text" onChange={(e)=> setOtp(e.target.value)} value={otp} placeholder="Enter the Otp your recived on your Email-id" required/>
                <button type="submit">Submit OTP and Login</button>
            </form>

            {message && <p>{message}</p>}
            
            




        </div>
        </>
    );
};

export default Login;