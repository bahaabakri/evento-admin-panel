import { HeroResponse } from "@/components/Hero/hero.type";
import { useConfirmModal } from "@/hooks/useConfirmModal";
import { useHttp } from "@/hooks/useHttp";
import useIsAllowed from "@/hooks/useIsAllowed";
import MainTable from "@/UI/MainTable/MainTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroesColumns from "./heroes-columns";
import { PermissionsEnum } from "@/pages/Permissions/permissions.enum";
import { Pagination, ThemeIcon } from "@mantine/core";
import {
  IconCheck,
  IconEdit,
  IconEye,
  IconPlus,
  IconRosetteDiscountCheck,
  IconTrash,
} from "@tabler/icons-react";
import CustomButton from "@/UI/CustomButton/CustomButton";
import { MyResponsePagination } from "@/types/response.type.";
import { showErrorToast, showSuccessToast } from "@/services/toast";

const HeroesPage = () => {
  const [activePage, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(1);
  const { loading, request, errorMessage } = useHttp();
  const [heroes, setHeroes] = useState<HeroResponse[]>([]);
  const navigate = useNavigate();
  const { openConfirmModal } = useConfirmModal();
  const { checkIsAllowed } = useIsAllowed();
  console.log(checkIsAllowed([PermissionsEnum.DELETE_HERO]));

  const fetchAllHeroes = async (page: number = 1, perPage: number = 10) => {
    setPage(page);

    const { data: dataRes } = await request<MyResponsePagination<HeroResponse>>(
      "get",
      `admin/heroes?page=${page}&perPage=${perPage}`,
    );
    if (dataRes) {
      const { data, meta } = dataRes;
      const { perPage, total } = meta;
      setNumOfPages(Math.ceil(total / perPage));
      setHeroes(data);
    }
  };
  const navigateToAddHero = () => {
    navigate("add");
  };
  const navigateToHeroDetails = (row: HeroResponse) => {
    navigate(`${row.id}`);
  };
  const navigateToEditHero = (row: HeroResponse) => {
    navigate(`edit/${row.id}`);
  }
  const onClickDeleteHeroButton = async (row: HeroResponse) => {
    openConfirmModal({
      title: "Delete Confirmation",
      message: `Are you sure you want to delete the hero "${row.name}"? This action cannot be undone.`,
      onConfirm: async () => {
        const { data, error } = await request<{ message: string }>(
          "delete",
          `admin/heroes/${row.id}`,
        );
        if (error) {
          showErrorToast(error || "Failed to delete Hero");
        } else {
          showSuccessToast(data?.message || "Hero deleted successfully");
          fetchAllHeroes(activePage);
        }
      },
    });
  };

  const onClickActivateHero = async (row: HeroResponse) => {
    openConfirmModal({
      title: "Activate Confirmation",
      color: "green",
      message: `Are you sure you want to activate the hero "${row.name}"?`,
      onConfirm: async () => {
        const { data, error } = await request<{ message: string }>(
          "patch",
          `admin/heroes/makeItActive/${row.id}`,
          { isActive: true },
        );
        if (error) {
          showErrorToast(error || "Failed to activate Hero");
        } else {
          showSuccessToast(data?.message || "Hero activated successfully");
          fetchAllHeroes(activePage);
        }
      },
    });
  };
  useEffect(() => {
    fetchAllHeroes();
  }, []);
  return (
    <div>
      <MainTable
        title={"All Heroes"}
        loading={loading}
        data={heroes}
        errorMessage={errorMessage}
        columns={heroesColumns}
        renderActions={(row) => (
          <div className="flex gap-2">
            {checkIsAllowed([PermissionsEnum.UPDATE_HERO]) && (
              <ThemeIcon
                title="Update Hero"
                variant="light"
                color="blue"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToEditHero(row)}
              >
                <IconEdit color="blue" size={18} />
              </ThemeIcon>
            )}
            {checkIsAllowed([PermissionsEnum.DELETE_HERO]) && (
              <ThemeIcon
                title="Delete Hero"
                variant="light"
                color="red"
                className="cursor-pointer"
                size={30}
                onClick={() => onClickDeleteHeroButton(row)}
              >
                <IconTrash color="red" size={18} />
              </ThemeIcon>
            )}
            {checkIsAllowed([PermissionsEnum.VIEW_HERO]) && (
              <ThemeIcon
                title="View Hero Details"
                variant="light"
                color="teal"
                className="cursor-pointer"
                size={30}
                onClick={() => navigateToHeroDetails(row)}
              >
                <IconEye color="teal" size={18} />
              </ThemeIcon>
            )}
            {checkIsAllowed([PermissionsEnum.ACTIVATE_HERO]) &&
              !row.isActive && (
                <ThemeIcon
                  title="Activate Hero"
                  variant="light"
                  color="green"
                  className="cursor-pointer"
                  size={30}
                  onClick={() => onClickActivateHero(row)}
                >
                  <IconRosetteDiscountCheck color="green" size={18} />
                </ThemeIcon>
              )}
          </div>
        )}
      >
        {checkIsAllowed([PermissionsEnum.CREATE_HERO]) && (
          <CustomButton
            onClick={navigateToAddHero}
            leftSection={<IconPlus size={14} />}
          >
            <div>Add New Hero</div>
          </CustomButton>
        )}
      </MainTable>
      {!loading && heroes && heroes.length > 0 && (
        <Pagination
          className="m-auto w-fit"
          value={activePage}
          onChange={(page) => fetchAllHeroes(page)}
          total={numOfPages}
        />
      )}
    </div>
  );
};

export default HeroesPage;
