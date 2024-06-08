export default function EventImage({ photoUrl }) {
  return (
    <div className="w-screen p-0 bg-gray-200">
      <img src={photoUrl} className="object-cover w-full h-40" />
    </div>
  );
}
