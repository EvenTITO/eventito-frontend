export default function LabelForm({ label, isRequired = false }) {
  return (
    <div className="flex gap-1">
      <p className="font-semibold text-lg">{label}</p>
      {isRequired ? <p className="text-red-400">*</p> : null}
    </div>
  )
}
