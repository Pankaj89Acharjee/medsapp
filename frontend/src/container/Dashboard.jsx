import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import {Navbar, CreateDashboard, DashboardDetails, Feed, Search} from '../components/index'


const Dashboard = ({user}) => {
  const [searchingfor, setSearchingfor] = useState('') /*This is implementing here and not in the Search Component itself though this functionality is of Search component originally,
  bcz we all other compponents can access this functionality within their own, means other components could also have access to the search functionality*/


  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchingfor={searchingfor} setSearchingfor={setSearchingfor} user={user && user} /*All values Sending as Props*//>
      </div>

      <div className='h-full' /*Integrating with Navbar*/>
        <Routes>
          <Route exact path ="/" element = {<Feed />} />
          <Route path="/category/:categoryId" element = {<Feed />} />
          <Route path="/dashboard-details/:dashboardId" element = {<DashboardDetails user={user && user} />} /*Passing user from Home to Dashboard as props and from Dashboard to DashboardDetails*/ />
          <Route path ="/create-dashboard" element = {<CreateDashboard user={user && user}/>} />          
          <Route path="/search" element = {<Search searchingfor={searchingfor} setSearchingfor={setSearchingfor} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;