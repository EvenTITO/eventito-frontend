import { Textarea } from '../ui/textarea'

export default function TextArea({ label, value, setValue }) {
  return (
    <div className="flex-grow p-6 overflow-auto">
      <Textarea
        className="w-full h-full text-lg p-4 border-none focus:ring-0 resize-none"
        placeholder={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}
