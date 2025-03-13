import { IoCallOutline } from "react-icons/io5";
import {Link} from 'react-router-dom'
import socket from "../Socket";
import {  useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChange } from "../redux/ChangeSlice";
const Usercard = ({user}) => {
  const name=[...user.name][0]
  const [onlineUser,setOnlineUsers]=useState([])
  const {change}=useSelector(state=>state.change)
  const dispatch=useDispatch()

  useEffect(()=>{
    socket.on('USER-ONLINE',data=>{
      setOnlineUsers(data)
      dispatch(setChange(data))
     })
  },[change])

  return (
    <>
      <div data-aos="fade-up"
     data-aos-anchor-placement="center-bottom" className="flex md:w-[35rem] border w-full border-zinc-700 mt-2 justify-between gap-x-6 py-5 rounded-lg bg-zinc-900 p-2">
          <div className="flex min-w-0 gap-x-4">
             <h3 className="size-12 flex-none rounded-full flex justify-center items-center bg-zinc-600 " >{name}</h3>
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-300">{user?.name}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-400">{user?.email}</p>
            </div>
          </div>
          <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
            
            <div className="mt-1 flex items-center gap-x-1.5">
              <span className="text-sm uppercase mr-3">{user?.isin_call?"in call":"not in call"}</span>
             {user?.isOnline?<div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500 "></div>
              </div>:<>
              {
                onlineUser.includes(user?._id)&&<div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500 "></div>
              </div>
              }
              </>}
              <p className="text-xs/5 text-gray-500">{user?.isOnline?<span className="text-zinc-400">Online</span>:<span>
                {
                  onlineUser?.includes(user?._id)?<span className="text-zinc-400">Online</span>:<span>ofline</span>
                }
                </span>}</p>
                {
                  user?.isin_call?<Link  className='text-sm h-10 w-10 flex justify-center items-center  bg-green-600 ml-2 rounded-lg'><IoCallOutline size={18}/></Link>:<Link to={`/call/${user?._id}`} className='text-sm h-10 w-10 flex justify-center items-center  bg-green-600 ml-2 rounded-lg'><IoCallOutline size={18}/></Link>
                }
            </div>
          </div>
        </div>
      
    </>
  )
}

export default Usercard
