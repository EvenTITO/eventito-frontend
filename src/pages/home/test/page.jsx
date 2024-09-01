import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function TestPage() {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          description: "Your message has been sent.",
        });
      }}
    >
      Show Toast
    </Button>
  );
}
