import React, { lazy, Suspense } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Loading from './components/Loading'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { Toaster } from 'react-hot-toast';
import PublicRoute from './Route_hendler/PublicRoute';
import PrivetRoute from './Route_hendler/PrivetRoute';


const Login =lazy(()=>import('./pages/Login'))
const OTP=lazy(()=>import('./pages/Otp'))
const Home=lazy(()=>import('./pages/Home'))
const Single_call_page=lazy(()=>import('./pages/SingleCall'))
const App = () => {



  AOS.init({
    offset: 150, 
    delay: 50, 
    duration: 500, 
    easing: 'ease-in-out', 
  });
  

  return (
    <BrowserRouter>
    <Suspense fallback={<Loading/>}>
    <Toaster/>
    <Routes>
        <Route path='/' element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path='/otp' element={<PublicRoute><OTP/></PublicRoute>}/>
        <Route path='/call' element={<PrivetRoute><Home/></PrivetRoute>}/>
        <Route path='/call/:id' element={<PrivetRoute><Single_call_page/></PrivetRoute>}/>
      </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App
