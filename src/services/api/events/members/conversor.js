import { RoleImportance } from "@/services/api/events/members/common";

export function convertEventMembers(members) {
  return members.map(convertMemberData);
}

function convertMemberData(data) {
  const role = getMostImportantRole(data.roles);
  const userData = data.user;
  const username = userData.name + " " + userData.lastname;
  const id = data.user_id;
  const email = userData.email;
  return {
    id: id,
    email: email,
    username: username,
    role: role,
    amount: 1, // TODO: I dont know what amount is.
  };
}

function getMostImportantRole(roles) {
  let mostImportantRole = null;
  let highestImportance = Infinity;

  for (const role of roles) {
    const importance = RoleImportance[role];
    if (importance < highestImportance) {
      highestImportance = importance;
      mostImportantRole = role;
    }
  }
  return mostImportantRole;
}
