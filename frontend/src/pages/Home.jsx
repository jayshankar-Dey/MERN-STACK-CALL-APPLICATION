/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { IoCallOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { TbUserSquare } from "react-icons/tb";
import { HiUserGroup } from "react-icons/hi2";
import Users from '../components/Users';
import Groups from '../components/Groups';
import Navbar from '../components/Navbar';
import CallModel from '../components/CallModel';
import socket from '../Socket';
//import { useNavigate } from 'react-router-dom';



const Home = () => {
     // const navigate=useNavigate()
      const menu=[<TbUserSquare/>,<HiUserGroup/>]

       const [I,setI]=useState(0)
       const[search,setSearch]=useState('')
       const[callUser,setCallUser]=useState('')

      
       const [modalOpen, setModalOpen] = useState(false);
       const trigger = useRef(null);


       useEffect(() => {
       localStorage.removeItem('answar')
       socket.on('GET-CALL',user=>{
         setCallUser(user)
         setModalOpen(true)
       })

       socket.on('ICE-CANDIDATE',data=>{
        localStorage.setItem('icecandidate',JSON.stringify(data))
       })

       socket.on('OFFER',data=>{
        localStorage.setItem('offer',JSON.stringify(data))
       })

        socket.on('CALL-END',data=>{
          setModalOpen(false)
          localStorage.removeItem('offer')
          localStorage.removeItem('icecandidate')
          localStorage.removeItem('answar')
        })

        return ()=>{
          socket.off('CALL-END')
          socket.off('GET-CALL')
          socket.off('OFFER')
          socket.off('ICE-CANDIDATE')
        }
      }, [])

  return (
    <>
  {/* ///model */}
<CallModel  modalOpen={modalOpen} setModalOpen={setModalOpen} trigger={trigger} callUser={callUser}/>
  {/* //end model */}
  <div className='w-screen h-screen '>
  <Navbar setSearch={setSearch} searchBar={true}/>
<div  className='md:w-[60%]  mx-auto '>
 <ul className=' flex gap-x-1'>
   {
       menu.map((icon,i)=>(
              <li key={i} onClick={()=>setI(i)} className={`h-16 cursor-pointer text-zinc-200 w-16 text-xl rounded-bl-full rounded-br-full flex justify-center duration-300 hover:bg-zinc-600 items-center ${i==I&&"bg-zinc-700"} `}>{icon}</li>
       ))
   }
 </ul>
</div>

<div className='h-[77%] overflow-scroll   w-screen pt-4 p-1'>
{
       I==0?<Users search={search}/>:<Groups search={search}/>
}
</div>
      
    </div>
    </>
  )
}

export default Home
