import defaultBanner from "../../../assets/default-banner-1.jpg";
import {useRef, useState} from "react";
import {apiUploadFile, getUploadUrl} from "@/services/storage/storageService.js";

export default function EventImage({event, refreshData}) {
    const showImagePicker = useRef(false);
    const enableEditMainImage = useState(event.roles.includes("ORGANIZER"))
    const [isHovered, setIsHovered] = useState(false);
    const banner_img = event.media.find(m => m.name === 'banner_image_url');


    const handleUpdateMainImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            getUploadUrl(event.id, "banner_image")
                .then(uploadInfo => {
                    apiUploadFile(uploadInfo.upload_url, file)
                        .then((res) => {
                            console.log("Imagen del banner del evento actualizada");
                            refreshData(event.id).then(() => console.log("Event loaded"));
                        });
                })
                .catch(() => console.log("No se puedo actualizar la imagen del banner del evento"))
        }
    }

    const handleClick = () => {
        showImagePicker.current.click();
    };

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div className="w-screen p-0 bg-gray-200" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
            <button onClick={handleClick} disabled={!enableEditMainImage} className="object-cover w-full h-40">
                <img
                    className="object-cover w-full h-40"
                    src={banner_img ? banner_img.url : defaultBanner}
                    onError={event => {
                        event.target.src = defaultBanner
                        event.onerror = null
                    }}
                    style={{
                        opacity: isHovered ? 0.7 : 1,
                        transition: 'opacity 0.3s',
                    }}
                />
            </button>
            <input
                type="file"
                accept="image/*"
                onChange={handleUpdateMainImage}
                ref={showImagePicker}
                style={{display: 'none'}}
            />
        </div>
    );
}
