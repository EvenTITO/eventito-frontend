import { useState } from 'react'
import { Tooltip } from '@nextui-org/tooltip'
import Icon from '@/components/Icon'
import MiniModal from '@/components/Modal/MiniModal'

export default function TrackActions({ track, deleteChair, addChair }) {
  return (
    <div className="relative flex items-center gap-2">
      {track.mail ? (
        <Tooltip content="Cambiar chair">
          <button
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
          >
            <Icon name="Pencil" />
          </button>
        </Tooltip>
      ) : (
        <Tooltip content="Agregar chair">
          <button
            className="text-lg text-default-400 cursor-pointer active:opacity-50"
          >
            <Icon name="Plus" />
          </button>
        </Tooltip>
      )}
      <Tooltip color="danger" content="Eliminar track">
        <button
          className="text-lg text-danger cursor-pointer active:opacity-50"
          //onClick={() => (member)}
        >
          <Icon name="Trash" />
        </button>
      </Tooltip>
    </div>
  )
}
