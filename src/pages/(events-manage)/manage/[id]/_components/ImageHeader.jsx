export default function ImageHeader({image}) {
  return (
    <div className="w-full h-[300px] mb-8 rounded-lg overflow-hidden">
      <img
        src={image.url}
        onError={(e) => {
          e.target.src = "https://makepath.com/wp-content/uploads/2022/06/Adventure-Guide-Etsy-Banner-860-%C3%97-520-px.png";
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
