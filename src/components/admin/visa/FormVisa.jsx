'use client'
import React from 'react'
import {visaImage} from '@/Action/visa'


function FormVisa() {
    async function handleSubmit(formdata){
        const result = await visaImage(formdata)
        if (result.success){
            alert(result.message)
        } else {
            alert(result.message)
        }
    }

  return (
    <div>
      <form action={handleSubmit}>
             <div>
                <label>Upload Image</label>
                 <input type="file" accept='image/*' name="image" id="image" placeholder='Upload Images' />
            </div> 

           <button type="submit">Upload</button>

      </form>
    </div>
  )
}

export default FormVisa
