/*This component used as a connection establishment with backend to the frontend*/
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom' /*By this we can see the URL, what is passing in the URL. In this project, we will find different categories name in the URL. useParams is used to identify that things*/
import {client} from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setloading] = useState(false);
  const [dashboard, setDashboard] = useState(null)
  const {categoryId} = useParams(); /* useParams Searches the URL for specific category*/


  useEffect(() => { /*useEffect must be used before the return statement*/
    
    if(categoryId) { /*If specific category is searched*/
      setloading(true);
      const query = searchQuery(categoryId); /*searchCategory fx need to be created in utils.js >> data.js*/
      
      client.fetch(query)
        .then((data) => {
          setDashboard(data);
          setloading(false);
        });

    } else { /*If no specific category is searched and it is in Home Page, we need to show all the categories*/
      setloading(true)
        client.fetch(feedQuery)         
          .then((data) => {
            setDashboard(data);
            setloading(false);
          });
    }
  }, [categoryId]); /*Everytime the categoryID is changed, the useEffect is executed*/
  
  if(loading) {
    return (<Spinner message="New item is being added, please wait a moment!"/*message is passed as a props in the Spinner component*//>
    )
  }

  if(!dashboard?.length > 0) return <h2 className='bg-red-500 text-white text-center font-bold'>No posts in this category yet!</h2>
    
  return (
    <div>{dashboard &&
          <MasonryLayout dashboard={dashboard && dashboard}/>}</div>
  )
}

export default Feed