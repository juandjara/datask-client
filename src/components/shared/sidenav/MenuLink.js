import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'react-toolbox/lib/menu/MenuItem';
import { connect } from 'react-redux'
import {toggleSidenavOpen} from 'reducers/sidenav.reducer'

const MenuLink = ({
  to, 
  icon, 
  text, 
  responsive,
  toggleSidenavOpen,
  onClick = () => {}, 
  ...otherProps
}) => {
  const clickHandler = (ev) => {
    if(responsive.small) {
      toggleSidenavOpen()    
    }
    onClick(ev)
  }
  return (
    <Link to={to} onClick={clickHandler} 
          activeClassName="sidenav-link-active" {...otherProps}>
      <MenuItem
        icon={icon}
        caption={text}
        className="sidenav-link" />
    </Link>
  );
};

const mapStateToProps = state => ({
  responsive: state.responsive
})
const actions = {toggleSidenavOpen}
export default connect(mapStateToProps, actions)(MenuLink);
