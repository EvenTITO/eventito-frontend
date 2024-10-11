import { useOutletContext } from 'react-router-dom'

export function useEvent() {
  const { event } = useOutletContext()
  return event
}
