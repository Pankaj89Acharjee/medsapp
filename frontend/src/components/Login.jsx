import React from 'react'
import GoogleLogin from 'react-google-login';
import {useNavigate} from 'react-router-dom';
import { FcGoogle} from 'react-icons/fc'; /*Google Logo*/
import loginVideo from '../assets/video.mp4';
import logo from '../assets/MedsLogo.png';
import {client} from '../client';

const Login = () => {

  const navigate = useNavigate(); /*Hook for useNavigate of DOM*/

  const successLogin = (response) => { /*Arrow fx*/
    /*We need client_Id here., which is mentioned in the GoogleLogin
    functional component. For creating client_Id we need to fetch the
    website console.cloud.google.com and create a new project.
    The project name given by me is MedsApp
    Now selecting the project name from the tab, we need to click on
    navbar icon and there we need to click API and Credentials.
    Afterthat, we need to click on create new credentials and then 
    OuthClientIds
    From here we need API key, so generate it and copy ans paste it
    in the .env file*/
    console.log(response)
    localStorage.setItem('user', JSON.stringify(response.profileObj)); /*user is in the SANITY and in here all the data
    from the web-server is stored in the user variable as a JSON format
    and afterthat it is being srtingify to readable format
    profileObj is the variable that stores array of objects from the Google Login. profileObj can be found after we click on
    inspect option in the Browser*/

    /*Accessing additional data from the login.*/ 
    const {name, googleId, imageUrl} = response.profileObj;
    /*"profileObj" is the Array of data from the console after successful login
    we can see it the console*/

    /*We need the above to store it in the SANITY data base*/
    
    const doc = { /* doc is an object.  All the object names are already
                  specified in the backend schemas under user.js.
                  uderscore type (_type: 'user') is used to know the 
                  SANITY that which specific we are going to use. Here
                  we are using user.js schema from the backend and 
                  here the variable is typed as  _type: user is mentioned.
                  This is done to store the data that is fetched from
                  the Google login into the User schema situated in the
                  backend, more specifically in the SANITY database.*/
      _id: googleId,
      _type: 'user', /*user is the database in SANITY*/
      userName: name,
      image: imageUrl, /*We need to connect with backend SANITY to update datas*/
    }
   
    client.createIfNotExists(doc) /*Creating and saving data means connection string to database*/
      .then(() => {
        navigate('/', { replace: true}) /*if response is true in the above responseGoogle
        constant variable, then the this promise is goint to redirect
        us to the home page of SANITY to create user data at the localhost port*/
      });
  };


  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video 
          src={loginVideo}
          type = "video/mp4"
          loop /*Infinite loop*/
          controls = {false} /*There will be no play buttons, play bar as in media player*/
          muted 
          autoPlay /*Starts automatically on launching*/
          className='w-full h-full object-cover'
        />

        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 ' /*blackOverlay and Proper centering of item*/>
          <div className='p-5' /*for my own logo*/>
            <img src={logo} width="250px" alt="logo" />
          </div>

          <div className='shadow-2xl' /*for google login button shadow*/>
            <GoogleLogin 
              clientId={`${process.env.REACT_APP_GOOGLE_API_KEY}`}
              render = {(renderProps) => ( /* Call back fx. It returns something as a 
              call back fx. Button is rendered here with the call back function. "renderProps" comes directly from GoogleLogin package as a library fx*/
                <button
                  type="button"
                  className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  >  
                  <FcGoogle className = "mr-4" /> Sign-in using google
                </button>
              )}
              onSuccess={successLogin} /*Fx Created in the above as a arrow fx that seeks the user login data from the server after
                                        successful login through the google authentication and store it in the database 
                                        in the schema of user*/
              onFailure={successLogin}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login