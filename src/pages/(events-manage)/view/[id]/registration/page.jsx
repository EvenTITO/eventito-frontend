import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

export default function RegistrationPage({ event }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full h-[300px] mb-8 rounded-lg overflow-hidden">
        <img
          src="https://makepath.com/wp-content/uploads/2022/06/Adventure-Guide-Etsy-Banner-860-%C3%97-520-px.png"
          alt="Event banner"
          className="w-full h-full object-cover"
        />
      </div>
      <motion.main
        className="max-w-4xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 mb-12" variants={itemVariants}>
          <motion.h1 className="text-4xl font-bold" variants={itemVariants}>
            Inscripción para {event.title}
          </motion.h1>
          <motion.p
            className="text-lg text-muted-foreground"
            variants={itemVariants}
          >
            Completar todos los campos para finalizar la inscripción.
          </motion.p>
        </motion.div>

        <motion.div className="mb-12" variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4">Opciones de Inscripción</h2>
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
        </motion.div>

        <motion.form className="space-y-8" variants={itemVariants}>
          <motion.div className="space-y-4" variants={itemVariants}>
            <Label htmlFor="affiliation">Filiación (Opcional)</Label>
            <Input
              id="affiliation"
              placeholder="Enter your affiliation"
              className="w-full"
            />
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
            <Label htmlFor="document">DNI</Label>
            <Input
              id="document"
              placeholder="Enter your document number"
              className="w-full"
            />
          </motion.div>

          <motion.div className="space-y-4" variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button type="submit" className="w-full">
              Finalizar registro
            </Button>
          </motion.div>
        </motion.form>
      </motion.main>
    </div>
  )
}
