import React, { useEffect, useMemo, useState } from 'react'
import Usercard from '../components/Usercard';
import { getAll_login_Users, is_User_call } from '../api/Http';
import { useDispatch, useSelector } from 'react-redux';
import socket from '../Socket';
import { setChange } from '../redux/ChangeSlice';

const Users = ({search}) => {
  const [users,setUsers]=useState([])
  const dispatch=useDispatch()
  const {user}=useSelector(state=>state.user)
  const {change}=useSelector(state=>state.change)

  ///send user online ofline
   useEffect(() => {
   if(user?._id){
    socket.emit('USER',user?._id)
    return () => socket.off("USER")
   }
   }, [user])

  const get_all_users=useMemo(()=>{
   return async()=>{
      try {
        const res=await getAll_login_Users(search)
        setUsers(res.data.users)
      } catch (error) {
        console.log(error)
      }
    }
},[search])

  useEffect(()=>{
    get_all_users()
  },[search,change])

  useEffect(() => {
    socket.on('USER-IN-CALL',data=>{
      dispatch(setChange(data))
    })
    
    return () => {
      socket.off('USER-IN-CALL')
    };
  }, [])

  useEffect(() => {
   const userOffline=async()=>{
    const res=await is_User_call(false)
    socket.emit('USER-IN-CALL',res.data)
   }
   userOffline()
  }, [])

  return (
    <div className='md:w-[60%] flex flex-col  items-center mx-auto'>
     {
      users?.length?<>
       {
        users?.map((user,i)=>(
          <Usercard user={user} key={i}/>
        ))
      }
      </>:<>
      <div className='w-full p-5 flex justify-center items-center'>
         <span className='text-zinc-400'>No user found?</span>
      </div>
      </>
     }
    </div>
  )
}

export default Users
