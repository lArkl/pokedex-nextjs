
// // import axios from 'axios'
// // import { API_ENDPOINT } from '../config/main'
// // import { ResponseDto, UserDto } from './dto'

// export const signInUserRequest = async (fields: { email: string; password: string }) => {
//   return axios.post<ResponseDto<UserDto & { token: string }>>(`${process.env.API_ENDPOINT}/users/signin`, fields)
// }

// export const signUpUserRequest = async (fields: {
//   firstname: string
//   lastname: string
//   email: string
//   password: string
// }) => {
//   fetch()
//   return axios.post<ResponseDto<UserDto>>(`${API_ENDPOINT}/users/signup`, fields)
// }

// export const validateUserRequest = async (token: string, signal?: AbortSignal) => {
//   return axios.get<ResponseDto<UserDto>>(`${API_ENDPOINT}/users/validate`, {
//     headers: { authorization: `Bearer ${token}` },
//     signal,
//   })
// }
