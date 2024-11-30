export default function TitlePage({ title, rightComponent = null }) {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      {rightComponent}
    </div>
  )
}
