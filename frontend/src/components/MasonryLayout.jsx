import React from 'react'
import Masonry from 'react-masonry-css'
import Dashboard from './Dashboard'


const breakpointColumnsObj = { /*For different screens, number of cards to be displayed*/
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
}
const MasonryLayout = ({dashboard}) => { /*Inner Display of cards is contolled by this component. dashboard as a props is passed from FEED.js*/
  return (
    <Masonry className='flex animate-slide-fwd' breakpointCols = {breakpointColumnsObj}>
        {dashboard?.map((dashboard) => <Dashboard key={dashboard._id} dashboard={dashboard && dashboard} className="w-max"/>)
          
        } 
    </Masonry>
    
  )
  
}


export default MasonryLayout