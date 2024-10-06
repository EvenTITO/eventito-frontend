import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useNavigate, useParams } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function SideBar({
  itemList,
  isSidebarOpen = true,
  roles = [],
  selectedItem = '',
}) {
  const { id } = useParams()
  const navigate = useNavigate()

  const filteredItemList = itemList.filter((parent) =>
    parent.children.some((child) =>
      child.requiredRoles.some((role) => roles.includes(role))
    )
  )

  return (
    <aside
      className={cn(
        'w-64 bg-white border-r fixed top-16 bottom-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <ScrollArea className="h-full">
        <div className="p-4">
          {filteredItemList.map((parent, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center px-2 py-1 text-sm font-medium text-gray-600">
                {parent.icon}
                <span className="ml-2">{parent.label}</span>
              </div>
              {parent.children
                .filter((child) =>
                  child.requiredRoles.some((role) => roles.includes(role))
                )
                .map((child, idx) => (
                  <Button
                    key={idx}
                    variant="ghost"
                    className={cn(
                      'w-full justify-start py-1 text-sm font-normal text-gray-700 hover:bg-gray-100 rounded-sm',
                      selectedItem === child.to && 'bg-gray-100 font-medium'
                    )}
                    onClick={() =>
                      child.isOrganizerRoute
                        ? navigate(`/manage/${id}/${child.to}`)
                        : navigate(`/events/${id}/${child.to}`)
                    }
                  >
                    <span className="flex items-center">
                      {child.icon}
                      <span className="ml-2">{child.label}</span>
                    </span>
                  </Button>
                ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  )
}
