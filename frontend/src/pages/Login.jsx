import { useState } from 'react';
import { login_api } from '../api/Http';
import '../css/Login.css'
import { FaGoogle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Login = () => {
 const navigate=useNavigate()
 const [email,setEmail]=useState('')

const handleSubmit=async(e)=>{
   e.preventDefault()
  try {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(email)) return toast.error('please enter valide email')
    const res=await login_api(email)
    if(res.data.success){
      toast.success(`dear ${res.data.name} otp sent your email`)
      navigate('/otp',{state:{email}})
    }else{
      toast.error('Please enter valide information')
    }
  } catch (error) {
     console.log(error)
  }
}

  return (
    <section>
      <div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000" className="container w-[30rem] bg-white flex flex-col p-5 rounded *:w-full justify-center ">
   <div className="logo">
    <img alt="Company Logo" height="50" src="https://storage.googleapis.com/a1aa/image/EwAxiWD0WqIkXGy7Hy-qMgIH7R7rmfYhTDt4I77mdec.jpg" width="50"/>
   </div>
   <h2>
    Sign in to your account
   </h2>
   <form className='w-96' onSubmit={handleSubmit}> 
    <div className="form-group">
     <label htmlFor="email">
      Email address
     </label>
     <input id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='name@gmail.com' type="email" className='placeholder:text-gray-400 text-black font-mono placeholder:text-sm '  />
    </div>
    
    <button className="btn" type="submit">
     Sign in
    </button>
   </form>
   <span className='p-2'></span>
   <div className="divider ">
    <span>
     Or continue with
    </span>
   </div>
   <span className='p-2'></span>
   <div className="social-login flex  ">
    <button className='w-full  flex gap-x-3 bg-zinc-800 items-center justify-center'>
    <span ><FaGoogle/></span>
     Conitnue with google
    </button>
    
   </div>
  </div>

    </section>
  )
}

export default Login
