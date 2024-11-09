import { Input } from "@nextui-org/input";

export default function EmailInput({
  label="Email del usuario",
  variant="bordered",
  email,
  setEmail
}) {
  return (
    <Input
      autoFocus
      label={label}
      variant={variant}
      value={email}
      onValueChange={setEmail}
    />
  )
}
