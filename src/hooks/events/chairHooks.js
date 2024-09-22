import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiGetWorksByTrack } from "@/services/api/works/queries";
import { convertWorks } from "@/services/api/works/conversor";

export function useGetWorksByTrack(track) {
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getWorksByTrack", { eventId, track }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      console.log(`llamando. id: ${eventId} track: ${track}`)
      const works = await apiGetWorksByTrack(httpClient, eventId, track);
      console.log(`se llama a get works: ${JSON.stringify(works)}`);
      return convertWorks(works);
    },
    onError: (error) => {
      console.error(error);
    },
  });
}

export function useGetReviewsForAssignment() {
  const workId = getWorkId();
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getReviewsForAssignment", { workId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return reviews;
    },
  });
}

export function useAddReviewer() {
  const workId = getWorkId();
  const eventId = getEventId();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, deadline }) => {
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getReviewsForAssignment"] });
    },
  });
}





const mockAssignments = [
  {
    id: 1,
    title: "Machine Learning in Healthcare: A Comprehensive Study",
    authorCount: 3,
    submitter: "Dr. Jane Smith",
    maxReviewDate: new Date(2023, 6, 15),
    track: "AI in Medicine",
    authors: ["Dr. Jane Smith", "Prof. John Doe", "Dr. Emily Brown"],
    orator: "Dr. Jane Smith",
    abstract:
      "This study explores the transformative potential of machine learning in healthcare, focusing on early disease detection, personalized treatment plans, and predictive analytics. We present a novel approach that combines deep learning algorithms with electronic health records to improve diagnostic accuracy and patient outcomes. Our findings suggest significant improvements in early detection rates for several chronic conditions, potentially revolutionizing preventive care strategies.",
    pdfLink: "https://example.com/machine-learning-healthcare.pdf",
    status: "-",
    published: false,
  },
  {
    id: 2,
    title: "Quantum Computing: A New Era",
    authorCount: 2,
    submitter: "Prof. John Doe",
    maxReviewDate: new Date(2023, 6, 20),
    track: "Quantum Technologies",
    authors: ["Prof. John Doe", "Dr. Alice Johnson"],
    orator: "Prof. John Doe",
    abstract:
      "This paper introduces groundbreaking advancements in quantum computing, showcasing a novel approach to qubit manipulation that significantly reduces decoherence. Our research demonstrates a 50% improvement in quantum circuit depth, paving the way for more complex quantum algorithms and bringing us closer to practical quantum supremacy.",
    pdfLink: "https://example.com/quantum-computing-new-era.pdf",
    status: "-",
    published: false,
  },
  {
    id: 3,
    title: "Sustainable Energy Solutions",
    authorCount: 4,
    submitter: "Dr. Emily Brown",
    maxReviewDate: new Date(2023, 6, 18),
    track: "Green Technologies",
    authors: [
      "Dr. Emily Brown",
      "Dr. Michael Green",
      "Prof. Sarah Lee",
      "Dr. David Chen",
    ],
    orator: "Dr. Emily Brown",
    abstract:
      "Our research presents an innovative approach to sustainable energy production, combining advanced solar cell technology with AI-driven energy distribution systems. This integrated solution shows a 30% increase in energy efficiency and a 25% reduction in carbon emissions compared to current best practices, offering a scalable model for smart cities of the future.",
    pdfLink: "https://example.com/sustainable-energy-solutions.pdf",
    status: "-",
    published: false,
  },
];

const reviewForm = [
  {
    title: "Calificación general",
    answer: 8,
  },
  {
    title: "Recomendación",
    answer: "Aceptado",
  },
  {
    title: "Área de mejora",
    answer: "Ninguna",
  },
  {
    title: "Comentarios a los autores",
    answer:
      "Muy buen trabajo general, revisar que todas las imágenes tengan el mismo tamaño para el momento de la presentación.",
  },
];

const reviews = [
  {
    reviewer: "Gonzalo Sabatino",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "Aceptado",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Fernando Sinisi",
    completed: true,
    deadlineDate: "2024/09/20",
    status: "A revisión",
    reviewForm: reviewForm,
  },
  {
    reviewer: "Lucas Verón",
    completed: false,
    deadlineDate: "2024/09/20",
    status: null,
    reviewForm: null,
  },
];
