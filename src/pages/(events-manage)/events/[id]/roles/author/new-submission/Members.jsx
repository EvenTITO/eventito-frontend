import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddAuthorDialog from "./_components/AddAuthorDialog";
import AuthorsTable from "./_components/AuthorsTable";

export default function Members() {
  const [authors, setAuthors] = useState([]);

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
