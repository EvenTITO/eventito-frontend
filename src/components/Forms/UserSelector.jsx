import { Select, SelectItem } from '@nextui-org/select'
import User from '@/components/ui/User'

export default function UserSelector({ users, setSelectedUser }) {
  const userList = users.map((user, idx) => ({ ...user, id: user.email }))
  return (
    <Select
      items={userList}
      label="Nuevo chair"
      className=""
      variant="bordered"
      classNames={{
        label: 'group-data-[filled=true]:-translate-y-5',
        trigger: 'min-h-16',
        listboxWrapper: 'max-h-[400px]',
      }}
      listboxProps={{
        itemClasses: {
          base: [
            'rounded-md',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        },
      }}
      popoverProps={{
        classNames: {
          base: 'before:bg-default-200',
          content: 'p-0 border-small border-divider bg-background',
        },
      }}
      renderValue={(items) => {
        return items.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <User username={item.data.email} imageSize="sm" />
          </div>
        ))
      }}
      onChange={(e) => setSelectedUser(e.target.value)}
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.email}>
          <User username={user.email} imageSize="sm" />
        </SelectItem>
      )}
    </Select>
  )
}
