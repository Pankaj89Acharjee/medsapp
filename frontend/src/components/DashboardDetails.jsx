import React, { useState, useEffect } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid' /*Popular library for creating ids*/

import { client, urlFor } from '../client'
import MasonryLayout from './MasonryLayout'
import { dashboardDetailMoreDashboardQuery, dashboardDetailQuery } from '../utils/data'
import Spinner from './Spinner'

const DashboardDetails = ({ user }) => {
  const [dashboard, setDashboard] = useState();
  const [dashboardDetail, setDashboardDetail] = useState(null);
  const [comment, setComment] = useState('')
  const [isAddingComment, setIsAddingComment] = useState(false);

  /*We need Id from the URL ( it can be found when we click on some cards).
  We can access that ID from the URL by useParams from the react router DOM.*/
  const { dashboardId } = useParams(); /*this fetches id from the url. 
  It's route is implemented in Dashboard.js in container folder. There
  dahboardId is used as a dynamic parameter like :dashboardID. So useParams 
  is used here to fetch that dynamic parameter*/

  const addComment = () => {
    if (comment) {
      setIsAddingComment(true); /*Activating Click save button*/
      client
        .patch(dashboardId) /*For saving comment data*/
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ /* -1 means at the last position of the comments array in sanity dashboard-*/
          comment,
          _key: uuidv4(), /*setting uniqueId to each comments*/
          postedBy: {
            _type: 'postedBy',
            _ref: user._id
          }
        }])
        .commit() /*to inset item in SANITY, we need to use .commit() to save*/
        .then(() => {
          fetchDashboardDetails(); /*A call back fx, used to store new comments into SANITY. */
          setComment(''); /*After saving the data, reset comment[] array*/
          setIsAddingComment(false);
        })
    }
  }

  const fetchDashboardDetails = () => { /*We need to call this callback fx in useEffect*/
    let query = dashboardDetailQuery(dashboardId);

    if (query) {
      client.fetch(query)
        .then((data) => {
          setDashboardDetail(data[0]); /*An array of details is returned*/

          if (data[0]) {
            query = dashboardDetailMoreDashboardQuery(data[0]); /*Here data[0] is passed instead of dashboardId bcz, 
            in the above promise we have already received the some basic 
            details in the setDashboardDetail => data[0]*/
            client.fetch(query)
              .then((response) => setDashboard(response));

          }
        })
    }

  }

  useEffect(() => {
    /*Using fetchDashboardDetails(), a call back  fx after fetching has been, it this useEffect will update the value to SANITY*/
    fetchDashboardDetails();
  }, [dashboardId])

  if (!dashboardDetail) { /*if statement cannot be placed above  the useEffect()*/
    return <Spinner message="Loading data..." />

  }


  return (
    <>
      <div className='flex xl:flex-row flex-col m-auto bg-white' style={{ maxwidth: '150px', borderRadius: '32px' }}>

        <div /*for image*/ className='flex justify-center items-center md:items-start flex-initial '>
          <img src={dashboardDetail?.image && urlFor(dashboardDetail.image).url()}
            className="rounded-t-3xl rounded-b-xl"
            alt="user-photo"
          />
        </div>

        <div /*Extra space beside image*/ className='w-full p-5 flex-1 xl:min-w-600'>
          <div className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
              <a
                href={`${dashboardDetail?.asset?.url}?dl=`} /*Download a specific image*/
                download
                onClick={(e) => { e.stopPropagation() }}
                className="bg-red-100 w-12 h-12 rounded-full flex items-center text-dark tex-xl justify-center opacity-75 hover:opacity-100 hover:shadow-md outline-none"
              >
                <MdDownloadForOffline className='w-7 h-7'/*For downloading image*/ />
              </a>
            </div>

            {
              dashboardDetail.destination.slice(8) > 0 ? (
                <a /*getting destination/link of image*/

                  href={dashboardDetail.destination} target="_blank" rel="noreferrer">
                  Visit: {dashboardDetail.destination}
                </a>
              ) : (
                <div>
                  <a /*getting destination/link of image*/

                    href={dashboardDetail.destination} target="_blank" rel="noreferrer">
                    Visit: {dashboardDetail.destination.slice(0, 35)}...
                  </a>
                </div>
              )
            }

          </div>

          <div>
            <h1 className='text-4xl font-bold break-words mt-3 text-red-600'>
              {dashboardDetail.title}
            </h1>

            <p className='mt-3 font-semibold text-xl text-blue-500'>
             Composition:  <br/>{dashboardDetail.about}
            </p>
          </div>

          <Link to={`user-profile/${dashboardDetail.postedBy?._id}`} className="flex gap-4 items-center mt-4 bg-white rounded-lg">
            <img /*To show name and image of the post owner*/
              className='w-12 h-12 rounded-full object-cover'
              src={dashboardDetail.postedBy?.image}
              alt="posted by"
            />
            <p className='font-semibold capitalize'>
              {dashboardDetail.postedBy?.userName}
            </p>
          </Link>

          <h2 className='mt-5 text-2xl'>Write dosage details about meds</h2>
          <div /*container for comments*/ className='max-h-370 overflow-y-auto'>
            {dashboardDetail?.comments?.map((item, i) => ( /*comments comes from SANITY dashboard*/
              <div className='flex gap-2 items-center mt-5 rounded-lg bg-white' key={i}>
                <img
                  src={item.postedBy?.image} /*Show image who commented*/
                  alt="profilepic"
                  className='w-10 h-10 rounded-full cursor-pointer'
                />

                <div className='flex flex-col'>
                  <p className='font-bold text-green-400'>
                    {item.postedBy?.userName /*Showing userName of the one who commented*/}
                  </p>
                  <p>
                    {item.comment /*Showing what was commented*/}
                  </p>

                </div>
              </div>

            ))}
          </div>

          <div className='flex flex-wrap mt-6 gap-5' /*Writing Comment Section*/>
            <Link to={`user-profile/${dashboardDetail.postedBy?._id}`} >
              <img /*To show name and image of the post owner*/
                className='w-12 h-12 rounded-full cursor-pointer'
                src={dashboardDetail.postedBy?.image}
                alt="posted by"

              />
            </Link>

            <input
              className='flex-1 border-blue-300 border-2 p-2 rounded-2xl focus:border-green-200 h-20'
              type="text"
              placeholder='Write dosage details'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button
              className='bg-red-400 rounded-full p text-white px-6 py-2 font-semibold text-base hover:opacity-100 hover:shadow-xl hover:bg-red-600'
              type='button'
              onClick={addComment}
            >
              {isAddingComment ? 'Data is being saved' : 'Click to Save'}

            </button>
          </div>
        </div>
      </div>
      {dashboard?.length > 0 && (
        <h2 className='text-center font-bold text-2xl mt-8 mb-4 text-green-500'>Similar Meds from you!</h2>
      )}

      {dashboard ? ( /*Shows other posts in same category*/
        <MasonryLayout dashboard={dashboard} /> /*Sending props to MasonryLayout as dashboard that contains all the cards as a posts*/
      ) : (
        <Spinner message='Loading more from dashboards' /*if nothing there is in the dashboard*/ />
      )

      }
    </>
  );
};

export default DashboardDetails