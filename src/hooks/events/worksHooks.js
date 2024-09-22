import { EVENTS_URL } from "@/lib/Constants";
import { getEventId, getWorkId } from "@/lib/utils";
import { HTTPClient } from "@/services/api/HTTPClient";
import { useQuery } from "@tanstack/react-query";

export function useGetWorkForAssignment() {
  const workId = getWorkId();
  const eventId = getEventId();

  return useQuery({
    queryKey: ["getWorkForAssignment", { workId }],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      return selectedAssignment;
    },
  });
}

const selectedAssignment = {
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
};
