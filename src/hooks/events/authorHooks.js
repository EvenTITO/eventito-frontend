import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId, wait } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetMyWorks() {
  const eventId = getEventId();
  return useQuery({
    queryKey: ["getMyWorks", { eventId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return mockedWorks;
    },
  });
}

const mockedWorks = [
  {
    id: 1,
    title: "Machine Learning in Healthcare: A Comprehensive Study",
    authors: [
      { name: "Dr. Jane Smith", isSpeaker: true },
      { name: "Prof. John Doe", isSpeaker: false },
      { name: "Dr. Emily Brown", isSpeaker: false },
    ],
    submissionDate: new Date(2023, 5, 1),
    status: "En revisión",
    track: "AI in Medicine",
    abstract:
      "This study explores the transformative potential of machine learning in healthcare, focusing on early disease detection, personalized treatment plans, and predictive analytics. We present a novel approach that combines deep learning algorithms with electronic health records to improve diagnostic accuracy and patient outcomes. Our findings suggest significant improvements in early detection rates for several chronic conditions, potentially revolutionizing preventive care strategies.",
    pdfLink: "https://example.com/machine-learning-healthcare.pdf",
  },
  {
    id: 2,
    title: "Quantum Computing: A New Era",
    authors: [
      { name: "Prof. John Doe", isSpeaker: true },
      { name: "Dr. Alice Johnson", isSpeaker: false },
    ],
    submissionDate: new Date(2023, 5, 15),
    status: "Aceptado",
    track: "Quantum Technologies",
    abstract:
      "This paper introduces groundbreaking advancements in quantum computing, showcasing a novel approach to qubit manipulation that significantly reduces decoherence. Our research demonstrates a 50% improvement in quantum circuit depth, paving the way for more complex quantum algorithms and bringing us closer to practical quantum supremacy.",
    pdfLink: "https://example.com/quantum-computing-new-era.pdf",
  },
];
