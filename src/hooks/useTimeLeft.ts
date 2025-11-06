/** This is a custom hook to get the days, hours, minutes, and seconds left from ISO data  */

import { useEffect, useState } from "react"
interface UseTimeLeftProps {
    days:number,
    hours:number,
    minutes:number,
    seconds:number
}
const useTimeLeft = (isoDate:string) => {

    const [timeLeft, setTimeLeft] = useState<UseTimeLeftProps>({
        days:0,
        hours:0,
        minutes:0,
        seconds:0
    })
    useEffect(() => {
        const calculateTimeLeft = () => {
            const nowTimeStamp = new Date().getTime()
            const targetTimeStamp = new Date(isoDate).getTime()
            const  diffTimeStamp:number = targetTimeStamp - nowTimeStamp
            if (diffTimeStamp < 0) {
                setTimeLeft({
                    days:0,
                    hours:0,
                    minutes:0,
                    seconds:0
                })
            } else {
                const seconds = Math.floor(diffTimeStamp / 1000) % 60;
                const minutes = Math.floor(diffTimeStamp / (1000 * 60)) % 60;
                const hours = Math.floor(diffTimeStamp / (1000 * 60 * 60)) % 24;
                const days = Math.floor(diffTimeStamp / (1000 * 60 * 60 * 24));
                setTimeLeft({
                    days,
                    hours,
                    minutes,
                    seconds
                })
            }
        }
        /// Initial check
        calculateTimeLeft()
        const interval = setInterval(calculateTimeLeft, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])
    return timeLeft
}
export default useTimeLeft