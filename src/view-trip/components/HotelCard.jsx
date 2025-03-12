import { Link } from "react-router";
import React, { useEffect, useState } from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

const HotelCard = ({hotel}) => {
    const [photo, setPhoto] = useState('');

    useEffect (() => {
      hotel&&GetPlacePhoto();
    },[hotel])

    useEffect(() => {
      // console.log("Updated photoUrl:", photo);
    }, [photo]);

    const GetPlacePhoto = async() => {
      const data = {
        textQuery: hotel?.hotelName
      }
      const result = await GetPlaceDetails(data).then(resp=>{
        // console.log(resp.data.places[0].photos[3].name)
        const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name );
        // console.log('image',PhotoUrl)
        setPhoto(PhotoUrl)
      })
    }
  return (
    <div>
      <Link to={'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
            <div className='hover:scale-110 transition-all cursor-pointer my-1 ' key={hotel}>
                <img src={photo?photo : '/placeholder.jpeg'} className='rounded-lg h-[180px] w-full object-cover'/>
                <div className='my-2 flex flex-col gap-1'>
                    <h2 className='font-bold'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-700'>📍{hotel?.hotelAddress}</h2>
                    <h2 className='font-bold text-sm'>💰 {hotel.price.min}-{hotel.price.max}</h2>
                    <h2 className='font-bold text-sm'>⭐ {hotel.rating} stars</h2>
                </div>
            </div>
            </Link>
    </div>
  )
}

export default HotelCard
