import { loginWithGoogle } from "@/features/authentication/services/authorizationServices";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/services/state/user/userSlice";
import { LoadingButton } from "@/components/ui/loading-button";
import GoogleButton from "@/components/GoogleButton";
import { useState } from "react";

export default function LoginWithGoogleButton() {
	const [isSelected, setIsSelected] = useState(false);
	const { loading } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	async function handleLoginWithGoogle(ev) {
		try {
			ev.preventDefault();
			dispatch(loginStart());

			setIsSelected(true);
			const userObtained = await loginWithGoogle();

			dispatch(loginSuccess(userObtained));
		} catch (exception) {
			console.log(exception);
			dispatch(loginFailure(exception));
		}
	}

	if (loading && isSelected) {
		return <LoadingButton />
	} else {
		return (
			<GoogleButton onClick={handleLoginWithGoogle} />
		);
	}
}
