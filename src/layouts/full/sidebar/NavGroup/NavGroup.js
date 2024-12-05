import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useState } from 'react';
import { useTheme } from '@emotion/react';
import { NavLink } from 'react-router-dom';

const NavGroup = ({ item, pathDirect, onClick }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleClick = () => {
    setOpen(!open);
  };
  const Icon = item.icon;
  const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  const ListItemButtonStyled = styled(ListItemButton)(() => ({
    whiteSpace: 'nowrap',
    marginBottom: '10px',
    padding: '8px 15px',
    borderRadius: '8px',
    color: 'Black',
    paddingLeft: '10px',
    '&:hover': {
      backgroundColor: '#f3a5a7',
      color: 'Grey',
    },
    '&.Mui-selected': {
      color: 'White',
      backgroundColor: '#5a0c0e',
      '&:hover': {
        backgroundColor: '#f3a5a7',
        color: 'Grey',
      },
    },
  }));

  const subMenus = Object.keys(item)
    .filter((key) => key.startsWith('subMenu'))
    .map((subMenuKey, index) => ({
      text: item[subMenuKey],
      link: item[`link${index + 1}`],
    }));

  return (
    <>
      <List disablePadding key={item.id}>
        <ListItemButtonStyled onClick={handleClick}>
          <ListItemText>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ListItemIcon sx={{ minWidth: '36px', p: '3px 0', color: 'inherit' }}>
                {itemIcon}
              </ListItemIcon>
              <div>{item.subheader}</div>
            </Box>
          </ListItemText>
          {subMenus.length ? open ? <ExpandLess /> : <ExpandMore /> : null}
        </ListItemButtonStyled>
      </List>
      {subMenus.length > 0 && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ paddingLeft: '15px' }}>
            {subMenus.map(({ text, link }, idx) => (
              <ListItemButtonStyled
                key={idx}
                component={item.external ? 'a' : NavLink}
                to={item.external ? undefined : link}
                href={item.external ? link : undefined}
                disabled={item.disabled}
                selected={pathDirect === link}
                target={item.external ? '_blank' : ''}
                onClick={onClick}
              >
                <ListItemText primary={text} />
              </ListItemButtonStyled>
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

NavGroup.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.elementType.isRequired,
    subheader: PropTypes.string.isRequired,
    subMenu1: PropTypes.string,
    subMenu2: PropTypes.string,
    subMenu3: PropTypes.string,
    link1: PropTypes.string,
    link2: PropTypes.string,
    link3: PropTypes.string,
    external: PropTypes.bool,
    disabled: PropTypes.bool,
  }).isRequired,
  pathDirect: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavGroup;
