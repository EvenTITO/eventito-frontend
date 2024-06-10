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
import { CircleX } from "lucide-react";

import { login } from "@/features/authentication/services/authorizationServices";
import { loginStart, loginSuccess, loginFailure } from "@/services/state/user/userSlice";

export default function LoginForm2() {
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);

	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const [loginError, setLoginError] = useState(false);

	const [isSelected, setIsSelected] = useState(false);
	const { currentUser: user, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	async function handleLoginSubmit(ev) {
		ev.preventDefault();
		if (email !== '' && password !== '') {
			try {
				ev.preventDefault();
				//dispatch(loginStart());

				setIsSelected(true);
				const userObtained = await login({ email: email, password: password });
				alert(userObtained.email + ' ' + userObtained.password);

				//dispatch(loginSuccess(userObtained));
			} catch (exception) {
				setLoginError(true);
				//dispatch(loginFailure(exception));
			}
		}
		if (email === '') {
			setEmailError(true);
		}
		if (password === '') {
			setPasswordError(true);
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
		<Card className="mx-auto max-w-sm w-full">
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
							<Label htmlFor="password">Password</Label>
							<Link href="#" className="ml-auto inline-block text-sm underline">
								Forgot your password?
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
					<Button type="submit" className="w-full" onClick={handleLoginSubmit}>
						Login
					</Button>
					<Button variant="outline" className="w-full">
						Login with Google
					</Button>
				</div>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="#" className="underline">
						Sign up
					</Link>
				</div>
			</CardContent>
		</Card >
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
