import { IconSearch } from '@tabler/icons-react';
import {
  Code,
  TextInput,
} from '@mantine/core';
// import { UserButton } from '../UserButton/UserButton';
import classes from './MainSidebar.module.scss';
import MainSidebarHeader from './MainSidebarHeader/MainSidebarHeader';
import mainSidebarMenu from './data/main-sidebar'
import { LinksGroup } from '../../UI/LinksGroup/LinksGroup';

export function MainSidebar() {
  const mainLinks = mainSidebarMenu.map((item) => <LinksGroup {...item} key={item.label} />);
  return (
    <nav className={classes.navbar}>
      <div className={classes.section}>
        <MainSidebarHeader />
      </div>

      <TextInput
        placeholder="Search"
        size="xs"
        leftSection={<IconSearch size={12} stroke={1.5} />}
        rightSectionWidth={70}
        rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
        styles={{ section: { pointerEvents: 'none' } }}
        mb="sm"
      />

      <div className={classes.section}>
        <div className={classes.mainLinks}>{mainLinks}</div>
      </div>
    </nav>
  );
}