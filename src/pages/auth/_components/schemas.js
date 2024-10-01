import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido. Ej: example@email.com' }),
  password: z
    .string()
    .min(8, { message: 'Contraseña inválida. Al menos 8 caracteres' }),
})

export function useLoginForm() {
  return useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
}

const signupSchema = z
  .object({
    email: z
      .string()
      .email({ message: 'Email inválido. Ej: example@email.com' }),
    password: z
      .string()
      .min(8, { message: 'Contraseña inválida. Al menos 8 caracteres' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export function useSignupForm() {
  return useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
}
