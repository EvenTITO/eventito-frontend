import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {useGetReviewsForWork,useGetReviewersForWork, getReviewersPending} from "@/hooks/events/chairHooks";
import {useGetWorkById} from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
    const workInfo = useGetWorkById();
    const reviewers = useGetReviewersForWork();
    const reviews = useGetReviewsForWork();
    const reviewers_pending = getReviewersPending(reviews, reviewers)

    const component = (
        <Page selectedWork={workInfo.data} reviews={reviews.data} reviewers_pending={reviewers_pending}/>
    );
    return (
        <FetchStatus
            component={component}
            isPending={workInfo.isPending || reviews.isPending}
            error={workInfo.error || reviews.error}
        />
    );
}
