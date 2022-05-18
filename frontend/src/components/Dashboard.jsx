import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { MdDownloadForOffline } from 'react-icons/md'
import { AiTwotoneDelete } from 'react-icons/ai'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'

import  {urlFor, client}  from '../client'
import { fetchUser } from '../utils/fetchUser'

const Dashboard = ({ dashboard}) => {
    const {postedBy, image, _id, destination, medicineName, save} = dashboard /*dashboard props is transferred here from MasonryLauout.jsx and in MasonryLayout.jsx, 'dashboard' is passed from the feed.jsx*/
    
    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false)
    const navigate = useNavigate()
    const user = fetchUser()
    console.log(`The message is from dashboard image ${image}`)
    console.log(`The id  is from dashboard ${_id}`)
    
    let alreadySaved = dashboard?.save?.filter((item) => item.postedBy?._id === user?.googleId).length; /*User saved the picture as we are loop over "save" post in the SANITY*/
    /*Turning alreadySaved variable into boolean variable by !! */
    alreadySaved = alreadySaved?.length > 0 ? alreadySaved : [];

    const saveDashboard = (id) => { /* For Saving*/
        if(alreadySaved?.length === 0) { /*Means if there is no save occured till now*/
            setSavingPost(true);
            client
                .patch(id)
                .setIfMissing({ save: []})
                .insert('after', 'save[-1]', [{ /* -1 means at the end. That is insert at the end*/
                    _key: uuidv4(), /*Generates unique ID*/
                    userId: user?.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user?.googleId
                    },
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                    setSavingPost(false);
                });
        }
    };

    const deleteDashboard = (id) => { /*Deleting post*/
        client
        .delete(id)
        .then(() => {
            window.location.reload()
        });
    };

    


    return (
        <div className='m-2'>
            <div /*This is card hover properties in home dashboard*/
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/dashboard-details/${_id}`)}
                className="relative cursor-zoom-in w-full hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
            >
                {image && (
                    <img className="rounded-lg w-full" alt="user's post" src={(urlFor(image).width(250).url())} />

                )}

                {postHovered && (
                    <div /*Card styles*/
                        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
                        style={{ height: '100%' }}
                    >
                        <div className='flex items-center justify-between'>
                            <div className='flex gap-2'>
                                <a
                                    href={`${image?.asset?.url}?dl=`} /*Download a specific image*/
                                    download
                                    onClick={(e) => {e.stopPropagation() }}
                                    className="bg-white w-9 h-9 rounded-full flex items-center text-dark tex-xl justify-center opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <MdDownloadForOffline /*For downloading image*//>
                                </a>
                            </div>

                            {alreadySaved?.length !== 0 ? ( /*Means the user has saved the specific post*/
                                <button type='button' className='bg-red-400 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'/*If length!==0, then user has not saved picture*/> 
                                  {dashboard?.save?.length}Saved
                                </button>
                            ) : (
                                <button 
                                onClick={(e => {
                                    e.stopPropagation();
                                    saveDashboard(_id);
                                }
                                )}
                                type='button' 
                                className='bg-red-400 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'/*If length!==0, then user has not saved picture*/> 
                                    {dashboard?.save?.length} {savingPost ? 'Saving' : 'Save'}
                                </button>
                            )}
                        </div>

                        <div className='flex justify-between items-center gap-2 w-full'>
                                {destination?.slice(8).length > 0 ?(
                                    <a 
                                        href={destination}
                                        target="_blank"
                                        rel="noreferrer"
                                        className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:100 hover:shadow-md'
                                    >
                                        {' '}
                                        <BsFillArrowUpRightCircleFill />
                                        {destination.slice(8, 20)}...
                                    </a>
                                ) : undefined }

                                {postedBy?._id === user?.googleId && (
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteDashboard(_id);
                                        }}
                                        className='bg-white p-2 opacity-70 hover:opacity-100 text-black font-bold  text-base rounded-3xl hover:shadow-md outline-none'/*If length!==0, then user has not saved picture*/
                                            
                                    >
                                        <AiTwotoneDelete />
                                    </button>
                                )}
                        </div>
                    </div>
                )}
            </div>
            
            <Link to={`user-profile/${postedBy?._id}`} className="flex gap-2 items-center mt-2">
                <img /*To show name and image of the post owner*/
                    className='w-8 h-8 rounded-full object-cover'
                    src = {postedBy?.image}
                    alt="posted by"
                />
                <p className='font-semibold capitalize'>
                    {postedBy?.userName}
                </p>
            </Link>


            
        </div>
    )
}

export default Dashboard