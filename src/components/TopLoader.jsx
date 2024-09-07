import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [state, setState] = useState("idle");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (state === "loading") {
      setVisible(true);
      timer = setTimeout(() => {
        setState("completing");
      }, 1000);
    } else if (state === "completing") {
      timer = setTimeout(() => {
        setState("completed");
      }, 1000);
    } else if (state === "completed") {
      timer = setTimeout(() => {
        setVisible(false);
        setState("idle");
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [state]);

  const startLoading = () => {
    setState("loading");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {visible && (
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
          <div
            className={`h-full bg-blue-500 transition-all duration-1000 ease-out ${
              state === "loading"
                ? "w-1/4"
                : state === "completing" || state === "completed"
                  ? "w-full"
                  : "w-0"
            }`}
          />
        </div>
      )}
      <Button
        onClick={startLoading}
        disabled={state !== "idle"}
        className="mt-4"
      >
        {state === "idle"
          ? "Start Loading"
          : state === "loading"
            ? "Loading..."
            : state === "completing"
              ? "Completing..."
              : "Completed"}
      </Button>
    </div>
  );
}
