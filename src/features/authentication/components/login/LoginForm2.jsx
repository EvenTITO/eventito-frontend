import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { CircleX, Loader2 } from "lucide-react";

import { login } from "@/features/authentication/services/authorizationServices";
import { loginStart, loginSuccess, loginFailure } from "@/services/state/user/userSlice";

export default function LoginForm2() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

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
		<Card className="max-w-xl mx-auto w-full shadow-xl">
			<Card className="py-4 mx-auto max-w-sm w-full border-0">
				<CardHeader>
					<CardTitle className="text-2xl">Iniciar sesion</CardTitle>
					<ShowDescriptionOrError error={loginError} setError={setLoginError} />
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
			</Card>
		</Card>
	)
}

function CustomInput({ id, type, value, onChange, isRequired, placeholder, error }) {
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

function ShowDescriptionOrError({ error, setError }) {
	if (error) {
		return (
			<CardDescription>
				<div className="flex items-center justify-around p-2 py-3 text-black font-semibold bg-red-200">
					Usuario y/o contraseña inválidos
					<button onClick={() => setError(false)}>
						<CircleX />
					</button>
				</div>
			</CardDescription>
		);
	} else {
		return (
			<CardDescription>
				Ingresa con tus credenciales
			</CardDescription>
		);
	}
}

function CustomLoginButton({ isLoading, isSelected, buttonText, handleSubmit, variant }) {
	if (isLoading && isSelected) {
		return (
			<Button type="submit" className="w-full bg-gray-600 font-semibold" onClick={handleSubmit} disabled>
				<div className="flex flex-row items-center justify-around">
					<div className="flex">
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Cargando...
					</div>
				</div>
			</Button>
		);
	} else {
		return (
			<Button type="submit" className="w-full" onClick={handleSubmit} variant={variant}>
				{buttonText}
			</Button>
		);
	}
}
