import { useEffect, useState } from "react"
import MainTable from "../../UI/MainTable/MainTable"
import { useHttp } from "../../hooks/useHttp"
import type { MyEvent, MyEventResponse } from "./events.type"
import eventsColumns from "./events-columns"
import {Pagination, ThemeIcon } from "@mantine/core"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import CustomButton from "../../UI/CustomButton/CustomButton"
// import { useDisclosure } from "@mantine/hooks"

const EventPage = () => {
    // const [opened, { open, close }] = useDisclosure(false); 
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

    const handleEdit =(row: MyEvent) => {
        console.log("Edit event", row.id);
    }
    const handleDelete = async(row: MyEvent) => {
        // Implement delete functionality here
        console.log("Delete event", row.id);
        try {
            const res = await request('delete', `admin/events/${row.id}`)
            if (res) {
                // Optionally, you can refetch the events after deletion
                fetchAllEvents(activePage);
            }
        } catch (error) {
            console.error("Error deleting event:", error);
        }

    }
    return (
    <div>
        {/* <Modal opened={opened} onClose={close} title="Confirmation"> */}
        {/* Modal content */}
        {/* </Modal> */}
        <MainTable 
            title={'All Events'}
            loading={loading} 
            data={events} 
            errorMessage={errorMessage}
            columns={eventsColumns}
              renderActions={(row) => (
            <div className="flex gap-2">
                <ThemeIcon variant="light" color="blue" size={30} onClick={() => handleEdit(row)}>
                    <IconEdit color="blue" size={18} />
                </ThemeIcon>
                <ThemeIcon variant="light" color="red" size={30} onClick={() => handleDelete(row)}>
                    <IconTrash color="red" size={18} />
                </ThemeIcon>
            </div>
  )}
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