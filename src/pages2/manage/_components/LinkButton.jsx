import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LinkButton({ linkTo, buttonText, logo }) {
	return (
		<Button variant="ghost" asChild>
			<Link to={linkTo} className="flex gap-1 items-center">
				{logo}
				<span className="text-white">{buttonText}</span>
			</Link>
		</Button>
	);
}
