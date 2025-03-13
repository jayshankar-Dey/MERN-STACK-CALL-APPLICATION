import axios from 'axios'

const baseUrl=import.meta.env.VITE_SERVER_KEY
const token=`Bearer ${localStorage.getItem('call-token')}`
const is_Login={headers:{Authorization:token}}

//Login hendler
export const login_api=async(email)=>await axios.post(`${baseUrl}/login`,{email})
//verify otp
export const OTP_verify_api=async(otp,email)=>await axios.post(`${baseUrl}/verify/otp`,{otp,email})
//get login user
export const get_Login_user=async(id)=>await axios.get(`${baseUrl}/login/user/${id}`,is_Login)
//get all login users
export const getAll_login_Users=async(search)=>axios.post(`${baseUrl}/get/all-users`,{search},is_Login)
//update user is in contuining in call or not
export const is_User_call=async(is_call)=>await axios.post(`${baseUrl}/iscall`,{is_call},is_Login)