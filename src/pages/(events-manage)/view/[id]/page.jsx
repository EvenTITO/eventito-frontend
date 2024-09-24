import { format } from "@formkit/tempo";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Page({ event }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

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
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {event.media.find((item) => item.name === "banner_image") && (
        <div className="w-full h-[300px] mb-8 rounded-lg overflow-hidden">
          <img
            src={
              //event.media.find((item) => item.name === "banner_image").url ||
              "https://makepath.com/wp-content/uploads/2022/06/Adventure-Guide-Etsy-Banner-860-%C3%97-520-px.png"
            }
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <motion.main
        className="max-w-4xl mx-auto px-4 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-6 mb-12" variants={itemVariants}>
          <motion.h1 className="text-4xl font-bold" variants={itemVariants}>
            {event.title}
          </motion.h1>
          <motion.div
            className="flex flex-wrap gap-4 text-sm text-muted-foreground"
            variants={itemVariants}
          >
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              <span>Organized by: {event.organized_by}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{event.location}</span>
            </div>
          </motion.div>
          <motion.div className="space-y-2" variants={itemVariants}>
            {event.dates.map((date, index) => (
              <motion.div
                key={index}
                className="flex items-center text-sm text-muted-foreground"
                variants={itemVariants}
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                <span>
                  {format(new Date(`${date.date}T${date.time}`), {
                    date: "full",
                    time: "short",
                  })}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="prose max-w-none mb-12" variants={itemVariants}>
          <motion.h2
            className="text-2xl font-semibold mb-4"
            variants={itemVariants}
          >
            Sobre el evento
          </motion.h2>
          <motion.p variants={itemVariants}>{event.description}</motion.p>
        </motion.div>
      </motion.main>
    </div>
  );
}
