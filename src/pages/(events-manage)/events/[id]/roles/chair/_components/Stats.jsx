import { WORKS_STATUS_LABELS } from '@/lib/Constants'
import StatCard from './StatCard'

export default function Stats({ works }) {
  const totalWorks = works.length
  const publishedWorks = works.filter((work) => work.published).length
  const acceptedWorks = works.filter(
    (work) => WORKS_STATUS_LABELS[work.status] === 'Aceptado'
  ).length

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Trabajos presentados"
        value={totalWorks}
        icon="FileText"
      />
      <StatCard
        title="Revisiones publicadas"
        value={publishedWorks}
        icon="ListTodo"
      />
      <StatCard
        title="Trabajos aceptados"
        value={acceptedWorks}
        icon="CheckCircle"
      />
    </div>
  )
}
