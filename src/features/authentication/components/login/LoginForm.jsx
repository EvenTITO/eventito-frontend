import { login } from "@/features/authentication/services/authorizationServices";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/services/state/user/userSlice";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";

export default function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSelected, setIsSelected] = useState(false);
	const { currentUser: user, loading } = useSelector((state) => state.user);

	const dispatch = useDispatch();

	async function handleLoginSubmit(ev) {
		try {
			ev.preventDefault();
			dispatch(loginStart());

			setIsSelected(true);
			const userObtained = await login({ email: email, password: password });

			dispatch(loginSuccess(userObtained));
		} catch (exception) {
			console.log(exception);
			dispatch(loginFailure(exception));
		}
	}

	return (
		<form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
			<input type="email"
				placeholder="Correo electrónico"
				value={email}
				required
				onChange={ev => setEmail(ev.target.value)} />
			<input type="password"
				placeholder="Contraseña"
				value={password}
				required
				onChange={ev => setPassword(ev.target.value)} />
			{loading && isSelected
				? (
					<LoadingButton />
				)
				: (
					<button className="primary" onClick={handleLoginSubmit}>
						Continuar
					</button>
				)
			}
		</form>
	);
}
