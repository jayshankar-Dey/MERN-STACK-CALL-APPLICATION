import { Navigate } from "react-router-dom"
import { get_Login_user } from "../api/Http"
import {useDispatch} from 'react-redux'
import {addUser} from '../redux/UserSlice'

const PrivetRoute = ({children}) => {
  const token=localStorage.getItem('call-token')
  const dispatch=useDispatch()
  
  const login_user=async()=>{
   try {
     const id=""
      const res=await get_Login_user(id)
      dispatch(addUser(res.data.user))
   } catch (error) {
       localStorage.removeItem('call-token')
       console.log(error)
   }
  }
  login_user()

  if(token){
       return children
  }else{
       return <Navigate to={'/'}/>
  }
}

export default PrivetRoute
