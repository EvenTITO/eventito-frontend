import { Input } from '@nextui-org/input'

export default function NameInput({
  label,
  variant = 'bordered',
  value,
  setValue,
}) {
  return (
    <Input
      autoFocus
      label={label}
      variant={variant}
      value={value}
      onValueChange={setValue}
    />
  )
}
