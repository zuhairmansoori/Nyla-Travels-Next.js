import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function page() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log('session',session);
    if(session.user.role !== 'admin'){
        notFound()
    }
    
  return (
    <div>
      <Link href={'/admin/visa'} ><Button>Visa</Button></Link>
       <Link href={'/admin/cars'} ><Button>Car</Button></Link>
        <Link href={'/admin/activity'} ><Button>Activity</Button></Link>
    </div>
  )
}

export default page
