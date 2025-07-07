import { Avatar, Menu } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import styles from './MainSidebarHeader.module.scss';
import avatarImg from '../../../assets/avatar.jpg';
import userDropDownMenu from "../data/user-dropdown";
import { LinksGroup } from "../../../UI/LinksGroup/LinksGroup";

const MainSidebarHeader = () => {
    return (
        <Menu trigger="hover" openDelay={100} closeDelay={400}>
            <Menu.Target>
                <div className={styles['main-sidebar-header-wrapper']}>
                    <div className={styles['content-wrapper']}>
                        <Avatar radius="full"  src={avatarImg} />
                        <div className={styles['user-info-wrapper']}>
                            <h4 className={styles['username']}>Harriette Spoonlicker</h4>
                            <p className={styles['email']}>test@outlook.com</p>
            
                        </div>
                    </div>
                    <div className={styles['icon-wrapper']}>
                        <IconChevronRight />
                    </div>
                </div>
            </Menu.Target>

            <Menu.Dropdown>
                {
                    userDropDownMenu.map(el => 
                    <Menu.Item key={el.label}>
                        <LinksGroup isDropDown trigger="hover" {...el} />
                    </Menu.Item>)
                }
            </Menu.Dropdown>
        </Menu>

    )
}
export default MainSidebarHeader;