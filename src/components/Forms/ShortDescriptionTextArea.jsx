import { Textarea } from '@nextui-org/input'
import { useMemo } from 'react'

export default function ShortDescriptionTextArea({
  label,
  shortDescription,
  setShortDescription,
}) {
  const maxValue = 200

  const maxReached = useMemo(() => {
    return shortDescription && shortDescription.length === maxValue
  }, [shortDescription])

  function handleSetValue(newValue) {
    if (newValue.length <= maxValue) {
      setShortDescription(newValue)
    } else {
      setShortDescription(newValue.slice(0, maxValue))
    }
  }

  return (
    <div className="w-full flex flex-col gap-1">
      <Textarea
        variant="bordered"
        label={label}
        labelPlacement="outside"
        placeholder={`Ingresar una descripción (máximo ${maxValue} cáracteres)`}
        value={shortDescription}
        onValueChange={handleSetValue}
        isInvalid={maxReached}
        errorMessage={`Largo de la descripción: ${maxValue} / ${maxValue}`}
      />
      <p className="text-default-500 text-small">
        {shortDescription ? shortDescription.length : 0} / {maxValue}
      </p>
    </div>
  )
}
