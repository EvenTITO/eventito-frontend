import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {useGetReviewsForWork, useGetReviewersForWork, getReviewersWithStatus} from "@/hooks/events/chairHooks";
import {useGetWorkById} from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
    const workInfo = useGetWorkById();
    const reviews = useGetReviewsForWork();
    const reviewers = useGetReviewersForWork();
    const reviewersWithStatus = getReviewersWithStatus(reviews, reviewers)

    const component = (
        <Page selectedWork={workInfo.data} reviews={reviews.data} reviewers={reviewersWithStatus.data}/>
    );
    return (
        <FetchStatus
            component={component}
            isPending={workInfo.isPending || reviews.isPending}
            error={workInfo.error || reviews.error}
        />
    );
}
