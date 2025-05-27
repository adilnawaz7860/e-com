"use client"
import React from 'react'
import ChangePasswordForm from './_components/ChangePasswordForm'

const page = ({searchParams}) => {
    const token = searchParams?.token;
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ChangePasswordForm token={token}/>
    </div>
  )
}

export default page