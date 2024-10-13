import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPaymentChoice } from '@/state/events/newPaymentSlice'
import { cn, getDateByName } from '@/lib/utils'
import * as Tooltip from '@radix-ui/react-tooltip'

export default function FormSelectPayment({ eventPricing, eventDates }) {
  const { pricing } = useSelector((state) => state.newPayment)
  const [price, setPrice] = useState(pricing)
  const dispatch = useDispatch()

  function changePrice(fare) {
    setPrice(fare.name)
    dispatch(addPaymentChoice(fare.name))
  }

  function isEnabledFare(fare) {
    if (fare.related_date) {
      const date = getDateByName(eventDates, fare.related_date)
      if (date.date) {
        return date.time
          ? new Date(`${date.date}T${date.time}`) > new Date()
          : new Date(date.date) > new Date()
      }
      return false
    }
    return true
  }

  return (
    <div className="space-y-4 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Seleccione su tarifa</h2>
      <div className="flex flex-col space-y-4">
        {eventPricing.map((fareOption) => {
          const isEnabledFareOption = isEnabledFare(fareOption)
          return (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <div
                    key={fareOption.name}
                    className={cn(
                      'p-4 border rounded-lg transition-all',
                      isEnabledFareOption
                        ? 'cursor-pointer hover:border-primary'
                        : 'cursor-not-allowed opacity-50',
                      price === fareOption.name
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200'
                    )}
                    onClick={() => {
                      if (isEnabledFareOption) {
                        changePrice(fareOption)
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={cn(
                          'w-4 h-4 rounded-full border-2',
                          price === fareOption.name
                            ? 'border-primary bg-primary'
                            : 'border-gray-400'
                        )}
                      ></div>
                      <h3 className="font-semibold">{fareOption.name}</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {fareOption.description}
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      Precio:{' '}
                      {fareOption.value === 0
                        ? 'Gratuita'
                        : '$' + fareOption.value}
                    </p>
                  </div>
                </Tooltip.Trigger>
                {!isEnabledFareOption && (
                  <Tooltip.Content
                    side="top"
                    align="center"
                    className="bg-black/60 text-white p-2 rounded-lg text-sm shadow-lg backdrop-blur-sm break-words"
                  >
                    Esta tarifa no está disponible en este momento.
                  </Tooltip.Content>
                )}
              </Tooltip.Root>
            </Tooltip.Provider>
          )
        })}
      </div>
    </div>
  )
}
