import { useEffect, useState } from "react"
import MainTable from "../../UI/MainTable/MainTable"
import { useHttp } from "../../hooks/useHttp"
import type { MyEvent, MyEventResponse } from "./events.type"
import eventsColumns from "./events-columns"
import { Pagination } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import CustomButton from "../../UI/CustomButton/CustomButton"

const EventPage = () => {
    const [activePage, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const {loading, error:errorMessage, request} = useHttp()
    const [events, setEvents] = useState<MyEvent[]>([])
    const navigate = useNavigate()
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
    const navigateToAddEvent = () => {
        navigate('/events/add')
    }
    useEffect(() => {
        fetchAllEvents();
    }, [])

    return (
    <div>
        <MainTable 
            title={'All Events'}
            loading={loading} 
            data={events} 
            errorMessage={errorMessage}
            columns={eventsColumns}
        >
            <CustomButton onClick={navigateToAddEvent} leftSection={<IconPlus size={14} />}>
                <div>Add New Event</div>
            </CustomButton>
        </MainTable>
        {
            !loading && events && events.length > 0 && 
            <Pagination className="m-auto w-fit" value={activePage} onChange={(page) => fetchAllEvents(page)} total={numOfPages} />
        }
    </div>

    )
}

export default EventPage