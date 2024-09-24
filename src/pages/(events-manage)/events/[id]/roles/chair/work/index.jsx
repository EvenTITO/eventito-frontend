import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {useGetReviewsForWork,useGetReviewersForWork} from "@/hooks/events/chairHooks";
import {useGetWorkById} from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
    const workInfo = useGetWorkById();
    const reviewers = useGetReviewersForWork();
    const reviews = useGetReviewsForWork();
    const reviews_emails = reviews.data != undefined ? reviews.data.map(r => r.email) : [];

    const reviewers_pending = reviewers.data != undefined ? reviewers.data.filter(r => !reviews_emails.includes(r.email)) : [];

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
