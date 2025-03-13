import { useEffect, useRef, useState } from "react";
import { SlCallIn } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineCallEnd } from "react-icons/md";
import { get_Login_user } from "../api/Http";
import socket from "../Socket";

const CallModel = ({modalOpen,setModalOpen,trigger,callUser}) => {
       
         const modal = useRef(null);

        const [user, setUser] = useState({})
        const navigate=useNavigate()
       

        useEffect(() => {
           const clickHandler = ({ target }) => {
             if (!modal.current) return;
             if (
               !modalOpen ||
               modal.current.contains(target) ||
               trigger.current.contains(target)
             )
               return;
             setModalOpen(false);
           };
           document.addEventListener("click", clickHandler);
           return () => document.removeEventListener("click", clickHandler);
         });
       
         // close if the esc key is pressed
         useEffect(() => {
           const keyHandler = ({ keyCode }) => {
             if (!modalOpen || keyCode !== 27) return;
             setModalOpen(false);
           };
           document.addEventListener("keydown", keyHandler);
           return () => document.removeEventListener("keydown", keyHandler);
         });

         useEffect(() => {
           if(callUser){
            const get_call_user=async()=>{
              const res=await get_Login_user(callUser)
              setUser(res.data.user)
             }
             get_call_user()
           }
         }, [callUser])

         let name;
         if(user?.name){
         name= [...user.name][0]
         }
  return (
    
      <div className="container mx-auto ">
       
        <div
          className={`fixed left-0 top-0 flex h-full z-40 min-h-screen w-full  justify-center bg-dark/90 px-4 py-5 ${
            modalOpen ? "block" : "hidden"
          }`}
        >
          <div
            ref={modal}
            onFocus={() => setModalOpen(true)}
            onBlur={() => setModalOpen(false)}
            className="w-full max-w-[570px] rounded-[20px] bg-zinc-900 px-8 py-12 text-center dark:bg-dark-2 md:px-[70px] md:py-[60px] h-fit border  border-zinc-600"
          >
           

          <div>
          <div className="flex min-w-0 ">
          <h3 className="size-12 flex-none rounded-full flex justify-center items-center bg-zinc-600 " >{name}</h3>
            <div className="min-w-0 flex flex-col items-start justify-center ml-4 ">
              <p className="text-sm/6 font-semibold text-gray-300">{user?.name}</p>
              <p className="mt-1 truncate text-xs/5 text-gray-400">{user?.email}</p>
            </div>
          </div>

          </div>


            <span
              className={`mx-auto mb-6 inline-block h-1 w-[90px] rounded bg-primary`}
            ></span>
          
            <div className="-mx-3 flex flex-wrap">
              <div className="w-1/2 px-3">
                <button
                  onClick={() =>{
                    setModalOpen(false)
                    localStorage.removeItem('offer')
                    localStorage.removeItem('icecandidate')
                    localStorage.removeItem('answar')
                    socket.emit('CALL-END',{
                      target:callUser,
                      callend:true
                    })
                     navigate('/call')
                    }}
                  className=" h-12 flex justify-center items-center w-full rounded-md border border-red-400 text-red-500 p-3 text-center text-base font-medium text-dark transition hover:border-red-600 hover:bg-red-600 hover:text-white "
                >
                  <MdOutlineCallEnd size={18}/>
                </button>
              </div>
              <div className="w-1/2 px-3">
                <Link  to={`/call/${callUser}`}  className=" w-full h-12 flex justify-center items-center rounded-md border border-green-400 bg-primary p-3 text-center hover:text-white text-base font-medium  text-green-400  transition hover:bg-green-600">
                  <span > <SlCallIn size={18}/> </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  
  )
}

export default CallModel
