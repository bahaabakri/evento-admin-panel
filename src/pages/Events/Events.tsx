import { useEffect, useState } from "react"
import MainTable from "../../UI/MainTable/MainTable"
import { useHttp } from "../../hooks/useHttp"
import type { MyEvent, MyEventResponse } from "./events.type"
import eventsColumns from "./events-columns"
import { Pagination } from "@mantine/core"

const EventPage = () => {
    const [activePage, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const {loading, error:errorMessage, request} = useHttp()
    const [events, setEvents] = useState<MyEvent[]>([])

    const fetchAllEvents = async(page:number = 1, perPage:number = 10) => {
        setPage(page)
        const res = await request<MyEventResponse>('get', `admin/events?page=${page}&perPage=${perPage}`)
        if(res) {
            const {data, meta} = res
            const {perPage, total} = meta
            setNumOfPages(Math.ceil(total / perPage))
            setEvents(data)
        }
    };
    useEffect(() => {
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
        <Pagination className="m-auto w-fit" value={activePage} onChange={(page) => fetchAllEvents(page)} total={numOfPages} />;
    </div>

    )
}

export default EventPage