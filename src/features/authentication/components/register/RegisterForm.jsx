import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { signUp, signUpWithGoogle } from "@/features/authentication/services/authorizationServices";
import { useStateAndError } from "@/lib/utils";
import CustomCard from "@/components/CustomCard";
import { register } from "@/services/state/auth/authSlice";
import FormHeader from "./FormHeader";
import FormContent from "./FormContent";

export default function RegisterForm() {
	const email = useStateAndError();
	const password = useStateAndError();
	const confirmPassword = useStateAndError();

	const [registerError, setRegisterError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const [loading, setLoading] = useState(false);

	const [selected, setSelected] = useState(null);
	const dispatch = useDispatch();

	async function handleRegisterSubmit(ev) {
		ev.preventDefault();
		setLoading(true);

		const emailOk = email.checkCompletion();
		const passwordOk = password.checkCompletion();
		const confirmPasswordOk = confirmPassword.checkCompletion();

		if (emailOk && passwordOk && confirmPasswordOk) {
			if (password.value !== confirmPassword.value) {
				setRegisterError(true);
				setSelected(null);
				setErrorMessage("Las contraseñas no coinciden");
			} else {
				try {
					setSelected('register');

					const userObtained = await signUp({
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
					setRegisterError(true);
					setSelected(null);
					setErrorMessage("Usuario ya existe");
				}
			}
		}
		setLoading(false);
	}

	async function handleGoogleRegister(ev) {
		ev.preventDefault();
		setLoading(true);
		try {
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
		}
		setLoading(false);
	}

	const contentList = [
		{
			title: 'Email',
			id: 'email',
			type: 'email',
			placeholder: 'm@example.com',
			obj: email
		},
		{
			title: 'Contraseña',
			id: 'password',
			type: 'password',
			obj: password
		},
		{
			title: 'Confirmar Contraseña',
			id: 'confirmPassword',
			type: 'password',
			obj: confirmPassword
		},
	];

	const buttons = [
		{
			isLoading: loading,
			isSelected: selected === 'register',
			text: "Continuar",
			handleSubmit: handleRegisterSubmit
		},
		{
			isLoading: loading,
			isSelected: selected === 'registerGoogle',
			text: "Continuar con Google",
			handleSubmit: handleGoogleRegister,
			variant: "outline"
		},
	];

	const footer = (
		<div className="mt-4 text-center text-sm flex flex-row items-center gap-1 justify-center">
			¿Ya tenés cuenta?
			<Link to={'/login'} className="underline">
				Iniciar sesión
			</Link>
		</div>
	);

	return (
		<CustomCard className="max-w-xl mx-auto w-full shadow-xl">
			<CustomCard>
				<FormHeader
					title={"Crear cuenta"}
					description={"Registrate con tus datos"}
					error={registerError}
					setError={setRegisterError}
					errorMessage={errorMessage}
				/>
				<FormContent
					contentList={contentList}
					buttons={buttons}
					footer={footer}
				/>
			</CustomCard>
		</CustomCard>
	)
}
