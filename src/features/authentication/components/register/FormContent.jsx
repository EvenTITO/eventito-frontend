import { CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CustomLoginButton from "@/components/CustomLoginButton";
import CustomInput from "@/components/CustomInput";

export default function FormContent({ contentList, buttons, footer }) {
	return (
		<CardContent>
			<div className="grid gap-4">
				<FormInput
					contentList={contentList}
				/>
				{buttons.map((button) => {
					return (
						<CustomLoginButton
							isLoading={button.isLoading}
							isSelected={button.isSelected}
							buttonText={button.text}
							variant={button.variant}
							handleSubmit={button.handleSubmit}
						/>
					)
				})}
			</div>
			<div>{footer}</div>
		</CardContent>
	);
}

function FormInput({ contentList }) {
	return (
		<div className="grid gap-4">
			{contentList.map((content) => {
				return (
					<div key={content.id} className="grid gap-2">
						<Label htmlFor="email">{content.title}</Label>
						<CustomInput
							id={content.id}
							type={content.type}
							placeholder={content.placeholder}
							value={content.obj.value}
							onChange={ev => content.obj.change(ev.target.value)}
							error={content.obj.error}
							required
						/>
					</div>
				);
			})}
		</div>
	);
}
