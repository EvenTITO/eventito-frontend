import Page from "./page";

export default function ChairPage() {
  return <Page tracks={tracks} />;
}

const tracks = [
  {
    id: 1,
    titulo: "Aprendizaje Automático en Salud: Un Estudio Exhaustivo",
    autores: [
      { nombre: "Dra. Juana Pérez", esOrador: true },
      { nombre: "Prof. Juan García", esOrador: false },
      { nombre: "Dra. Emilia Moreno", esOrador: false },
    ],
    fechaEnvio: new Date(2023, 5, 1),
    estado: "En Revisión",
    categoria: "IA en Medicina",
    resumen:
      "Este estudio explora el potencial transformador del aprendizaje automático en la atención médica, centrándose en la detección temprana de enfermedades, planes de tratamiento personalizados y análisis predictivo.",
    enlacePDF: "https://ejemplo.com/aprendizaje-automatico-salud.pdf",
    revisores: [
      {
        id: 1,
        nombre: "Dr. Carlos Rodríguez",
        fechaLimite: new Date(2023, 6, 15),
        revision: "Excelente trabajo, recomiendo su aceptación.",
      },
      {
        id: 2,
        nombre: "Dra. Ana Martínez",
        fechaLimite: new Date(2023, 6, 20),
        revision: "Necesita revisiones menores antes de ser aceptado.",
      },
    ],
  },
  {
    id: 2,
    titulo: "Computación Cuántica: Una Nueva Era",
    autores: [
      { nombre: "Prof. Juan García", esOrador: true },
      { nombre: "Dra. Alicia Jiménez", esOrador: false },
    ],
    fechaEnvio: new Date(2023, 5, 15),
    estado: "Pendiente de Revisión",
    categoria: "Tecnologías Cuánticas",
    resumen:
      "Este artículo introduce avances revolucionarios en computación cuántica, mostrando un nuevo enfoque para la manipulación de qubits que reduce significativamente la decoherencia.",
    enlacePDF: "https://ejemplo.com/computacion-cuantica-nueva-era.pdf",
    revisores: [],
  },
];
