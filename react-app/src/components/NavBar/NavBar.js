
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import './NavBar.css'
import { BsChevronDown, BsFileEarmarkPlus, BsCollection } from 'react-icons/bs'
import { VscHome } from 'react-icons/vsc'
import BrowseDropDown from '../DropDown/BrowseDropDown';

import { allCategories } from '../../store/category';

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const categories = Object.values(useSelector(state => state.categories))
  const [dropDown, setDropDown] = useState(false)

  useEffect(() => {
    dispatch(allCategories())
  }, [dispatch])

  return (
    <div className='nav_bar'>
      <nav>
        <ul className='nav_bar_ul'>
          <li className='li-block'>
            <div className='li_containers'>
              <NavLink to='/home' exact={true} activeClassName='active'>
                HOME
              <VscHome className='down_arrow_chevron icon' />
              </NavLink>
            </div>
          </li>
          <li className='li-block'>
            <div className='li_containers'>
              <NavLink to={`/browse/all`} exact={true} className='browser_hover_block' activeClassName='active' onMouseEnter={() => setDropDown(true)}
                onMouseLeave={() => setDropDown(false)}>
                BROWSE RECIPES
              <BsChevronDown className='down_arrow_chevron icon' />
              </NavLink>
              {dropDown &&
                <ul className='browse_drop_down' onMouseEnter={() => setDropDown(true)}
                  onMouseLeave={() => setDropDown(false)} >
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/all`}>
                      All Recipes
                    </NavLink>

                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/breakfast`}>
                      Breakfast
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/lunch`}>
                      Lunch
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/dinner`}>
                      Dinner
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/dessert`}>
                      Dessert
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/drinks`}>
                      Drinks
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/snacks&apps`}>
                      Snacks & Appetizers
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/holiday&seasonal`}>
                      Holiday & Seasonal
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/vegan`}>
                      Vegan
                    </NavLink>
                  </li>
                  <li className='category_select_li'>
                    <NavLink className='category_select_link drop_down_li' onClick={() => setDropDown(false)} to={`/browse/vegetarian`}>
                      Vegetarian
                    </NavLink>
                  </li>
                </ul>
              }
            </div>
          </li>
          {sessionUser ? <li className='li-block'>
            <div className='li_containers'>
              <NavLink to='/saved-recipes' exact={true} activeClassName='active'>
                SAVED RECIPES
              <BsCollection className='icon'/>
              </NavLink>
            </div>
          </li> : null}
          {sessionUser ? <li className='li-block'>
            <div className='li_containers add_recipe'>
              <NavLink to='/recipes/new' exact={true} activeClassName='active'>
                ADD A RECIPE
              <BsFileEarmarkPlus className='icon'/>
              </NavLink>
            </div>
          </li> : null}
          {!sessionUser ?
            <li className='li-block' >
              <div className='li_containers'>
                <NavLink to='/login' exact={true} activeClassName='active'>
                  LOGIN
                </NavLink>
                <BsChevronDown className='icon'/>
              </div>
            </li> : null
          }
          {!sessionUser ?
            <li className='li-block' >
              <div className='li_containers'>
                <NavLink to='/sign-up' exact={true} activeClassName='active'>
                  SIGN UP
                </NavLink>
                <BsChevronDown className='icon'/>
              </div>
            </li> : null
          }
          {sessionUser &&
            <li className='li-block' >
              <div className='li_containers'>
                <LogoutButton />
              </div>
            </li>
          }
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
