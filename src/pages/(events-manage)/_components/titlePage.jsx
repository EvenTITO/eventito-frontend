export default function TitlePage({ title, rightComponent }) {
  if (rightComponent) {
    return (
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6">{title}</h1>
        {rightComponent}
      </div>
    );
  }

  return <h1 className="text-2xl font-bold mb-6">{title}</h1>;
}
