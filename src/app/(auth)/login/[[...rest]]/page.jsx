"use client";
import { SignIn } from '@clerk/nextjs'
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function page() {
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');  
  const postSignInUrl = redirectPath ? redirectPath : '/';
  return (
    <div className='flex justify-center items-center'>
     
          <SignIn afterSignInUrl={postSignInUrl}   />

    </div>
  )
}
