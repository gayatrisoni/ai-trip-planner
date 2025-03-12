import React, { useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { FcGlobe } from "react-icons/fc";
import { BsSuitcaseFill } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios'



const Header = () => {

  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // console.log(user)
  }, [])

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>GetUserProfile(codeResp),
    onError:(error) => console.log(error)
  })

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
      window.location.reload;
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <a href="/" className="text-black">
        <div className='flex items-center'>
          <BsSuitcaseFill className='w-9 h-9 text-black ' />
          <h2 className='font-bold text-3xl text-black'>TripBuddy AI</h2>
        </div>
      </a>
      <div>
        {user ?
          <div className='flex items-center gap-3'>
             <a href='/create-trip'><Button variant='outline' className='rounded-full bg-gray-100 text-black'>+ Create Trip</Button></a>
            <a href='/my-trips'><Button variant='outline' className='rounded-full bg-gray-100 text-black'>My Trips</Button></a>
            <Popover>
              <PopoverTrigger>
                <img src={user?.picture} className='rounded-full   w-[35px] h-[35px]'/>
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={()=> {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();

                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
          :
          <Button onClick={()=>setOpenDialog(true)} >Sign In </Button>
        }
        </div>
            <Dialog open={openDialog}>
        
        <DialogContent>
          <DialogHeader>
              <div className='flex items-center'>
                <BsSuitcaseFill className='w-9 h-9 ' />
                <h2 className='font-semibold text-3xl text-gray-800'>TripBuddy AI</h2>
              </div>
            <DialogDescription>
              <h2 className='font-bold text-lg mt-7 text-gray-700'>Sign In With Google</h2>
              <p className='text-gray-600'>Sign in to the app with Google authentication securely</p>
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

export default Header
