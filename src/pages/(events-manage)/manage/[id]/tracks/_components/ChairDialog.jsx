import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import ButtonWithLoading from '@/components/ButtonWithLoading'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function ChairDialog({
  track,
  chairs,
  onAddChair,
  triggerButton,
  isPending,
}) {
  const [selectedChair, setSelectedChair] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await onAddChair(track, selectedChair.email)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar chair</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {selectedChair ? (
            <SelectedChairBox
              chair={selectedChair}
              onClearSelection={() => setSelectedChair(null)}
            />
          ) : (
            <ChairSelectInput
              chairs={chairs}
              onChairSelect={setSelectedChair}
            />
          )}
          <div className="w-full flex justify-end">
            <ButtonWithLoading
              type="submit"
              disabled={!selectedChair}
              isLoading={isPending}
            >
              Continuar
            </ButtonWithLoading>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const ChairSelectInput = ({ chairs, onChairSelect }) => {
  const [search, setSearch] = useState('')
  const [filteredChairs, setFilteredChairs] = useState(chairs)

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase()
    setSearch(query)

    setFilteredChairs(
      chairs.filter((chair) =>
        (chair.fullname.toLowerCase() + chair.email.toLowerCase()).includes(
          query
        )
      )
    )
  }

  return (
    <div className="relative">
      <Input
        placeholder="Ingrese un chair del evento"
        value={search}
        onChange={handleSearchChange}
        required
      />

      {filteredChairs.length > 0 && (
        <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {filteredChairs.map((chair) => (
            <div
              key={chair.userId}
              className="cursor-pointer hover:bg-gray-100"
              onClick={() => onChairSelect(chair)}
            >
              <ChairCard chair={chair} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const SelectedChairBox = ({ chair, onClearSelection }) => (
  <Card className="flex items-center space-x-4 p-4 mb-4 border border-gray-300 rounded-md shadow-sm">
    <ChairCard chair={chair} />
    <Button
      onClick={onClearSelection}
      className="bg-red-500 text-white rounded-full h-8 w-8 flex justify-center items-center"
    >
      X
    </Button>
  </Card>
)

const ChairCard = ({ chair }) => (
  <Card className="flex items-center p-2 space-x-2 hover:shadow-md transition-all duration-200 group">
    <Avatar className="h-8 w-8">
      <AvatarImage
        src={`https://api.dicebear.com/6.x/identicon/svg?seed=${chair.userId}`}
      />
      <AvatarFallback>{chair.fullname.charAt(0) || ''}</AvatarFallback>
    </Avatar>
    <div className="flex-grow min-w-0">
      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-200">
        {chair.fullname}
      </p>
      <p className="text-xs text-muted-foreground truncate">{chair.email}</p>
    </div>
  </Card>
)
