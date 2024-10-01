import { useState, useEffect } from 'react'
import CreateEventStep1 from './_components/step1'
import CreateEventStep2 from './_components/step2'
import CreateEventStep3 from './_components/step3'

export default function CreateEvent() {
  const [step, setStep] = useState(1)

  useEffect(() => {
    const checkScrollable = () => {
      const content = document.getElementById('form-content')
      if (content) {
        setIsScrollable(content.scrollHeight > window.innerHeight - 200)
      }
    }

    checkScrollable()
    window.addEventListener('resize', checkScrollable)
    return () => window.removeEventListener('resize', checkScrollable)
  }, [step])

  return (
    <div className="min-h-screen flex flex-col">
      <CreateEventStep1 step={step} setStep={setStep} />
      <CreateEventStep2 step={step} setStep={setStep} />
      <CreateEventStep3 step={step} setStep={setStep} />
    </div>
  )
}
