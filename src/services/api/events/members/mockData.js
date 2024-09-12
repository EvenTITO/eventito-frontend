export async function changeMemberRole(member, role) {
    console.log("changing member role", member, role);
    // TODO: update con idx -> debo obtener info del miembro
    return null;
  }
  
  export async function getMembers() {
    return membersList;
  }
  
  const membersList = [
    {
      id: "m5gr84i9",
      amount: 316,
      email: "ken99@yahoo.com",
      username: "Ken Juarez",
      role: "Organizador"
    },
    {
      id: "3u1reuv4",
      amount: 242,
      email: "Abe45@gmail.com",
      username: "Apu",
      role: "Organizador"
    },
    {
      id: "derv1ws0",
      amount: 837,
      email: "Monserrat44@gmail.com",
      username: "Fabio",
      role: "Organizador"
    },
    {
      id: "5kma53ae",
      amount: 874,
      email: "Silas22@gmail.com",
      username: "Matador Mario Salas",
      role: "Organizador"
    },
    {
      id: "bhqecj4p",
      amount: 721,
      email: "carmella@hotmail.com",
      username: "Carmella Perez",
      role: "Organizador"
    },
  ];
  