import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts'
import { WORKS_STATUS_LABELS } from '@/lib/Constants'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export default function WorkStatusChart({ works }) {
  const data = Object.entries(WORKS_STATUS_LABELS).map(([status, label]) => ({
    name: label,
    value: works.filter((work) => work.status === status).length,
  }))

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
