import {
  Card
} from "@/components/ui/card"

export default function CustomCard({ children, className }) {
  const customClassName = className ? className : "py-4 mx-auto max-w-sm w-full border-0";
  return (
    <Card className={customClassName}>
      {children}
    </Card>
  );
}
