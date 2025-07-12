import { useState } from 'react';
import { IconChevronRight, type Icon, type IconProps } from '@tabler/icons-react';
import { Box, Group, ThemeIcon, UnstyledButton } from '@mantine/core';
import classes from './LinksGroup.module.scss';
import { useNavigate } from 'react-router-dom';

interface LinksGroupProps {
  icon?: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
  isDropDown?:boolean;
  link?:string;
  trigger?: 'click' | 'hover';
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link, isDropDown, trigger = 'click' }: LinksGroupProps) {
  const navigate = useNavigate()
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const handleMouseEnter = () => {
    if (trigger === 'hover' && hasLinks) setOpened(true);
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover' && hasLinks) setOpened(false);
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if(hasLinks) {
        setOpened((o) => !o);
      } else if(link) {
        // navigate
        navigate(link)
      }
    } 
      
  };
  return (
    <Box 
        className={classes.wrapper} 
        pos="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
      <UnstyledButton onClick={handleClick} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center'}}>
            {
                Icon && 
                <ThemeIcon variant="light" size={30}>
                    <Icon size={18} />
                </ThemeIcon>
            }
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
        {hasLinks && opened && (
        <Box className={isDropDown ? classes.dropdownSubmenu : classes.menuSubmenu}>
            {links!.map((link) => (
            <LinksGroup
                key={link.label}
                {...link}
                isDropDown={isDropDown}
                trigger={trigger}
            />
            ))}
        </Box>
        )}
    </Box>
  );
}