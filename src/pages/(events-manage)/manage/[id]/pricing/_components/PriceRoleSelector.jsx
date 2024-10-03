import SelectorList from '@/pages/_components/Wrappers/Selector/SelectorList'

export default function PriceRoleSelector({
  roles,
  selectedRole,
  setSelectedRole,
}) {
  if (roles.length === 0) {
    return null
  }
  return (
    <div className="flex gap-2 items-center">
      <SelectorList
        value={selectedRole}
        onValueChange={(role) => setSelectedRole(role)}
        placeholder={selectedRole}
        label={'Elección de role'}
        items={roles}
      />
    </div>
  )
}
