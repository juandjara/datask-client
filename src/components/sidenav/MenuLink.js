import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import { toggleSidenavOpen } from '../../reducers/sidenav.reducer'
import { connect } from 'react-redux'

const MenuLink = ({to, icon, text, toggleSidenavOpen, onClick, ...rest}) => {
  const clickHandler = (ev) => {
    toggleSidenavOpen()
    if (typeof onClick === 'function') {
      onClick(ev)
    }
  }
  return (
    <Link to={to} onClick={clickHandler} activeClassName="sidenav-link-active" {...rest}>
      <MenuItem
        icon={icon}
        caption={text}
        className="sidenav-link" />
    </Link>
  );
};

export default connect(() => ({}), {toggleSidenavOpen})(MenuLink);
