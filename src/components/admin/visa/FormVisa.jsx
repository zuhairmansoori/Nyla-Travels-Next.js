'use client'
import React from 'react'
import { visaImage } from '@/Action/visa'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'


function FormVisa({action, Defaultlvalue}) {
  async function handleSubmit(formdata) {
    const result = await action(formdata)
    if (result.success) {
      alert(result.message)
    } else {
      alert(result.message)
    }
  }
  return (
    <div className='lg:ml-64 py-10'>
      <form action={handleSubmit}>
        <div className='grid  sm:grid-cols-2 lg:grid-cols-3 p-10  justify-center items-center gap-10'>
          <div className='flex flex-col justify-between items-start gap-4 '>
            <Label>Country</Label>
            <Input type="text" name="country" id="country" placeholder='Enter Country Name' defaultValue={Defaultlvalue?.country} />
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Validity</Label>
            <Input type="text" name="validity" id="validity" placeholder='Enter Validity'  defaultValue={Defaultlvalue?.validity} />
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Visa Type</Label>
            <Input type="text" name="visaType" id="visaType" placeholder='Visa Type separted by  ,'  defaultValue={Defaultlvalue?.visaType}  />
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Price</Label>
            <Input type="number" name="price" id="price" placeholder='price'  defaultValue={Defaultlvalue?.price}  />
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Entry</Label>
            <Input type="text" name="entry" id="entry" placeholder='Entry ' defaultValue={Defaultlvalue?.entry}  />
          </div>


          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Length Of Stay</Label>
            <Input type="text" name="lengthOfStay" id="lengthOfStay" placeholder='Length Of Stay ' defaultValue={Defaultlvalue?.lengthOfStay}/>
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Description</Label>
            <Textarea name="description" defaultValue={Defaultlvalue?.description} id="description" placeholder='description seprated by ,' >
            </Textarea>

          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Documents</Label>
            <Textarea name="documents" id="documents" placeholder='Documents seprated by ,' defaultValue={Defaultlvalue?.documents}> </Textarea>
            
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Variant</Label>
            <Input type="text" name="variant" id="variant" placeholder='variant seprwted by , ' defaultValue={Defaultlvalue?.variant} />
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Active</Label>
            <select id='isActive' name='isActive'>
              <option value='true' >True</option>
              <option value='false' >Fasle</option>
            </select>
          </div>

          <div className='flex flex-col justify-between items-center gap-3 '>
            <Label>Upload Image</Label>
            <Input type="file" accept='image/*' name="image" id="image" placeholder='Upload Images' />
          </div>
          <Input type={'hidden'} name='id' value={Defaultlvalue?._id} />

        </div>


        <div className='flex justify-center'>
          <Button type="submit" className={'px-8 py-4 text-xl '}>Upload</Button>
        </div>



      </form>
    </div>
  )
}

export default FormVisa
