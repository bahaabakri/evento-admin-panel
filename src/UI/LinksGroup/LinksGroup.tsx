import { useState } from 'react';
import { IconChevronRight, type Icon, type IconProps } from '@tabler/icons-react';
import { Box, Collapse, Group, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './LinksGroup.module.scss';

interface LinksGroupProps {
  icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  isDropDown?:boolean;
  trigger?: 'click' | 'hover';
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, isDropDown, trigger = 'click' }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={(event) => event.preventDefault()}
    >
      {link.label}
    </Text>
  ));
  const handleMouseEnter = () => {
    if (trigger === 'hover' && hasLinks) setOpened(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && hasLinks) setOpened(false);
  };

  const handleClick = () => {
    if (trigger === 'click' && hasLinks) setOpened((o) => !o);
  };
  return (
    <Box 
        className={classes.wrapper} 
        pos="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
      <UnstyledButton onClick={handleClick} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              size={16}
                style={{
                    transform:
                    opened && isDropDown
                        ? 'rotate(0deg)'
                        : opened
                        ? 'rotate(-90deg)'
                        : 'none',
                }}
            />
          )}
        </Group>
      </UnstyledButton>
        {hasLinks && opened && isDropDown && (
            <Box className={classes.submenu}>
            <Stack gap="xs">
                {links!.map((link) => (
                <Text<'a'>
                    component="a"
                    className={`${classes['item']} ${classes['dropdown-item']}`}
                    href={link.link}
                    key={link.label}
                    onClick={(event) => event.preventDefault()}
                >
                    {link.label}
                </Text>
                ))}
            </Stack>
            </Box>
        )}
      {hasLinks && !isDropDown ? <Collapse in={opened}>{items}</Collapse> : null}
    </Box>
  );
}