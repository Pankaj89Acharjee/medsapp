import React, {useState, useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import Spinner from './Spinner'

const Search = ({searchingfor}) => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect (() => {
    if(searchingfor) {
      setLoading(true)
      const query = searchQuery(searchingfor.toLowerCase());

      client.fetch(query)
        .then((data) => {
          setDashboard(data);
          setLoading(false);
        })
      
    } else {
      client.fetch(feedQuery)
        .then((data) => {
          setDashboard(data);
          setLoading(false);
        })
    }
  }, [searchingfor])

  return (

    
    <div>
      {loading && <Spinner message="Searching..." />}

      {dashboard?.length !== 0 && <MasonryLayout dashboard={dashboard}/>}
      {dashboard?.length === 0 && searchingfor !== '' && !loading && 
        <div className='mt-10 text-center text-xl text-red-500'>
          <h3>No data in the dashboard found!</h3>
        </div>
      }
      {dashboard?.length !==0 && 
        <div className='p-2 font-semibold text-xl text-green-500 '>
          Found items: {dashboard?.length}
        </div>}
      
    </div>
  )
}

export default Search