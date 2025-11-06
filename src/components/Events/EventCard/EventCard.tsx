import styles from "./EventCard.module.scss";
import EventTimeToLeft from "../EventTimeToLeft/EventTimeToLeft";
import { transformIsoDateToReadable } from "@/services/date";
import { IconCalendarEvent, IconLocation } from "@tabler/icons-react";
import { MyEvent } from "@/pages/Events/events.type";
import { renderImage } from "@/renders/renderImage";
interface EventCardProps {
  event: MyEvent;
}
const EventCard = ({ event }: EventCardProps) => {
  return (
    <div>
      <div className={styles["event-card"]}>
        <div className={styles["event-card-content-img"]}>
          <div className={styles["event-card-img"]}>
            {renderImage(
              event.images,
              "url",
              "name",
              "w-48 h-48 object-contain rounded-md border border-gray-200 bg-gray-50"
            )}
          </div>
          <div className={styles["event-card-content"]}>
            <div className={styles["event-card-title"]}>{event.name}</div>
            <EventTimeToLeft isoDate={event.date} />
            <div className={styles["event-card-date"]}>
              <div>
                <IconCalendarEvent className="text-roseRed-5" />
              </div>
              <div>{transformIsoDateToReadable(event.date)}</div>
            </div>
            <div className={styles["event-card-place"]}>
              <div>
                <IconLocation className="text-roseRed-5" />{" "}
              </div>
              <div>{event.location}</div>
            </div>
            <div className={styles["event-card-desc"]}>{event.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventCard;
