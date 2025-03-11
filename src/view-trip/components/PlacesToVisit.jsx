import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({trip}) => {
    
  console.log(trip)

  // Check if trip or its data is undefined before accessing properties
  if (!trip?.tripData?.itinerary) {
    return <p>Loading itinerary...</p>; // Show a loading message while data is not available
  }

  return (
    <div className='mt-2'>
        <h2 className='font-bold text-lg'>Places to Visit</h2>
        <div  className='mt-5' >
          {Object.keys(trip.tripData.itinerary).map((day, index) => (
          <div key={index}  >
            <h3 className="text-xl font-bold my-3">{day.toUpperCase()}</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
              {trip.tripData.itinerary[day].map((place, i) => (
                <div key={i}>
                  <h2 className='font-medium text-lg'> {place.bestTime || "Anytime"}</h2>
                  <div>
                    <PlaceCardItem place={place} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        
      </div>
      
    </div>
  )
}

export default PlacesToVisit
