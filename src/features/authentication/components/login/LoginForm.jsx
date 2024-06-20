import { Link } from "react-router-dom";
import {
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useDispatch } from "react-redux";
import { useState } from "react";

import { login, loginWithGoogle } from "@/features/authentication/services/authorizationServices";
import CustomLoginButton from "@/components/CustomLoginButton";
import CustomInput from "@/components/CustomInput";
import ShowDescriptionOrError from "@/components/ShowDescriptionOrError";
import { useStateAndError } from "@/lib/utils";
import CustomCard from "@/components/CustomCard";
import { register } from "@/services/state/auth/authSlice";

export default function LoginForm() {
	const dispatch = useDispatch();

	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState(null);

	const email = useStateAndError();
	const password = useStateAndError();

	async function handleLoginSubmit(ev) {
		ev.preventDefault();
		setLoading(true);
		setSelected('login');
		const emailOk = email.checkCompletion();
		const passwordOk = password.checkCompletion();

		if (emailOk && passwordOk) {
			try {
				const userObtained = await login({
					email: email.value,
					password: password.value
				});

				dispatch(
					register({
						idUser: userObtained.uid,
						email: email.value
					})
				);
			} catch (exception) {
				setError(true);
				setErrorMessage(exception);
			}
		}
		setSelected(null);
		setLoading(false);
	}

	async function handleLoginWithGoogle(ev) {
		ev.preventDefault();
		setLoading(true);
		try {
			const userObtained = await loginWithGoogle();

			dispatch(
				register({
					idUser: userObtained.uid,
					email: userObtained.email
				})
			);
		} catch (exception) {
			setError(true);
			setErrorMessage(exception);
		}
		setLoading(false);
	}

	return (
		<CustomCard className="max-w-xl mx-auto w-full shadow-xl">
			<CustomCard>
				<CardHeader>
					<CardTitle className="text-2xl">Iniciar sesion</CardTitle>
					<ShowDescriptionOrError
						description={"Ingresa con tus credenciales"}
						error={error}
						setError={setError}
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
								value={email.value}
								onChange={ev => email.change(ev.target.value)}
								error={email.error}
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
								value={password.value}
								onChange={ev => password.change(ev.target.value)}
								error={password.error}
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
