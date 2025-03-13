import { Navigate } from 'react-router-dom'

const PublicRoute = ({children}) => {
  const token=localStorage.getItem('call-token')
 if(token){
       return <Navigate to={'/call'}/>
 }else{
       return children
 }
}

export default PublicRoute
