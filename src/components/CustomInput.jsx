import { CircleX } from "lucide-react";
import { Input } from "./ui/input";

export default function CustomInput({ id, type, value, onChange, isRequired, placeholder, error }) {
  const className = `${error ? "border border-red-500" : ""}`;
  return (
    <div>
      <Input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={isRequired}
        className={className}
      />
      <InputErrorMessage error={error} />
    </div>
  );
}

function InputErrorMessage({ error }) {
  if (error) {
    return (
      <div className="flex text-red-500 gap-1 items-center text-sm">
        <CircleX className="size-4" /> Campo requerido
      </div>
    );
  } else {
    return <></>;
  }
}
