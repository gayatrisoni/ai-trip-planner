import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router";


const UserTripCardItem = ({trip}) => {
    const [photo, setPhoto] = useState('');

    useEffect (() => {
        // console.log("trip Informartion:", trip)
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
    <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all hover:shadow-md'>
            <img src={photo || "/placeholder.jpeg"} className='h-[220px] object-cover rounded-xl'/>
            <div>
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                <h2 className='text-sm text-gray-700'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
            </div>
        
        </div>
    </Link>
  )
}

export default UserTripCardItem
