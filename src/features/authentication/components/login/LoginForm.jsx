import { Link } from "react-router-dom";
import {
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { login } from "@/features/authentication/services/authorizationServices";
import { loginStart, loginSuccess, loginFailure } from "@/services/state/user/userSlice";
import CustomLoginButton from "@/components/CustomLoginButton";
import CustomInput from "@/components/CustomInput";
import ShowDescriptionOrError from "@/components/ShowDescriptionOrError";
import { useStateAndError } from "@/lib/utils";
import CustomCard from "@/components/CustomCard";

export default function LoginForm() {
	const { email, setEmail, emailError, setEmailError } = useStateAndError('email');
	const { password, setPassword, passwordError, setPasswordError } = useStateAndError('password');
	const [loginError, setLoginError] = useState(false);

	const [selected, setSelected] = useState(null);
	const { currentUser: user, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	async function handleLoginSubmit(ev) {
		ev.preventDefault();
		if (email !== '' && password !== '') {
			try {
				ev.preventDefault();
				dispatch(loginStart());

				setSelected('login');
				const userObtained = await login({ email: email, password: password });

				dispatch(loginSuccess(userObtained));
			} catch (exception) {
				setLoginError(true);
				setSelected(null);
				dispatch(loginFailure(exception));
			}
		}
		if (email === '') {
			setEmailError(true);
		}
		if (password === '') {
			setPasswordError(true);
		}
	}

	async function handleLoginWithGoogle(ev) {
		try {
			ev.preventDefault();
			dispatch(loginStart());

			setSelected('loginGoogle');
			const userObtained = await loginWithGoogle();

			dispatch(loginSuccess(userObtained));
		} catch (exception) {
			setLoginError(true);
			setSelected(null);
			dispatch(loginFailure(exception));
		}
	}

	function changeEmail(value) {
		setEmail(value);
		setEmailError(false);
	}

	function changePassword(value) {
		setPassword(value);
		setPasswordError(false);
	}

	return (
		<CustomCard className="max-w-xl mx-auto w-full shadow-xl">
			<CustomCard>
				<CardHeader>
					<CardTitle className="text-2xl">Iniciar sesion</CardTitle>
					<ShowDescriptionOrError
						description={"Ingresa con tus credenciales"}
						error={loginError}
						setError={setLoginError}
						errorMessage={"Usuario y/o contraseña inválidos"}
					/>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<CustomInput
								id="email"
								type="email"
								placeholder="m@example.com"
								value={email}
								onChange={ev => changeEmail(ev.target.value)}
								error={emailError}
								required
							/>
						</div>
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Contraseña</Label>
								<Link href="#" className="ml-auto inline-block text-sm underline">
									¿Olvidaste tu contraseña?
								</Link>
							</div>
							<CustomInput
								id="password"
								type="password"
								value={password}
								onChange={ev => changePassword(ev.target.value)}
								error={passwordError}
								required
							/>
						</div>
						<CustomLoginButton
							isLoading={loading}
							isSelected={selected === 'login'}
							buttonText={'Continuar'}
							handleSubmit={handleLoginSubmit}
						/>
						<CustomLoginButton
							isLoading={loading}
							isSelected={selected === 'loginGoogle'}
							buttonText={'Continuar con Google'}
							handleSubmit={handleLoginWithGoogle}
							variant={'outline'}
						/>
					</div>
					<div className="mt-4 text-center text-sm flex flex-row items-center gap-1 justify-center">
						¿No tenés cuenta?
						<Link to={'/register'} className="underline">
							Crear cuenta
						</Link>
					</div>
				</CardContent>
			</CustomCard>
		</CustomCard>
	)
}
