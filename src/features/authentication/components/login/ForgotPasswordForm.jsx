import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { sendResetPassword } from "@/features/authentication/services/authorizationServices";
import { useStateAndError } from "@/lib/utils";
import CustomCard from "@/components/CustomCard";
import FormHeader from "@/components/FormHeader";
import FormContent from "@/components/FormContent";

export default function ForgotPasswordForm() {
	const navigate = useNavigate();

	const [emailSent, setEmailSent] = useState(false);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);

	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState('');

	const email = useStateAndError();

	const contentList = [
		{
			title: 'Email',
			id: 'email',
			type: 'email',
			placeholder: 'm@example.com',
			obj: email
		}
	];

	function handleSubmit(ev) {
		ev.preventDefault();
		setSelected("continue");
		setLoading(true);
		if (email.checkCompletion()) {
			try {
				sendResetPassword(email.value);
				setEmailSent(true);
			} catch (exception) {
				setError(true);
				setErrorMessage("Email no registrado");
			}
		}
		setLoading(false);
	}

	function handleGoBack(ev) {
		ev.preventDefault();
		setLoading(true);
		setSelected("back");
		navigate("/login", { replace: true });
		setLoading(false);
	}

	const description = "Ingresá tu email y te llegará un correo para reiniciar la contraseña";
	const buttons = [
		{
			isLoading: loading,
			isSelected: selected === 'continue',
			text: "Continuar",
			handleSubmit: handleSubmit
		},
		{
			isLoading: loading,
			isSelected: selected === 'back',
			text: "Atrás",
			handleSubmit: handleGoBack,
			variant: "outline"
		},
	];

	const emailSentDescription = "Se envío un correo a tu casilla de email para reestablecer tu contraseña";
	const emailSentButtons = [{
		isLoading: loading,
		isSelected: selected === 'back',
		text: "Volver al inicio",
		handleSubmit: handleGoBack,
		variant: "outline"
	}];

	return (
		<CustomCard className="max-w-xl mx-auto w-full shadow-xl">
			<CustomCard>
				<FormHeader
					title={"Recuperar contraseña"}
					description={emailSent ? emailSentDescription : description}
					error={error}
					setError={setError}
					errorMessage={errorMessage}
				/>
				{
					!emailSent && (
						<FormContent
							contentList={contentList}
							buttons={buttons}
						/>
					)
				}
				{
					emailSent && (
						<FormContent
							contentList={[]}
							buttons={emailSentButtons}
						/>
					)
				}
			</CustomCard>
		</CustomCard>
	)
}
