import React, { useState, useEffect } from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams, useNavigate } from 'react-router-dom'
import { GoogleLogout } from 'react-google-login'

import { userCreatedDashboardQuery, userSavedDashboardQuery, userQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage = 'https://source.unsplash.com/1600x900?nature,photography,technology' /*For getting random images for user banner*/

const activeButtonStyles = 'bg-red-400 text-white font-bold p-2 rounded-full w-20 outline-none mt-10'
const notActiveButtonStyles = 'mr-4 text-black font-bold p-2 rounded-full w-20 outline-none mt-6 ml-3'
const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [text, setText] = useState('Created')
  const [activeButton, setActiveButton] = useState('created')

  const navigate = useNavigate();
  const { userId } = useParams();

 

  useEffect(() => { /*For fetching the users by userId*/
    const query = userQuery(userId);

    client.fetch(query)
      .then((data) => {
        setUser(data[0]);
      })

    return () => {

    }
  }, [userId]) /*For everytime userId is changed, useEffect is goingto work*/


  useEffect(() => { /*For handling saved post and created posts of the specific users*/
    if (text === 'created') {
      const createdDashboardQuery = userCreatedDashboardQuery(userId);

      client.fetch(createdDashboardQuery) /*For creating post in the below JSX buttons*/
        .then((data) => { 
          setDashboard(data);
        })
    } else {
      const savedDashboardQuery = userSavedDashboardQuery(userId);

      client.fetch(savedDashboardQuery) /*For Saving post in the below JSX buttons*/
        .then((data) => {
          setDashboard(data);
        })

    }

    return () => {

    }
  }, [text, userId]) /*payload to text and userId. Whenever either of them changes, useEffect is going to fetch the specific data. text is used to read and store the content-text of the button between 'created' and 'saved' */

  const logout = () => {
      localStorage.clear();
        /*After clearing navigate to loginpage*/
      navigate('/login');
  }


  if (!user) {
    <Spinner message="Loading profile. Pls wait" />
  }

  return (
    <div className='relative pb-2 h-full text-center height-center'>
      UserProfile for user
      <div className='flex flex-col pb-5'>
        <div className='relative flex flex-col mb-7'>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={randomImage}
              className="w-full h-350 2xl:h-510 shadow-2xl object-cover"
              alt="banner"
            />
            <img
              className='rounded-full w-30 h-30 shadow-2xl -mt-12'
              src={user?.image}
              alt="userimg"
            />
            <h1 className='font-bold text-center text-3xl mt-3'>
              {user?.userName}
            </h1>
            <div className='absolute top-0 right-0 p-2 z-1'>
              {userId === user?._id && ( /*If id matches, then he can opt to logout*/
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_KEY}
                  render={(renderProps) => ( /* Call back fx. It returns something as a 
                    call back fx. Button is rendered here with the call back function. "renderProps" comes directly from GoogleLogin package as a library fx*/
                    <button
                      type="button"
                      className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout color="red" fontSize={25} /> 
                    </button>
                  )}
                  onLogoutSuccess={logout} /*Fx logout()*/
                
                  cookiePolicy="single_host_origin"
                />
              )}
            </div>
          </div>

          <div /*for buttons*/ className='text-center mb-7'>
            <button 
              type="button"
              onClick={(e) => {
                setText(e.target.textContent) /*textContent takes content of the button*/
                setActiveButton('created');
              }}
              className={`${activeButton === 'created' ? activeButtonStyles : notActiveButtonStyles}`} /*Dynamic class name*/
            > Created!
            </button>

            <button 
              type="button"
              onClick={(e) => {
                setText(e.target.textContent) /*textContent takes content of the button*/
                setActiveButton('saved');
              }}
              className={`${activeButton === 'saved' ? activeButtonStyles : notActiveButtonStyles}`}
            > Saved
            </button>
          </div>
          
          {dashboard?.length ? (
            <div className='px-3'>
              <MasonryLayout dashboard={dashboard} /*It shows other posts from the user in card view below the buttons */ />
            </div>
            ) : (
              <div> 
                <h3>No Posts from the user</h3>
              </div>
            )
        
          }
          
        </div>
      </div>
    </div>
  )
}

export default UserProfile