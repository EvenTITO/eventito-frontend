import {
	ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import Logo from '../../../assets/logo.svg';

export default function EventsList({ events, setEventSelected }) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="hidden w-[100px] sm:table-cell">
						<span className="sr-only">Image</span>
					</TableHead>
					<TableHead>Título</TableHead>
					<TableHead>Ubicación</TableHead>
					<TableHead className="hidden md:table-cell">
						Fecha de comienzo
					</TableHead>
					<TableHead>
						<span className="sr-only">Actions</span>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{events.map((event) => {
					return (
						<TableRow onClick={() => setEventSelected(event.id)} key={event.id}>
							<TableCell className="hidden sm:table-cell">
								<img
									className="aspect-square rounded-md object-cover"
									height="64"
									width="64"
									src={event.main_image_url != null ? event.main_image_url : Logo}
									onError={event => {
										event.target.src = Logo
										event.onerror = null
									}}
								/>
							</TableCell>
							<TableCell className="font-medium">
								{event.title}
							</TableCell>
							<TableCell className="font-medium">
								{event.location}
							</TableCell>
							<TableCell className="hidden md:table-cell">
								{event.start_date}
							</TableCell>
							<TableCell>
								<Button
									aria-haspopup="true"
									size="icon"
									variant="ghost"
								>
									<ChevronRight className="h-4 w-4" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</TableCell>
						</TableRow>
					)
				})}
			</TableBody>
		</Table>
	);
}
