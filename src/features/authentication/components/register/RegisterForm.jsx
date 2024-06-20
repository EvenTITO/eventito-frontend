import { Link } from "react-router-dom";
import {
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { loginWithGoogle, signUpFirebase, signUpWithGoogle } from "@/features/authentication/services/authorizationServices";
import CustomLoginButton from "@/components/CustomLoginButton";
import CustomInput from "@/components/CustomInput";
import ShowDescriptionOrError from "@/components/ShowDescriptionOrError";
import { useStateAndError } from "@/lib/utils";
import CustomCard from "@/components/CustomCard";
import { register } from "@/services/state/auth/authSlice";

export default function RegisterForm() {
	const {
		email,
		setEmail,
		emailError,
		setEmailError
	} = useStateAndError('email');
	const {
		password,
		setPassword,
		passwordError,
		setPasswordError
	} = useStateAndError('password');
	const {
		confirmPassword,
		setConfirmPassword,
		confirmPasswordError,
		setConfirmPasswordError
	} = useStateAndError('confirmPassword');

	const [registerError, setRegisterError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const [selected, setSelected] = useState(null);
	const { loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	async function handleRegisterSubmit(ev) {
		ev.preventDefault();
		if (email !== '' && password !== '' && confirmPassword !== '') {
			if (password !== confirmPassword) {
				setRegisterError(true);
				setSelected(null);
				setErrorMessage("Las contraseñas no coinciden");
			} else {
				try {
					ev.preventDefault();
					setSelected('register');

					const userObtained = await signUpFirebase({
						email: email,
						password: password
					});
					dispatch(
						register({
							idUser: userObtained.uid,
							email: email
						})
					);
					alert(userObtained.uid);
				} catch (exception) {
					setRegisterError(true);
					setSelected(null);
					setErrorMessage("Usuario ya existe");
				}
			}
		}

		if (email === '') {
			setEmailError(true);
		}
		if (password === '') {
			setPasswordError(true);
		}
		if (confirmPassword === '') {
			setConfirmPasswordError(true);
		}
	}

	async function handleGoogleRegister(ev) {
		try {
			ev.preventDefault();
			setSelected('registerGoogle');
			const userObtained = await signUpWithGoogle();
			dispatch(
				register({
					idUser: userObtained.uid,
					email: userObtained.email
				})
			);
		} catch (exception) {
			setRegisterError(true);
			setSelected(null);
			setErrorMessage("Usuario ya existe");
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

	function changeConfirmPassword(value) {
		setConfirmPassword(value);
		setConfirmPasswordError(false);
	}

	return (
		<CustomCard className="max-w-xl mx-auto w-full shadow-xl">
			<CustomCard>
				<CardHeader>
					<CardTitle className="text-2xl">Crear cuenta</CardTitle>
					<ShowDescriptionOrError
						description={"Registrate con tus datos"}
						error={registerError}
						setError={setRegisterError}
						errorMessage={errorMessage}
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
						<div className="grid gap-2">
							<div className="flex items-center">
								<Label htmlFor="password">Confirmar Contraseña</Label>
							</div>
							<CustomInput
								id="confirmPassword"
								type="password"
								value={confirmPassword}
								onChange={ev => changeConfirmPassword(ev.target.value)}
								error={confirmPasswordError}
								required
							/>
						</div>
						<CustomLoginButton
							isLoading={loading}
							isSelected={selected === 'register'}
							buttonText={'Continuar'}
							handleSubmit={handleRegisterSubmit}
						/>
						<CustomLoginButton
							isLoading={loading}
							isSelected={selected === 'registerGoogle'}
							buttonText={'Continuar con Google'}
							handleSubmit={handleGoogleRegister}
							variant={'outline'}
						/>
					</div>
					<div className="mt-4 text-center text-sm flex flex-row items-center gap-1 justify-center">
						¿Ya tenés cuenta?
						<Link to={'/login'} className="underline">
							Iniciar sesión
						</Link>
					</div>
				</CardContent>
			</CustomCard>
		</CustomCard>
	)
}
