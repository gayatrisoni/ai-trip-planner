import { Button } from '@/components/ui/button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { HiShare } from "react-icons/hi";


const InfoSection = ({trip}) => {

  const [photo, setPhoto] = useState('');

  useEffect (() => {
    trip&&GetPlacePhoto();
  },[trip])

  useEffect(() => {
    // console.log("Updated photoUrl:", photo);
  }, [photo]);

  const GetPlacePhoto = async() => {
    const data = {
      textQuery: trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      // console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name );
      // console.log('image',PhotoUrl)
      setPhoto(PhotoUrl)
    })
  }

  return (
    <div >
        <img src={photo?photo : '/placeholder.jpeg'} className='h-[300px]  w-full object-cover rounded-xl '/>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{trip?.userSelection?.location?.label}</h2>
                <div className='flex  gap-5'>
                    <h2 className='p-2 px-3 bg-gray-300 rounded-2xl text-gray-500 text-sm md:text-md'> 📅 {trip?.userSelection?.noOfDays} Day</h2>
                    <h2 className='p-2 px-3 bg-gray-300 rounded-2xl text-gray-500 text-sm md:text-md'> 💰 {trip?.userSelection?.budget}  Budget</h2>
                    <h2 className='p-2 px-3 bg-gray-300 rounded-2xl text-gray-500 text-sm md:text-md'> 🥂 No. Of Traveler:  {trip?.userSelection?.traveler} </h2>
                </div>
            </div>
            <Button><HiShare /></Button>
        </div>
    </div>
  )
}

export default InfoSection
