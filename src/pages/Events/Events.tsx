import { useEffect, useState } from "react"
import MainTable from "../../UI/MainTable/MainTable"
import { useHttp } from "../../hooks/useHttp"
import type { MyEvent } from "./events.type"
import eventsColumns from "./events-columns"

const EventPage = () => {
    const {loading, error:errorMessage, request} = useHttp()
    const [events, setEvents] = useState<MyEvent[]>([])
    useEffect(() => {
        const fetchAllEvents = async() => {
            const res = await request<MyEvent[]>('get', 'admin/events')
            if(res) {
                setEvents(res)
            }
        };
        fetchAllEvents();
    }, [])
    return (
    <div className="mt-8">
        <MainTable 
            title={'All Events'}
            loading={loading} 
            data={events} 
            errorMessage={errorMessage}
            columns={eventsColumns}
        />
    </div>

    )
}

export default EventPage