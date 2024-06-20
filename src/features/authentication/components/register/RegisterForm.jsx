import { login } from "@/features/authentication/services/authorizationServices";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/services/state/user/userSlice";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";

export default function RegisterForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSelected, setIsSelected] = useState(false);
	const { currentUser: user, loading } = useSelector((state) => state.user);
	const [available, setAvailable] = useState(false);

	const dispatch = useDispatch();

	function changeEmail(value) {
		setEmail(value);
		if (email !== '' && password !== '') {
			setAvailable(true);
		}
	}

	function changePassword(value) {
		setPassword(value);
		if (email !== '' && password !== '') {
			setAvailable(true);
		}
	}

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
				onChange={ev => changeEmail(ev.target.value)} />
			<input type="password"
				placeholder="Contraseña"
				value={password}
				required
				onChange={ev => changePassword(ev.target.value)} />
			<RegisterButton loading={loading} isSelected={isSelected} available={available} handleLoginSubmit={handleLoginSubmit} />
		</form>
	);
}

function RegisterButton({ loading, isSelected, available, handleLoginSubmit }) {
	if (loading && isSelected) {
		return <LoadingButton />;
	} else if (available) {
		return (
			<button className="primary" onClick={handleLoginSubmit}>
				Continuar
			</button>
		);
	} else {
		return (
			<button className="disabled" disabled>
				Continuar
			</button>
		);
	}
}
