import React, { useState, useEffect, useRef } from 'react'
import { HiMenu } from 'react-icons/hi'
import { AiFillCloseCircle } from 'react-icons/ai'
import { userQuery } from '../utils/data'
import { Link, Routes, Route } from 'react-router-dom'
import { client } from '../client'
import Sidebar from '../components/Sidebar'
import logo from '../assets/MedsLogo.png'
import Dashboard from './Dashboard'
import UserProfile from '../components/UserProfile'
import {fetchUser} from '../utils/fetchUser'
import { CreateDashboard } from '../components'

const Home = () => {

  const [toggleSideBar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState();
  const scrollRef = useRef(null);


  const userInfo = fetchUser() /*Getting user Id from the local storage and passing it in the Link 2 below*/
  /*userInfo variable is not as same as the name is in SANITY. In SANITY the field name is "user".
  So there will be an error saying that user is not defined. To overcome the issue, we need to use the 
  variable field named as in SANITY (user). To do that, we need 
  to use useEffect() fx to get it from the SANITY*/

  useEffect(() => { /*DidMount useEffect()*/
    /*Here different data varibles are required. 
    So we create a utils folder and a file namely "data" to 
    store all the data required from SANITY.*/

    const query = userQuery(userInfo?.googleId); /*Matching googleId with SANITY Id. SANITY Id is fetched in the above localStorage.getitem statement*/

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0) /*Scroll to beginning of the page. Vertical=0, Horizonrtal = 0*/
  }, [])

  return (

    <div className='flex bg-gray-50 md:flex-row flex-col h-screen  transaction-height duration-80 ease-out'>
      <div className='hidden md:flex h-screen flex-initial' /*for
        medium devices the mentioned properties is to show sidebars
        on mobile devices. And in on all other devices sidebar is kept hidden*/>
        
        <Sidebar user={user && user} /*Sidebar for mobile view. If user exists, simply pass user, otherwise pass false*/ />
       
      </div>

      <div className='flex md:hidden flex-row' /*md:hidden is used to hide the navbar when 
      the screen size is expanded from mobile view to desktop view*/>

        <div className='flex flex-row p-3 w-full justify-between items-center shadow-xl'/*For mobile navbar*/ >
          <HiMenu className='cursor-pointer' fontSize={30} onClick={() => setToggleSidebar(true)} /*Bars*/ />

          <Link to="/" /*1*/>
            <img src={logo} alt="logo" className='w-24' />
          </Link>


          <Link to={`user-profile/${user?._id}`} /* 2.  API that fetches users from
          the local storage. We need to get that item from the localstorage
          by calling fx in the above. user? is given bcz we dont who the user is
          and we want to match the user in the data base by checking the 
          id number that is stored in the local storage*/>
            <img src={user?.image} alt="profile-img" className='w-24 rounded-full' />
            
          </Link>
        </div>
        {toggleSideBar && ( /*If toggleSidebar is true then show the following JSX*/
          <div className='fixed w-4/5 bg-grey h-screen overflow-y shadow-xl z-10 animate-slide-in' >
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle className='cursor-pointer' fontSize={35} onClick={() => setToggleSidebar(false)} />
            </div>

            <Sidebar user={user && user} closeToggle={setToggleSidebar} /*Desktop Side bar*/ />
          </div>
        )}
      </div>



      <div className='flex-1 pb-2 h-screen overflow-y-scroll' ref={scrollRef}>
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile/>}/>

          <Route path ="/*" element={<Dashboard user={user && user} />} />
          <Route path ="/create-dashboard" element={<CreateDashboard user={user && user} />} />

        </Routes>
      </div>
    </div>
  )
}

export default Home;