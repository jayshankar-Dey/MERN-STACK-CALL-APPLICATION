import React, { useEffect, useState } from 'react'
import { IoMdLogOut } from "react-icons/io";
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addUser} from '../redux/UserSlice'
import {setChange} from '../redux/ChangeSlice'
import toast from 'react-hot-toast'
const Navbar = ({setSearch,searchBar}) => {

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const[search,setsearch]=useState('')

  const logout=()=>{
   dispatch(addUser(null))
   localStorage.removeItem('call-token')
   toast.success('logout scucefully')
   dispatch(setChange("logout"))
   navigate('/')
   location.reload()
  }

  useEffect(() => {
   if(searchBar){
    const debouncing=setTimeout(()=>{
      setSearch(search)
    },1000)
    return () =>clearTimeout(debouncing)
   }
  }, [search])
  

   return (
    <>
      <div  className='bg-zinc-700 p-3'>
      <div className='md:w-[60%]  mx-auto '>
        <div className='flex justify-between'>
        <Link to={'/call'} className='flex gap-x-3 justify-center items-center'>
        <img alt="Company Logo" height="50" src="https://storage.googleapis.com/a1aa/image/EwAxiWD0WqIkXGy7Hy-qMgIH7R7rmfYhTDt4I77mdec.jpg" width="50" className='rounded-full mix-blend-color-burn'/>
        <h2 className='font-semibold text-xl'>App</h2>
        </Link>
        {searchBar&&<input value={search} onChange={(e)=>setsearch(e.target.value)} type="text"  placeholder='Search..' className='border sm:w-56 px-4 placeholder:text-zinc-300 border-blue-400 lg:w-96 placeholder:text-sm w-32 outline-0 rounded-full bg-zinc-900 '/>}

        <button onClick={logout} className='bg-zinc-900 hover:border-blue-500  rounded  hover:border flex gap-x-3 justify-center items-center'><IoMdLogOut/> Logout</button>
        </div>
      </div>
      </div>
    </>
  )
}

export default Navbar
