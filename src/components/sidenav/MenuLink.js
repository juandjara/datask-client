import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import { connect } from 'react-redux'
import { reducer as sidenav } from '../../components/sidenav'

const MenuLink = ({
  to, icon, text, toggleSidenavOpen, onClick = () => {}, ...rest
}) => {
  const clickHandler = (ev) => {
    toggleSidenavOpen()
    onClick(ev)
  }
  return (
    <Link to={to} onClick={clickHandler} 
          activeClassName="sidenav-link-active" {...rest}>
      <MenuItem
        icon={icon}
        caption={text}
        className="sidenav-link" />
    </Link>
  );
};

const actions = {
  toggleSidenav: sidenav.toggleSidenavOpen
}
export default connect(() => ({}), actions)(MenuLink);
