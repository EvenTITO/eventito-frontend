import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddAuthorDialog from "./AddAuthorDialog";
import AuthorsTable from "./AuthorsTable";

// TODO: que reciba una lista de autores y que la pagina se encargue
// de pasarselo
export default function Members({ authorList = [] }) {
  const [authors, setAuthors] = useState(authorList);

  return (
    <Card>
      <CardHeader>
        <CardTitle className={"flex items-center justify-between"}>
          <span>Autores del trabajo</span>
          <AddAuthorDialog
            newAuthor={(author) => setAuthors([...authors, author])}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <AuthorsTable authors={authors} />
      </CardContent>
    </Card>
  );
}
