/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import { FcElectroDevices, FcEndCall } from "react-icons/fc";
import { BsMicMute } from "react-icons/bs";
import { BsMicMuteFill } from "react-icons/bs";
import { useNavigate, useParams } from 'react-router-dom';
import { get_Login_user, is_User_call } from '../api/Http';
import socket from '../Socket'
import freeice from 'freeice'
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast'


const SingleCall = () => {
  const navigate=useNavigate()

  const[calltime,setCallTime]=useState("0 : 0")
  const[isSpking,setIsSpeaking]=useState()
  const [user,setUser]=useState({})
  const[mute,setMute]=useState(false)
  const[change,setChange]=useState("")

  const login_user=useSelector(state=>state.user.user)

  const[callAccept,setCallAccept]=useState(false)

  const {id}=useParams()

  const localstreem=useRef(null)
  const remoteStreem=useRef(null)
  const peerConnection=useRef(null)
 

  useEffect(() => {
    let time=0
  if(callAccept===true){
    setCallTime(`0 : 0`)
    setInterval(()=>{
    time= time+=1
      if(time>60){
       const minite=Math.floor(time/60)
       const secand=time - (60*minite)
       const mote=`${minite} : ${secand}`
       setCallTime(mote)
      }else{
       const mote=`0 : ${time}`
       setCallTime(mote)
      }
    },1000)
  }
  
  }, [change,callAccept])
  

  // localstreem.current.getTracks().forEach((track)=>{
  //   track.stop()
  // })
  // socket.emit('CALL-END',{
  //   target:id,
  //   callend:true
  // })
  // navigate('/call')

  
  ///get single user by id
  const single_user=useMemo(()=>{
    return async()=>{
      try {
        const res =await get_Login_user(id)
        setUser(res.data.user)
      } catch (error) {
        console.log(error)
      }
    }

    
  },[id])

  //get user media
  const get_user_media=async()=>{
    const streem=await navigator.mediaDevices.getUserMedia({audio:true})
    localstreem.current=streem
  }

const offer=JSON.parse(localStorage.getItem('offer'))||""
const icecandidate=JSON.parse(localStorage.getItem('icecandidate'))||""


  //call user
  useEffect(() => {
    if(offer&&icecandidate) return
     single_user().then(async()=>{
      get_user_media().then(async()=>{
        try {
         
         peerConnection.current=new RTCPeerConnection({iceServers:freeice()})

          localstreem.current.getTracks().forEach((track)=>{
               peerConnection.current.addTrack(track,localstreem.current)
          })
        
          peerConnection.current.ontrack=(event)=>{
            remoteStreem.current.srcObject=event.streams[0]

            const audioContext = new AudioContext();
        const mediaStreamSource = audioContext.createMediaStreamSource(event.streams[0]);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
      
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        mediaStreamSource.connect(analyser);
      
        const checkAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
          setIsSpeaking(Math.floor(volume)); 
          requestAnimationFrame(checkAudioLevel);
        };
        checkAudioLevel();

          }

          socket.emit('SEND-CALL',{
            target:id,
            call_user:login_user?._id
          })
      
          peerConnection.current.onicecandidate=(event)=>{
            if(event.candidate){
              socket.emit('ICE-CANDIDATE',{
                candidate:event.candidate,
                targrt:id,
                user:login_user?._id
              })
            }
          }

          const offer=await peerConnection.current.createOffer()
          await peerConnection.current.setLocalDescription(offer)
          const res= await is_User_call(true)
          socket.emit('USER-IN-CALL',res.data)

          socket.emit('OFFER',{
              targrt:id,
              offer,
              user:login_user?._id
            })

        } catch (error) {
           console.log(error)
        }
      })
     })
  }, [id])

const name=user?.name?[...user.name][0]:""


//call accept

useEffect(() => {
  if(JSON.parse(localStorage.getItem('offer'))) setCallAccept(true)
  if(JSON.parse(localStorage.getItem('answar'))) setCallAccept(true)
  single_user()
  get_user_media().then(()=>{
    
    if(offer && icecandidate){
      const peerConn=new RTCPeerConnection({iceServers:freeice()})
      peerConnection.current=peerConn
       
      const add_offer=async()=>{
    
      try {
       
        peerConnection.current.ontrack=(event)=>{
          remoteStreem.current.srcObject=event.streams[0]

          const audioContext = new AudioContext();
        const mediaStreamSource = audioContext.createMediaStreamSource(event.streams[0]);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
      
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        mediaStreamSource.connect(analyser);
      
        const checkAudioLevel = () => {
          analyser.getByteFrequencyData(dataArray);
          const volume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
          setIsSpeaking(Math.floor(volume)); 
          requestAnimationFrame(checkAudioLevel);
        };
        checkAudioLevel();

        }
  
        localstreem.current.getTracks().forEach((track)=>{
          peerConnection.current.addTrack(track,localstreem.current)
        })
  
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer.offer)).then(async()=>{
          const answar=await peerConnection.current.createAnswer()
          await peerConnection.current.setLocalDescription(answar)
          socket.emit('ANSWAR',{
            targrt:offer.targrt,
            answar
          })
        })
  
        peerConnection.current.onicecandidate=(event)=>{
          if(event.candidate){
            socket.emit('ICE-CANDIDATE',{
              candidate:event.candidate,
              targrt:icecandidate.targrt,
              user:login_user?._id
            })
          }
        }
  
      } catch (error) {
        console.log("error in add offer",error)
      }
      }
      add_offer()
  
      const add_icecandidate=async()=>{
        try {
          if (peerConnection.current.remoteDescription) {
            peerConnection.current.addIceCandidate(new RTCIceCandidate(icecandidate.candidate));
          }
        } catch (error) {
          console.log("error in add icecandidate",error)
        }
      }
      add_icecandidate()
  
    }
  
  })

   socket.on('ICE-CANDIDATE',data=>{
      peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
    })

    socket.on('ANSWAR',data=>{
      localStorage.setItem('answar',JSON.stringify(data))
      setCallAccept(!callAccept)
      setChange(data)
      peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answar))
    })
  return ()=>{
   socket.off('ANSWAR')
   socket.off('ICE-CANDIDATE')
  }

}, [])

//call end
useEffect(() => {
  socket.on('CALL-END',data=>{
   if(peerConnection.current || localstreem.current){
     
     peerConnection.current.close()
     localstreem.current.getTracks().forEach((track)=>{
      track.stop()
    })
    
    peerConnection.current=null
    localstreem.current=null
    localStorage.removeItem('offer')
    localStorage.removeItem('icecandidate')
    localStorage.removeItem('answar')
    toast.error('call end')
    navigate('/call')
 
   }
  })
 
  return ()=>{
   socket.off('CALL-END')
  }
 }, [])



 const toggleMute = () => {
  if (localstreem.current) {
    localstreem.current.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
    setMute(!mute)
  }
};

  return (
    <>
    <Navbar/>
    <div className='md:w-[60%] p-3  mx-auto h-[90vh] flex flex-col justify-center items-center '>

      <audio ref={remoteStreem}  className='hidden' autoPlay controls></audio>

     <div  className={` ${isSpking>15?` w-[60%] h-40`:"w-32 h-32"} duration-300 relative flex justify-center items-center  p-2 rounded-full border mb-3 shadow-lg shadow-[#466d45]`}>
     <h3 className="size-12 z-30 w-32 absolute h-32 flex-none rounded-full flex justify-center items-center bg-zinc-600 text-4xl uppercase" >{name}</h3>
     </div>
     <div>
      <h2 className='font-semibold my-2 uppercase text-sm'>{user?.name}</h2>
     </div>
   
      <span className='my-4'> {calltime}</span>

     <div className='mt-4 flex gap-x-3 relative'>

      {
        !callAccept?<>
      
         <button onClick={()=>{
          localStorage.removeItem('offer')
          localStorage.removeItem('icecandidate')
          localStorage.removeItem('answar')
          localstreem.current.getTracks().forEach((track)=>{
            track.stop()
          })
          socket.emit('CALL-END',{
            target:id,
            callend:true
          })
          
          navigate('/call')
          location.reload()
         }} className='h-18 animate-bounce  w-18 rounded-full border-2 flex justify-center items-center border-red-500  hover:shadow-lg hover:shadow-red-400 duration-300 hover:scale-105'><FcEndCall size={'25'}/></button>

        </>:<>
        <button onClick={toggleMute} className={`rounded-full outline-0 absolute top-2 -left-18  h-14 w-14  flex justify-center items-center`}>

         {mute?<span className='text-green-500 '><BsMicMuteFill size={22}/></span>:<span><BsMicMute size={22}/></span>}</button>
         
        <button  onClick={()=>{
          localStorage.removeItem('offer')
          localStorage.removeItem('icecandidate')
          localStorage.removeItem('answar')
          localstreem.current.getTracks().forEach((track)=>{
            track.stop()
          })
          socket.emit('CALL-END',{
            target:id,
            callend:true
          })
          navigate('/call')
          location.reload()
         }} className='h-18  w-18 rounded-full border-2 flex justify-center items-center border-red-500  hover:shadow-lg hover:shadow-red-400 duration-300 hover:scale-105'><FcEndCall size={'25'}/></button>

        </>
      }

     </div>
    </div>
    </>
  )
}

export default SingleCall
