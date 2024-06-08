import { FaGoogle } from "react-icons/fa";

export default function GoogleButton({ onClick }) {
  return (
    <button className="google-button" onClick={onClick}>
      <div className="button-content gap-2 text-white">
        <FaGoogle /> Continuar con Google
      </div>
    </button>
  );
}
