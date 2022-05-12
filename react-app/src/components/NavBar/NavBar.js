
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import { BsChevronDown, BsFileEarmarkPlus } from 'react-icons/bs'

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='nav_bar'>
      <nav>
        <ul className='nav_bar_ul'>
          <li>
            <div className='li_containers'>
              <NavLink to='/home' exact={true} activeClassName='active'>
                HOME
              </NavLink>
              <BsChevronDown className='down_arrow_chevron' />
            </div>
          </li>
          <li>
            <div className='li_containers'>
              <NavLink to='/browse' exact={true} activeClassName='active'>
                BROWSE RECIPES
              </NavLink>
              <BsChevronDown className='down_arrow_chevron' />
            </div>
          </li>
          {sessionUser ? <li>
            <div className='li_containers'>
              <NavLink to='/users' exact={true} activeClassName='active'>
                SAVED RECIPES
              </NavLink>
              <BsChevronDown />
            </div>
          </li> : null}
          {sessionUser ? <li>
            <div className='li_containers add_recipe'>
              <NavLink to='/recipes/new' exact={true} activeClassName='active'>
                ADD A RECIPE
              </NavLink>
              <BsFileEarmarkPlus />
            </div>
          </li> : null}
          {!sessionUser ?
            <li>
              <div className='li_containers'>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  LOGIN
                </NavLink>
                <BsChevronDown />
              </div>
            </li> : null
          }
          {!sessionUser ?
            <li>
              <div className='li_containers'>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  SIGN UP
                </NavLink>
                <BsChevronDown />
              </div>
            </li> : null
          }
          {sessionUser &&
            <li>
              <LogoutButton />
            </li>
          }
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
