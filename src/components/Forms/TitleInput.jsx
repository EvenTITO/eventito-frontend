import { Input } from '@nextui-org/input'
import { useMemo } from 'react'

export default function TitleInput({
  label,
  variant = 'bordered',
  value,
  setValue,
}) {
  const maxReached = useMemo(() => {
    return value && value.length === 100
  }, [value])

  function handleSetValue(newValue) {
    if (newValue.length <= 100) {
      setValue(newValue)
    } else {
      setValue(newValue.slice(0, 100))
    }
  }

  return (
    <Input
      autoFocus
      size="lg"
      radius="sm"
      label={label}
      placeholder="Ingresar el título del evento"
      labelPlacement="outside"
      variant={variant}
      value={value}
      onValueChange={handleSetValue}
      isInvalid={maxReached}
      errorMessage="Largo del título: 100 / 100"
    />
  )
}
