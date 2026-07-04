'use client'
import React from 'react'

function  Icon({Children,Handler}) {
  return (
    <div onClick={Handler}>
       {Children}
    </div>
  )
}

export default  Icon
