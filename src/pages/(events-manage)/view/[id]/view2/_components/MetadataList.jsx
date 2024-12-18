import CardWithoutFocus from '@/components/Card/CardWithoutFocus'

export default function MetadataList({ location, contact, organizedBy }) {
  return (
    <div className="flex gap-4">
      <MetadataCard title={location} logo="MapPin" />
      <MetadataCard title={contact} logo="AtSign" />
      <MetadataCard title={organizedBy} logo="CircleUser" />
    </div>
  )
}

function MetadataCard({ title, logo }) {
  return (
    <CardWithoutFocus nameIcon={logo}>
      <div className="flex-grow">
        <h2 className="text-sm font-medium text-foreground">{title}</h2>
      </div>
    </CardWithoutFocus>
  )
}
