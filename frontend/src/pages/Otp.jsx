import {  useEffect, useState } from "react";
import { InputOtp } from 'primereact/inputotp';
import '../css/Login.css'
import toast from 'react-hot-toast'
import { OTP_verify_api } from "../api/Http";
import {useLocation, useNavigate} from 'react-router-dom'
import { useDispatch } from "react-redux";
import {setChange} from '../redux/ChangeSlice'
const Otp = () => {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [otp, setOTP] = useState("");
  const data=useLocation()

  useEffect(() => {
    if(data.state === null) {
      toast.error('Login is required')
      return navigate('/')
     }
  }, [])


  const handle_otp_verify=async(e)=>{
     e.preventDefault()
     const email =data.state.email;
     try {
      const res=await OTP_verify_api(otp,email)
     if(res.data.success){
      toast.success(res.data.message)
      localStorage.setItem('call-token',res.data.token)
      dispatch(setChange(res.data))
      navigate('/call')
      location.reload()
     }else{
      toast.error(res.data.message)
     }
     } catch (error) {
      toast.error('somthing waight wrong')
      console.log(error)
     }
  }

  return (
        <section>
          <div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000" className="container w-[20rem] bg-white flex flex-col p-5 rounded *:w-full justify-center ">
       <div className="logo">
        <img alt="Company Logo" height="50" src="https://storage.googleapis.com/a1aa/image/EwAxiWD0WqIkXGy7Hy-qMgIH7R7rmfYhTDt4I77mdec.jpg" width="50"/>
       </div>
       <h2>
       Verify your account
       </h2>
       <form onSubmit={handle_otp_verify} className='w-60 flex justify-center flex-col items-center'> 
        
       <InputOtp value={otp} inputMode="numeric"  onChange={(e) =>setOTP(e.value)}/>
        <button className="btn mt-5" type="submit">
         Verify
        </button>
       </form>
      
       
      </div>
    
        </section>
  );
};

export default Otp;
