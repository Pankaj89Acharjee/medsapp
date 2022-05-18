import React from 'react'
import {RotatingSquare} from 'react-loader-spinner'


const Spinner = ({message}) => {
  return (
    <div className='flex flex-col items-center justify-center h-full w-full '>
        
        <RotatingSquare 
            type = "Circles"
            color = "#00BFFF"
            height = {150}
            width = {200}
            className = "m-5"
        />

        <p className='text-lg text-center px-2'>{message}</p>
    </div>

  )
}

export default Spinner