import React from 'react'
import {Link} from 'react-router-dom'
import { Button } from '../../components/ui/button'

const Hero = () => {
  return (
    <div className='flex flex-col items-center mx-56  gap-9  p-10 rounded-lg shadow-md'>
        <h2 className='font-extrabold text-[50px] text-center mt-16'>
            <span className='text-[#f56551]'>Smart Travel Starts Here:</span>  Plan Your Next Adventure with AI
        </h2>
        <p className='text-xl text-gray-500'>Let AI design the ultimate itinerary—tailored to your interests, preferences, and budget. Effortless planning, unforgettable adventures!</p>
        <img src='/landing.png' className='-mt-30'/>
        <Link to={'/create-trip'}>
            <Button> Get Started, It's Free</Button>
        </Link>
        
    </div>
  )
}

export default Hero
