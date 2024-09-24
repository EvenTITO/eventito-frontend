import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import ContainerViewPage from "../_components/ContainerViewPage";
import ImageHeader from "../_components/ImageHeader";
import {
  MotionMain,
  MotionDiv,
  MotionH1,
  MotionP,
} from "../_components/Animation";

export default function RegistrationPage({ event }) {
  return (
    <ContainerViewPage>
      <ImageHeader
        image={event.media.find((item) => item.name === "banner_image")}
      />
      <MotionMain>
        <MotionDiv className="space-y-6 mb-12">
          <MotionH1 className="text-4xl font-bold">
            Inscripción para {event.title}
          </MotionH1>
          <MotionP className="text-lg text-muted-foreground">
            Completar todos los campos para finalizar la inscripción.
          </MotionP>
        </MotionDiv>

        <MotionDiv className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">
            Opciones de Inscripción
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {event.pricing.map((price, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{price.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold mb-2">
                    {price.currency} {price.description}
                  </p>
                  {price.related_date && (
                    <p className="text-sm text-muted-foreground flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {new Date(price.related_date).toLocaleDateString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </MotionDiv>

        <motion.form className="space-y-8">
          <MotionDiv className="space-y-4">
            <Label htmlFor="affiliation">Filiación (Opcional)</Label>
            <Input
              id="affiliation"
              placeholder="Ingresar filiación (esto podrás cambiarlo luego) en caso de tener"
              className="w-full"
            />
          </MotionDiv>

          <MotionDiv className="space-y-4">
            <Label htmlFor="document">DNI</Label>
            <Input
              id="document"
              placeholder="Ingresar documento de identidad"
              className="w-full"
            />
          </MotionDiv>

          <MotionDiv className="space-y-4">
            <Label htmlFor="country">País</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar país" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">Argentina</SelectItem>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="cl">Chile</SelectItem>
                <SelectItem value="pe">Perú</SelectItem>
                <SelectItem value="uy">Uruguay</SelectItem>
                <SelectItem value="co">Colombia</SelectItem>
                <SelectItem value="pa">Paraguay</SelectItem>
              </SelectContent>
            </Select>
          </MotionDiv>

          <MotionDiv>
            <Button type="submit" className="w-full">
              Finalizar registro
            </Button>
          </MotionDiv>
        </motion.form>
      </MotionMain>
    </ContainerViewPage>
  );
}
