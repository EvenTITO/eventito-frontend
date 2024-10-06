import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'

const defaultToastOptions = {
  success: {
    show: false,
    message: 'Operación completada de forma exitosa',
  },
  error: {
    show: true,
    message: 'Ocurrió un error al realizar la operación',
  },
}

export function useToastMutation(mutationFn, options, toastOptions = {}) {
  const { toast } = useToast()
  const mergedToastOptions = {
    success: { ...defaultToastOptions.success, ...toastOptions.success },
    error: { ...defaultToastOptions.error, ...toastOptions.error },
  }

  return useMutation({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      if (mergedToastOptions.success.show) {
        toast({
          title: 'Operación finalizada',
          description: mergedToastOptions.success.message,
        })
      }
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      if (mergedToastOptions.error.show) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description:
            error instanceof Error
              ? error.message
              : mergedToastOptions.error.message,
        })
      }
      options?.onError?.(error, variables, context)
    },
  })
}
