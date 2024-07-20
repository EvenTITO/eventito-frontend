import defaultBanner from "../../../assets/default-banner-1.jpg";

export default function EventImage({ photoUrl }) {
  return (
    <div className="w-screen p-0 bg-gray-200">
      <img className="object-cover w-full h-40"
           src={photoUrl != null ? photoUrl : defaultBanner}
           onError={event => {
               event.target.src = defaultBanner
               event.onerror = null
           }}
      />
    </div>
  );
}
