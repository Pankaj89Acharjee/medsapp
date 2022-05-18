import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'

const Navbar = ({ searchingfor, setSearchingfor, user}) => {

  const navigate = useNavigate();/*useNavigate's was called as REDIRECT in previous version of REACT*/

  if(user) {/*If there is no user*/
  return ( /*All the functionalities in the Search Menu*/
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-medium bg-white border-none outline-none focus-within:shadow-md'>
        <IoMdSearch fontSize={20}  className="ml-1"/>
        <input 
          type = "text"
          onChange={(e) => setSearchingfor(e.target.value)}
          placeholder="Type to search"
          value={searchingfor}
          onFocus={() => navigate('/search')}
          className="p-2 w-full bg-white outline-none"
        />
      </div>

      <div className='flex gap-3'>
        <Link to={`user-profile/${user?._id}`} className="md:block">
          <img src={user.image} alt="user-pic" className='w-12 h-12 rounded-lg'/>
        </Link>

        <Link to = "/create-dashboard" className='bg-black text-white items-center rounded-md width-12 h-12 w-14 md:h-12 flex justify-center '>
          <IoMdAdd /*shows + icon*//>
          
        </Link>
      </div>
    </div>
  )
  }

  return null;
}

export default Navbar