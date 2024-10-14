import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Search } from 'lucide-react'

export default function ChairDialog({
  track,
  chairs,
  onAddChair,
  triggerButton,
  isPending,
}) {
  const [selectedChair, setSelectedChair] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedChair) {
      await onAddChair(track, selectedChair.email)
      setIsOpen(false)
    }
  }

  const filteredChairs = chairs
    .filter((chair) =>
      (chair.fullname.toLowerCase() + chair.email.toLowerCase()).includes(
        search.toLowerCase()
      )
    )
    .slice(0, 5)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar chair a {track}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar chair por nombre o email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
          <ScrollArea className="h-[200px] rounded-md border">
            {filteredChairs.map((chair) => (
              <div
                key={chair.userId}
                className={`flex items-center space-x-3 p-2 cursor-pointer hover:bg-secondary/10 rounded-md ${
                  selectedChair?.userId === chair.userId
                    ? 'bg-secondary/20'
                    : ''
                }`}
                onClick={() => setSelectedChair(chair)}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${chair.email}`}
                  />
                  <AvatarFallback>{chair.fullname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{chair.fullname}</p>
                  <p className="text-xs text-muted-foreground">{chair.email}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
          {selectedChair && (
            <div className="bg-secondary/10 p-3 rounded-md flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedChair.email}`}
                  />
                  <AvatarFallback>{selectedChair.fullname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {selectedChair.fullname}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selectedChair.email}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedChair(null)}
              >
                Cambiar
              </Button>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" disabled={!selectedChair || isPending}>
              {isPending ? 'Agregando...' : 'Agregar chair'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
