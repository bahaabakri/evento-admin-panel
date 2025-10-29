import { useEffect, useState } from "react"
import MainTable from "@/UI/MainTable/MainTable"
import { useHttp } from "@/hooks/useHttp"
import {Pagination, ThemeIcon } from "@mantine/core"
import { IconEdit, IconPlus, IconTrash } from "@tabler/icons-react"
import { useNavigate } from "react-router-dom"
import CustomButton from "@/UI/CustomButton/CustomButton"
import { useConfirmModal } from "@/hooks/useConfirmModal"
import { showErrorToast, showSuccessToast } from "@/services/toast"
import { User } from "@/types/user.type"
import { MyResponsePagination } from "@/types/response.type."
import adminsColumns from "./admins-columns"
// import { useDisclosure } from "@mantine/hooks"

const AdminsPage = () => {
    // const [opened, { open, close }] = useDisclosure(false); 
    const [activePage, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(1);
    const {loading, errorMessage, request} = useHttp()
    const [admins, setAdmins] = useState<User[]>([])
    const navigate = useNavigate()
    const { openConfirmModal } = useConfirmModal();
    
    const fetchAllAdmins = async(page:number = 1, perPage:number = 10) => {
        setPage(page)
        const {data:dataRes} = await request<MyResponsePagination<User>>('get', `admin/users/admins?page=${page}&perPage=${perPage}`)
        if(dataRes) {
            const {data, meta} = dataRes
            const {perPage, total} = meta
            setNumOfPages(Math.ceil(total / perPage))
            setAdmins(data)
        }
    };
    const navigateToAddAdmin = () => {
        navigate('/admins/add')
    }
    useEffect(() => {
        fetchAllAdmins();
    }, [])

    const navigateToEditAdmin =(row: User) => {
        navigate(`/admins/edit/${row.id}`);
    }
    const onClickDeleteButton = async(row: User) => {
        // Implement delete functionality here
        
        openConfirmModal({
            title: 'Delete admin?',
            message: 'Are you sure you want to delete this admin? This cannot be undone.',
            onConfirm: () => handleDelete(row),
            confirmLabel: 'Delete',
            color: 'red',
        });
    }

    const handleDelete = async (row: User) => {
        try {
            const res = await request('delete', `admin/users/admins/${row.id}`)
            if (res) {
                // Optionally, you can refetch the events after deletion
                showSuccessToast('Admin deleted successfully');
                fetchAllAdmins(activePage);
            }
        } catch (error) {
            showErrorToast(error instanceof Error ? error.message : 'Failed to delete admin');
        }
    }
    return (
    <div>
        {/* <Modal opened={opened} onClose={close} title="Confirmation"> */}
        {/* Modal content */}
        {/* </Modal> */}
        <MainTable 
            title={'All Users'}
            loading={loading} 
            data={admins} 
            errorMessage={errorMessage}
            columns={adminsColumns}
              renderActions={(row) => (
            <div className="flex gap-2">
                <ThemeIcon variant="light" color="blue" className="cursor-pointer" size={30} onClick={() => navigateToEditAdmin(row)}>
                    <IconEdit color="blue" size={18} />
                </ThemeIcon>
                <ThemeIcon variant="light" color="red" className="cursor-pointer" size={30} onClick={() => onClickDeleteButton(row)}>
                    <IconTrash color="red" size={18} />
                </ThemeIcon>
            </div>
  )}
        >
            <CustomButton onClick={navigateToAddAdmin} leftSection={<IconPlus size={14} />}>
                <div>Add New User</div>
            </CustomButton>
        </MainTable>
        {
            !loading && admins && admins.length > 0 && 
            <Pagination className="m-auto w-fit" value={activePage} onChange={(page) => fetchAllAdmins(page)} total={numOfPages} />
        }
    </div>

    )
}

export default AdminsPage