import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { RiHomeFill } from 'react-icons/ri'
import { ToTOsArrowForward } from 'react-icons/io'
import logo from '../assets/MedsLogo.png'
import { userQuery } from '../utils/data'
import { client } from '../client'
import { categories } from '../utils/data'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-grey-500 hover:text-green transition-all duration-200 ease-in-out uppercase'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-3 border-black transition-all duration-200 ease-in-out uppercase'



const handleCloseSidebar = (closeToggle) => {
  closeToggle(false)
}

const Sidebar = (closeToggle) => { /*user, closeToggle => these are passed in from the Home.jsx from*/

  const [user, setUser] = useState(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear()

  useEffect(() => {
    const query = userQuery(userInfo?.googleId); /*Matching googleId with SANITY Id. SANITY Id is fetched in the above localStorage.getitem statement*/

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })
  }, [])




  const closeSidebarHandle = () => {
    if (closeToggle) closeToggle(false); /*closeToggle exists only in Desktop site in Home.jsx and it is passed there with setToggleSidebar. So
  closeToggle will hold the value and the value is setToggleSideBar value, hence here in this arrow fx
  the if condition statement's value will be true and it will execute. This is for desktop view
  1. We can find that, for only desktop view, we have passed the closeToggle value
  but for mobile view we didn't pass any such value in Home.jsx.
  That's why here we need to set the value of closeToggle to false. Bcz in Home.jsx we have made its
  value to true and if is kept true sidebar will remained open forever and it is true 
  only for mobile viewing and not for other screen sizes*/

  }


  return (
    <div className='flex flex-col h-full bg-white justify-between overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-column'>
        <Link
          to="/"
          className='flex flex-col px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={closeSidebarHandle}
        >
          <img src={logo} alt="logo" className='w-full' />

        </Link>
      </div>
        <div className='flex flex-col gap-6 mb-20'>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}/*Dynamic block of code to check whether active or not, then the link will be activated. isActive is in-built React DOM property*/
            onClick={handleCloseSidebar} /*After clicking on any menu item, we need to close automatically the sidebar. So here handleCloseSidebar is used*/
          >
            <RiHomeFill />
            Home
          </NavLink>


          <h3 className='mt-2 px-5 text-base 2xl:text-xl underline'>Explore Categories</h3>
          {categories.slice(0, categories.length - 1).map((c) => ( /*Loop ends in n-1 trials*/
            <NavLink
              to={`/category/${c.name}`}
              className={({ isActive }) => isActive ? isActiveStyle : isNotActiveStyle}/*Dynamic block of code to check whether active or not, then the link will be activated. isActive is in-built React DOM property*/
              onClick={handleCloseSidebar}
              key={c.name}
            >
              <img src={c.image} alt="ctgry" className='w-12 h-12 p-2 rounded-full shadow-xl bg-blue-100'/>
              {c.name}

            </NavLink>
          ))}
        </div>
      

      {/*If user exists, then render the following Links*/
        user && (
          <Link
            to={`user-profile/${user._id}`}
            className="flex my-5 mb-5 gap-4 p-3 font-bold items-center bg-green-400 rounded-lg shadow-lg mx-3" 
            onClick={handleCloseSidebar}
          >

            <img src={user.image} className="w-10 h-10 rounded-full" alt="userPic" />
            <p>{user.userName}</p>
          </Link>
        )
      }
    </div>
  )
}

export default Sidebar