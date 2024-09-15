/*
 *  Custom hooks to consume from the reviewers API
 * */

import { useQuery } from "@tanstack/react-query";
import { apiGetAssignment } from "./queries";
import { EVENTS_URL } from "@/lib/Constants";
import { HTTPClient } from "@/services/api/HTTPClient";

export function getAssignmentInfo(workId) {
  return useQuery({
    queryKey: ["getAssignmentInfo"],
    queryFn: async () => {
      const httpClient = new HTTPClient(EVENTS_URL);
      const assignmentInfo = await apiGetAssignment(httpClient, workId);
      return assignmentInfo;
    },
  });
}
