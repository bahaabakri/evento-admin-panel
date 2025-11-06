import useTimeLeft from '@/hooks/useTimeLeft';
import styles from './EventTimeToLeft.module.scss'
const EventTimeToLeft = ({isoDate}: {isoDate:string}) => {
    const timeLeft = useTimeLeft(isoDate);
    return (
        <div className={styles['event-card-date']}>
            <div className={styles['event-card-date-title']}>Starts after </div>
            <div>
                <span className={styles['event-card-date-value']}>{String(timeLeft.days).padStart(2, '0')}&nbsp;</span>
                <span className={styles['event-card-date-unit']}>day{timeLeft.days > 1 && <span>s</span>}&nbsp;</span>
                <span className={styles['event-card-date-value']}>{String(timeLeft.hours).padStart(2, '0')}&nbsp;</span>
                <span className={styles['event-card-date-unit']}>hour{timeLeft.hours > 1 && <span>s</span>}&nbsp;</span>
                <span className={styles['event-card-date-value']}>{String(timeLeft.minutes).padStart(2, '0')}&nbsp;</span>
                <span className={styles['event-card-date-unit']}>min{timeLeft.minutes > 1 && <span>s</span>}&nbsp;</span>
                <span className={styles['event-card-date-value']}>{String(timeLeft.seconds).padStart(2, '0')}&nbsp;</span>
                <span className={styles['event-card-date-unit']}>second{timeLeft.seconds > 1 && <span>s</span>}&nbsp;</span>
            </div>


        </div>
    )
}
export default EventTimeToLeft