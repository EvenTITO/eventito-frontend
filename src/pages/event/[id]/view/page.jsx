import { apiGetEventById } from "@/services/api/events/general/queries";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  DollarSign,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

export default function EventViewPage() {
  const { id: eventId } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["getEventById"],
    queryFn: () => apiGetEventById(eventId),
  });

  if (isPending) {
    return <div>Loading....</div>;
  } else if (error) {
    console.log("error" + error);
    return <div>error!</div>;
  }

  return <Event eventData={data} />;
}

function Event({ eventData }) {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="relative mb-8">
        <img
          src={
            eventData.media.find((m) => m.name === "banner_image")?.url ||
            "/placeholder.svg?height=200&width=1000"
          }
          alt="Event Banner"
          className="w-full h-48 object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
          <h1 className="text-4xl font-bold text-white">{eventData.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {eventData.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span></span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{eventData.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  <span>Organized by {eventData.organized_by}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>Submission Deadline: </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tracks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {eventData.tracks.map((track, index) => (
                  <Badge key={index} variant="secondary">
                    {track}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              {eventData.pricing.map((price, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{price.description}</span>
                  <Badge variant="outline">
                    <DollarSign className="mr-1 h-4 w-4" />
                    {price.value} {price.currency}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Download Brochure
              </Button>
              <Button className="w-full" variant="outline">
                <ImageIcon className="mr-2 h-4 w-4" />
                View Gallery
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p>For inquiries, please contact:</p>
              <p className="font-semibold mt-2">{eventData.contact}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Status</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="default">{eventData.status}</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
