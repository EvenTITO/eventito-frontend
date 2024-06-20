import {
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import CustomLoginButton from "@/components/CustomLoginButton";
import CustomInput from "@/components/CustomInput";
import ShowDescriptionOrError from "@/components/ShowDescriptionOrError";
import { useStateAndError } from "@/lib/utils";
import CustomCard from "@/components/CustomCard";
import { signUpAPI } from "../../services/authorizationServices";

export default function CompleteDataForm() {
	const { name, setName, nameError, setNameError } = useStateAndError('name');
	const { lastname, setLastname, lastnameError, setLastnameError } = useStateAndError('lastname');
	const [dataError, setDataError] = useState(false);

	const [selected, setSelected] = useState(null);
	const { idUser, loading } = useSelector((state) => state.user);
	const dispatch = useDispatch();

	function handleDataSubmit(ev) {
		ev.preventDefault();
		if (name !== '' && lastname !== '') {
			setSelected("continue");

			console.log(idUser);
			const userObtained = signUpAPI({
				uid: idUser,
				name: name,
				lastname: lastname,
				email: "mario@gmail.com"
			});
			alert(userObtained.name);
		}
		if (name === '') {
			setNameError(true);
		}
		if (lastname === '') {
			setLastnameError(true);
		}
	}

	function handleBack(ev) {
		ev.preventDefault();
		setSelected("back");
		alert("back");
	}


	function changeName(value) {
		setName(value);
		setNameError(false);
	}

	function changeLastname(value) {
		setLastname(value);
		setLastnameError(false);
	}

	return (
		<CustomCard className="max-w-xl mx-auto w-full shadow-xl">
			<CustomCard>
				<CardHeader>
					<CardTitle className="text-2xl">Completar datos</CardTitle>
					<ShowDescriptionOrError
						description={"Completá los siguientes datos para ingresar a la plataforma"}
						error={dataError}
						setError={setDataError}
						errorMessage={"Datos inválidos"}
					/>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div className="grid gap-2">
							<Label htmlFor="email">Nombre/s</Label>
							<CustomInput
								id="name"
								type="name"
								placeholder="nombre"
								value={name}
								onChange={ev => changeName(ev.target.value)}
								error={nameError}
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Apellido/s</Label>
							<CustomInput
								id="lastname"
								type="name"
								placeholder="apellido"
								value={lastname}
								onChange={ev => changeLastname(ev.target.value)}
								error={lastnameError}
								required
							/>
						</div>
						<CustomLoginButton
							isLoading={loading}
							isSelected={selected === 'continue'}
							buttonText={'Continuar'}
							handleSubmit={handleDataSubmit}
						/>
						<CustomLoginButton
							isLoading={loading}
							isSelected={selected === 'back'}
							buttonText={'Atrás'}
							handleSubmit={handleBack}
							variant={'outline'}
						/>
					</div>
				</CardContent>
			</CustomCard>
		</CustomCard>
	)
}
