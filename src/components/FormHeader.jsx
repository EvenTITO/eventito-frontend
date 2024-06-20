import {
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ShowDescriptionOrError from "@/components/ShowDescriptionOrError";

export default function FormHeader({
	title,
	description,
	error,
	setError,
	errorMessage
}) {
	return (
		<CardHeader>
			<CardTitle className="text-2xl">{title}</CardTitle>
			<ShowDescriptionOrError
				description={description}
				error={error}
				setError={setError}
				errorMessage={errorMessage}
			/>
		</CardHeader>
	);
}
