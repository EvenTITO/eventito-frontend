import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { useStateAndError } from "@/lib/utils";
import CustomCard from "@/components/CustomCard";
import { completeRegister, getUser } from "../../services/authorizationServices";
import { clearAuth } from "@/services/state/auth/authSlice";
import FormHeader from "@/components/FormHeader";
import FormContent from "@/components/FormContent";
import { Navigate } from "react-router-dom";
import { loginCompleted } from "@/services/state/user/userSlice";

export default function CompleteRegisterForm() {
	const { idUser, email } = useSelector((state) => state.auth);
	const { currentUser } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [selected, setSelected] = useState('');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const name = useStateAndError();
	const lastname = useStateAndError();

	async function obtainUser() {
		try {
			setLoading(true);
			const userObtained = await getUser(idUser);

			dispatch(clearAuth());
			dispatch(loginCompleted(userObtained));
			setLoading(false);
		} catch (exception) {
			setLoading(false);
		}
	}
	useEffect(() => {
		obtainUser();
	}, []);

	if (loading) {
		return (
			<div>Cargando...</div>
		);
	} else if (currentUser) {
		console.log("current user!!!!!");
		return <Navigate to='/' replace />;
	}

	async function handleSubmit(ev) {
		ev.preventDefault();
		setButtonLoading(true);
		setSelected("continue");

		const nameOk = name.checkCompletion();
		const lastnameOk = lastname.checkCompletion();

		if (nameOk && lastnameOk) {
			try {
				const response = await completeRegister({
					uid: idUser,
					name: name.value,
					lastname: lastname.value,
					email: email
				});

				await obtainUser();
			} catch (exception) {
			}
		}

		setButtonLoading(false);
	}
	function handleGoBack(ev) {
		ev.preventDefault();
		setButtonLoading(true);
		setSelected("back");

		dispatch(clearAuth());
		setButtonLoading(false);
	}

	const contentList = [
		{
			title: 'Nombre/s',
			id: 'name',
			type: 'name',
			placeholder: 'Nombre/s',
			obj: name
		},
		{
			title: 'Apellido/s',
			id: 'lastname',
			type: 'name',
			placeholder: 'Apellido/s',
			obj: lastname
		},
	];
	const buttons = [
		{
			isLoading: buttonLoading,
			isSelected: selected === "continue",
			text: "Continuar",
			handleSubmit: handleSubmit
		},
		{
			isLoading: buttonLoading,
			isSelected: selected === "back",
			text: "Atrás",
			handleSubmit: handleGoBack,
			variant: "outline"
		},
	];


	return (
		<CustomCard className="max-w-xl mx-auto w-full shadow-xl">
			<CustomCard>
				<FormHeader
					title={"Completar datos"}
					description={"Completá tus datos para ingresar en la plataforma"}
					error={error}
					setError={setError}
					errorMessage={errorMessage}
				/>
				<FormContent
					contentList={contentList}
					buttons={buttons}
				/>
			</CustomCard>
		</CustomCard>
	)
}
