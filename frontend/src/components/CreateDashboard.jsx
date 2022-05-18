import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { categories } from '../utils/data';
import { client } from '../client';
import Spinner from './Spinner';

const CreateDashboard = ({ user }) => {
  const [title, setTitle] = useState('');
  const [about, setAbout] = useState('');
  const [loading, setLoading] = useState(false);
  const [destination, setDestination] = useState();
  const [fields, setFields] = useState();
  const [category, setCategory] = useState();
  const [imageAsset, setImageAsset] = useState();
  const [wrongImageType, setWrongImageType] = useState(false);

  const navigate = useNavigate();

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    // uploading asset to sanity
    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
      setWrongImageType(false);
      setLoading(true);
      client.assets
        .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
          /*we need to push the images to the SANITY via uploads method. 
       Upload has 3 parameters, 
       viz: 1.assetType(here it is image), 
       2.body(here we have destructered it and it is e.target.file[0] 
        and 3.options(Here it is used as an object like {
          contentType: type, filename: name}))*/
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log('Upload failed:', error.message);
        });
    } else {
      setLoading(false);
      setWrongImageType(true);
    }
  };

  const saveDashboard = () => {
    if (title && about && destination && imageAsset?._id && category) { /*If title is non-blank, about is non-blank, destination is non blank and image is also non-blanked then save will executed*/
      const doc = { /*We need to all the datas from the below form and put it in here in an object namely doc*/
        _type: 'dashboard', /*As it is in SANITY database*/
        title,
        about,
        destination,
        image: {
          /*Image here is implemented as assest, bxz a lot of images would be stored.*/
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset?._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: 'postedBy',
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate('/');
      });
    } else {
      setFields(true); /*If all the input boxes are not filled with data then else part will execute*/

      setTimeout(
        () => {
          setFields(false);
        },
        2000,
      );
    }
  };
  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      DASHBOARD CREATION
      {fields && ( /*fields value is true when all the input boxes are not filled and save button is triggered*/
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
          You are required to fill all the input fields
        </p>
      )}
      <div className=" flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
        <div className="bg-green-200 p-3 flex flex-0.7 w-full">
          <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && (
              <Spinner />
            )}
            {
              wrongImageType && (
                <p className='text-red-500'>It&apos;s incorrect file type.</p>
              )
            }
            {!imageAsset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Upload Meds Image</p>
                  </div>

                  <p className="mt-32 text-black-300">
                    Supported formats - JPG, JPEG, SVG, PNG, GIF and TIFF within 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full"> 
                <img /*When there is an image uploaded, then the imageAsset hook contains the value and its value is true. So we render codes for when imageAsset is true*/
                  src={imageAsset?.url} /*When an image was uploaded, we need to show preview*/
                  alt="uploaded-pic"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                  onClick={() => setImageAsset(null)}
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div /*form*/ className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Name of the medicine"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && ( /*Showing authenticated user*/
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
              <img
                src={user.image}
                className="w-15 h-15 rounded-full"
                alt="userphoto"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Pls write detailed composition of medicine"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
          />
          <input
            type="url"
            vlaue={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Give link to your medicine image"
            className="outline-none text-base sm:text-lg border-b-2 border-gray-200 p-2"
            required
          />

          <div /*for category*/className="flex flex-col">
            <div>
              <p className="mb-2 font-semibold text:lg sm:text-xl">Select your category</p>
              <select
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
              >
                <option /*default option*/ value="others" className="sm:text-bg bg-white">Select Category</option>

                 {/*Now we need to map all the categories form the categories*/}


                {categories.map((item) => (
                  <option className="text-base border-0 outline-none capitalize bg-white text-black " value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div /*for save button*/ className="flex justify-end items-end mt-5">
              <button
                type="button"
                onClick={saveDashboard}
                className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
              >
                Save Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDashboard;
