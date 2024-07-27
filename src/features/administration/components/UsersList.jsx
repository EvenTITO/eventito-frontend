import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.jsx";
import {FaUserCheck, FaUserEdit} from "react-icons/fa";
import {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.jsx";
import {USER_ROLES} from "@/lib/Constants.js";

export default function UsersList({users, editUser}) {
    const [enableEditUserId, setEnableEditUserId] = useState("");
    const [selectedRole, setSelectedRole] = useState("DEFAULT");

    const enableEditUser = (userId) => {
        setEnableEditUserId(userId);
    }

    const disableEditUser = (userId) => {
        setEnableEditUserId("");
        editUser(userId, selectedRole);
    }

    const handleSelectRole = (value) => {
        setSelectedRole(value)
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">Image</span>
                    </TableHead>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => {
                    return (
                        <TableRow onClick={() => console.log(user.id)} key={user.id}>
                            <TableCell className="hidden sm:table-cell">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="Avatar"/>
                                    <AvatarFallback>{user.name[0] + user.lastname[0]}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell className="font-medium">
                                {user.name + " " + user.lastname}
                            </TableCell>
                            <TableCell className="font-medium">
                                {user.email}
                            </TableCell>
                            <TableCell className="font-medium">
                                {enableEditUserId === user.id ? (
                                    <Select value={selectedRole} onValueChange={handleSelectRole}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Selecciona un rol."/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                {
                                                    USER_ROLES.map((role) => {
                                                        return (
                                                            <SelectItem value={role.key}>{role.label}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : (USER_ROLES.filter(role => role.key === user.role)
                                    .map(role => role.label)
                                    .at(0))}
                            </TableCell>
                            <TableCell className="font-medium">
                                {enableEditUserId === user.id ? (
                                    <Button variant="outline" size="icon" onClick={() => disableEditUser(user.id)}>
                                        <FaUserCheck className="h-5 w-5"/>
                                    </Button>) : (
                                    <Button variant="outline" size="icon" onClick={() => enableEditUser(user.id)}>
                                        <FaUserEdit className="h-5 w-5"/>
                                    </Button>)
                                }
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    );
}
