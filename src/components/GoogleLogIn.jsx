'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { clientAuth } from '@/lib/client-auth'
import { Spinner } from './ui/spinner'

function GoogleLogIn() {

    const [loading ,setloding]=useState(false)
    const handleLogin =async()=>{
        setloding(true)
        await clientAuth.signIn.social({
            provider:'google',
            callbackURL:'/'
        })
        setloding(false)
    }
  return (
    <>
      <Button disabled={loading} onClick={handleLogin}>
        {loading?(<><Spinner/>Login...</>):'Login'}
      </Button>
    </>
  )
}

export default GoogleLogIn
