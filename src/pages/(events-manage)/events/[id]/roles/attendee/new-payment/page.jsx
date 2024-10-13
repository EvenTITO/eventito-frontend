import { useNavigator } from '@/lib/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { reset } from '@/state/events/newPaymentSlice'
import { useNewPayment } from '@/hooks/events/attendeeHooks'
import FormSelectPayment from './form/FormSelectPayment'
import FormSubmitPayment from './form/FormSubmitFile'
import SteppedForm from '@/components/SteppedForm'
import FormSelectWorks from './form/FormSelectWorks'
import { SPEAKER_ROLE } from '@/lib/Constants.js'

export default function Page({ eventData, works }) {
  const navigator = useNavigator('/new-payment')
  const dispatch = useDispatch()
  const { mutateAsync: newPayment, isPending, error } = useNewPayment()
  const { pricing, paymentPDF, worksIds } = useSelector(
    (state) => state.newPayment
  )
  const isSpeaker = eventData.roles.includes(SPEAKER_ROLE)

  let booleanForSteps = [pricing, true, paymentPDF]
  let stepsComponents = [
    <FormSelectPayment
      eventPricing={eventData.pricing}
      eventDates={eventData.dates}
    />,
    <FormSelectWorks works={works} />,
    <FormSubmitPayment />,
  ]

  if (!works || works.length === 0 || !isSpeaker) {
    booleanForSteps = [pricing, paymentPDF]
    stepsComponents = [
      <FormSelectPayment
        eventPricing={eventData.pricing}
        eventDates={eventData.dates}
      />,
      <FormSubmitPayment />,
    ]
  }

  async function onSave() {
    await newPayment({
      paymentData: { fare_name: pricing, file: paymentPDF, works: worksIds },
    })
    dispatch(reset())
    navigator.back()
  }

  function onCancel() {
    dispatch(reset())
    navigator.back()
  }

  return (
    <SteppedForm
      title={'Proceso de pago'}
      onSave={onSave}
      onCancel={onCancel}
      booleanForSteps={booleanForSteps}
      stepsComponents={stepsComponents}
    />
  )
}
