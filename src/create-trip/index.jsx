import React, {useState, useEffect} from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '.././components/ui/input'
import { Button } from '.././components/ui/button'
import { AI_PROMPT, selectedBudgetOptions, selectedTravelersList } from '.././constants/options';
import { toast } from "sonner";
import { chatSession } from '@/service/AIModal';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/service/firebase.config';
import {useNavigate} from 'react-router-dom';
import { BsSuitcaseFill } from 'react-icons/bs';



const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData ({
      ...formData,
      [name]: value
    })
  }

  useEffect (() => {
    // console.log(formData)
  }, [formData])

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    // onError:(error) => console.log(error)
  })

  const onGenerateTrip = async() => {

    const user = localStorage.getItem('user');
    if(!user) {
      setOpenDialog(true)
      return ;
    }
    if ( formData.noOfDays <= 0 || formData.noOfDays > 7) {
      toast('Number of days should be between 1 and 7');
      return;
    }

    if (!formData?.noOfDays || !formData?.location || !formData?.budget || !formData?.traveler) {
      toast('Please select all the fields');
      return;
    }
    // if(formData?.noOfDays>5 && !formData?.location || !formData?.budget || !formData?.traveler)
    // {
    //   toast('Please select all the fields');
    //   return ;
    // }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{totalDays}', formData?.noOfDays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noOfDays)

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT)

    // console.log(result?.response?.text());
    setLoading(false);
    SaveAiTrip(result?.response?.text())
  }

  const SaveAiTrip=async(TripData)=> {

    setLoading(true);
    const user=JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "AITrips", docId), {
      userSelection:formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id:docId
    });
    setLoading(false);
    navigate('/view-trip/'+docId)
  }

  const GetUserProfile=(tokenInfo)=> {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    }).then((resp)=> {
      // console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data))
      setOpenDialog(false);
      onGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg-px-56 xl:px-10 px-5 mt-10 py-3'>
      <h2 className='font-bold text-3xl'>Plan your perfect trip! ✈️🌍</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just answer a few quick questions, and we’ll generate a travel plan that matches your style.</p>
      <div className='mt-10 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {setPlace(v); handleInputChange('location', v)},
              styles: {
                control: (provided) => ({
                  ...provided,
                  backgroundColor: '#F3F4F6', // Set the background color to gray
                }),
              },
            }}
          />
        </div>
      <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip? </h2>
          <Input placeholder={'Ex.3'} type="number" className='bg-gray-100'
            onChange = {(e) => handleInputChange('noOfDays', e.target.value)}
          /> 
        </div>
        <div >
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5' >
            {selectedBudgetOptions.map((item, index) => (
              <div key={index} 
                onClick={() => handleInputChange('budget', item.title)}
                className={` flex  flex-col p-4 border rounded-full bg-gray-100 items-center cursor-pointer hover:shadow-lg
                 ${formData?.budget == item.title&&'shadow-lg border-black'}
                `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div >
          <h2 className='text-xl my-3 font-medium'>Who’s your travel buddy for your next trip?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5' >
            {selectedTravelersList.map((item, index) => (
              <div key={index} 
                onClick={() => handleInputChange('traveler', item.people)}
                className={`flex flex-col py-6 px-8 border rounded-full bg-gray-100 items-center justify-center  cursor-pointer hover:shadow-lg
                ${formData?.traveler == item.people&&'shadow-lg border-black'}
               `}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-end my-10'>
        <Button 
          disabled={loading}
          onClick={onGenerateTrip}>
          {loading? 
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />: ' Generate Trip'
          }
         </Button>
      </div>

      <Dialog open={openDialog}>
        
        <DialogContent>
          <DialogHeader>
            
            <DialogDescription>
              <div className='flex'>
                <BsSuitcaseFill className='w-9 h-9 text-black ' />
                <h2 className='font-semibold text-3xl text-black'>TripBuddy AI</h2>
              </div>
              <h2 className='font-bold text-lg mt-7 text-gray-700 '>Sign In With Google</h2>
              <p className='text-gray-500'>Sign in to the app with Google authentication securely</p>
              <Button 
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center">
                <FcGoogle className='h-8 w-8' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    
    
    </div>
  )
}

export default CreateTrip
