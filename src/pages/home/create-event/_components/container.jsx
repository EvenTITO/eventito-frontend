export function Container({ children }) {
  return (
    <div className="flex-grow overflow-auto">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-4">Crear nuevo evento</h1>
        <div className="h-px w-full bg-gray-200 mb-8 opacity-50"></div>
        {children}
      </div>
    </div>
  )
}
