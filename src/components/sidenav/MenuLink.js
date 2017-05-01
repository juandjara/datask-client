import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';

const MenuLink = ({to, icon, text, ...rest}) => {
  return (
    <Link to={to} activeClassName="sidenav-link-active" {...rest}>
      <MenuItem
        icon={icon}
        caption={text}
        className="sidenav-link" />
    </Link>
  );
};

export default MenuLink;
