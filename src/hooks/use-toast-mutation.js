import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/hooks/use-toast'
import { useTranslation } from 'react-i18next'

export function useToastMutation(mutationFn, options, toastOptions = {}) {
  const { toast } = useToast()
  const { t } = useTranslation('SERVICE')
  const { serviceCode, successShow = true, errorShow = true } = toastOptions

  return useMutation({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      if (successShow) {
        toast({
          title: t(`${serviceCode}.SUCCESS.TITLE`) || t('SUCCESS.TITLE'),
          description:
            t(`${serviceCode}.SUCCESS.MESSAGE`) || t('SUCCESS.MESSAGE'),
        })
      }
      options?.onSuccess?.(data, variables, context)
    },
    onError: (error, variables, context) => {
      const errorCode = error?.response?.data?.detail?.errorcode
      if (errorShow) {
        toast({
          variant: 'destructive',
          title:
            t(`${serviceCode}.ERROR.${errorCode}.TITLE`) ||
            t(`${serviceCode}.ERROR.TITLE`) ||
            t('ERROR.TITLE'),
          description:
            t(`${serviceCode}.ERROR.${errorCode}.MESSAGE`) ||
            t(`${serviceCode}.ERROR.MESSAGE`) ||
            t('ERROR.MESSAGE'),
        })
      }
      options?.onError?.(error, variables, context)
    },
  })
}
