import React from "react";
import { slide as Menu } from "react-burger-menu";
import './mobileheader.css';
import { Link } from 'react-router-dom';

class MobileHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menuOpen: false
    }
  }

  // This keeps your state in sync with the opening/closing of the menu
  // via the default means, e.g. clicking the X, pressing the ESC key etc.
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }
  
  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState(state => ({menuOpen: !state.menuOpen}))
  }
  render() {

  return (
      <div className="MobileHeader">
        <nav className="display--flex col-sm-12">
            <div className="mobile-nav__head display--flex background--primary horizontal-align--center vertical-align--center">
              <Link to="/home" className="stc-icon" ><img src={process.env.PUBLIC_URL + '/images/logo.png'} className=" mobile-align nav__logo" alt="stcOfficalLogo" /></Link>
            </div>
        </nav>
        <Menu width={ '20rem' }
        isOpen={this.state.menuOpen}
        onStateChange={(state) => this.handleStateChange(state)}>
          <Link to="/notices" className="menu-item" onClick={() => this.closeMenu()}>
            Notices
          </Link>

          <Link to="/achievements" className="menu-item" onClick={() => this.closeMenu()}>
            Achievements
          </Link>

          <Link to="/projects/all" className="menu-item" onClick={() => this.closeMenu()}>
            Projects
          </Link>

          <Link to="/calendar" className="menu-item" onClick={() => this.closeMenu()}>
            Event Calendar
          </Link>

          <Link to="/groups/all/" className="menu-item" onClick={() => this.closeMenu()}>
            Groups
          </Link>

          <Link to="/equipments" className="menu-item" onClick={() => this.closeMenu()}>
            Equipments
          </Link>

          <Link to= "/admin/home" className="menu-item" onClick={() => this.closeMenu()}  >
            Admin Only
          </Link>
        </Menu>
      </div>  
  );
}
}
export default MobileHeader;