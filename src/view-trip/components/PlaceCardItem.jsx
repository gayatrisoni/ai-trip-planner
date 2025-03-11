
import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

import { Link } from "react-router";


const PlaceCardItem = ({place}) => {

    const [photo, setPhoto] = useState('');

  useEffect (() => {
    place&&GetPlacePhoto();
  },[place])

  useEffect(() => {
    // console.log("Updated photoUrl:", photo);
  }, [photo]);

  const GetPlacePhoto = async() => {
    console.log(place.placeName);
    const data = {
      textQuery: place?.placeName,
      
    }
    const result = await GetPlaceDetails(data).then(resp=>{
      console.log(resp.data.places[0].photos[3].name)
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[2].name );
      // console.log('image',PhotoUrl)
      setPhoto(PhotoUrl)
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+ place.placeName } target='_blank'>
        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer '>
            <img src={photo?photo : '/placeholder.jpeg'} className='w-[130px] h-[130px] object-cover rounded-xl'/>
            <div>
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-sm text-gray-600'>{place.placeDetails}</p>
                <h2 className='mt-2'>🕙 {place.timeToTravel}</h2>
                
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem
