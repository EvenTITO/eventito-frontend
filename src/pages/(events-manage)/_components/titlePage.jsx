export default function TitlePage({ title, rightComponent }) {
  const titleStyle = 'flex justify-between items-center mb-8'
  if (rightComponent) {
    return (
      <div className={titleStyle}>
        <h1 className="text-3xl font-bold">{title}</h1>
        {rightComponent}
      </div>
    )
  }

  return <h1 className={titleStyle}>{title}</h1>
}
