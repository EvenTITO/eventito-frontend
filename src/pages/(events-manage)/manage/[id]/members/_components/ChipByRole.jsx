import { Chip } from '@nextui-org/chip'

export default function ChipByRole({ role }) {
  const statusColorMap = {
    Organizador: 'warning',
    Chair: '',
  }

  return (
    <Chip
      className="capitalize"
      color={statusColorMap[role]}
      size="sm"
      variant="flat"
    >
      {role}
    </Chip>
  )
}
