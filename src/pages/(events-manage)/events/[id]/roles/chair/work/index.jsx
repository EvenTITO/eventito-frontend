import FetchStatus from "@/components/FetchStatus";
import Page from "./page";
import {useGetReviewsForWork} from "@/hooks/events/chairHooks";
import {useGetWorkById} from "@/hooks/events/worksHooks";

export default function ChairWorkPage() {
    const workInfo = useGetWorkById();
    const reviews = useGetReviewsForWork();

    const component = (
        <Page selectedWork={workInfo.data} reviews={reviews.data}/>
    );
    return (
        <FetchStatus
            component={component}
            isPending={workInfo.isPending || reviews.isPending}
            error={workInfo.error || reviews.error}
        />
    );
}
