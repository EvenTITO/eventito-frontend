import { getUser, login } from '@/services/api/auth/queries'
import { useMutation } from '@tanstack/react-query'
import { clearAuth, register } from '@/state/auth/authSlice'
import { loginCompleted } from '@/state/user/userSlice'
import { useDispatch } from 'react-redux'

export function useLogin() {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      dispatch(register({ idUser: data.uid, email: data.email }))
      const userObtained = await getUser(data.uid)

      dispatch(clearAuth())
      dispatch(loginCompleted(userObtained))
    },
    onError: (error) => {
      console.log('error', error)
    },
    onSettled: () => {
      console.log('settled')
    },
  })
}
