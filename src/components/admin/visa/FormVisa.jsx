
'use client'
import React, { useState } from 'react'
import { visaImage } from '@/Action/visa'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
 
function FormVisa({ action, Defaultlvalue }) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(Defaultlvalue?.image || null)
 
  async function handleSubmit(formdata) {
    setLoading(true)
    try {
      const result = await action(formdata)
      if (result.success) {
        alert(result.message)
      } else {
        alert(result.message)
      }
    } finally {
      setLoading(false)
    }
  }
 
  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }
 
  return (
    // w-full + lg:ml-64 + lg:w-[calc(100%-16rem)] -> sidebar ki width jitni ml-64 hai
    // utni hi width se content ko shrink kiya, isliye form sidebar ke andar hi
    // properly fit hoga, overflow ya horizontal scroll nahi aayega.
    <div className="w-full lg:ml-64 lg:w-[calc(100%-16rem)] transition-all duration-300 px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {Defaultlvalue?._id ? 'Edit Visa' : 'Add New Visa'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in the details below to {Defaultlvalue?._id ? 'update the' : 'create a new'} visa listing.
          </p>
        </div>
 
        <form action={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="country">Country</Label>
              <Input
                type="text"
                name="country"
                id="country"
                placeholder="Enter Country Name"
                defaultValue={Defaultlvalue?.country}
              />
            </div>
 
            <div className="flex flex-col gap-2">
              <Label htmlFor="validity">Validity</Label>
              <Input
                type="text"
                name="validity"
                id="validity"
                placeholder="Enter Validity"
                defaultValue={Defaultlvalue?.validity}
              />
            </div>
 
            <div className="flex flex-col gap-2">
              <Label htmlFor="visaType">Visa Type</Label>
              <Input
                type="text"
                name="visaType"
                id="visaType"
                placeholder="Visa Type separated by ,"
                defaultValue={Defaultlvalue?.visaType}
              />
            </div>
 
            <div className="flex flex-col gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                placeholder="Price"
                defaultValue={Defaultlvalue?.price}
              />
            </div>
 
            <div className="flex flex-col gap-2">
              <Label htmlFor="entry">Entry</Label>
              <Input
                type="text"
                name="entry"
                id="entry"
                placeholder="Entry"
                defaultValue={Defaultlvalue?.entry}
              />
            </div>
 
            <div className="flex flex-col gap-2">
              <Label htmlFor="lengthOfStay">Length Of Stay</Label>
              <Input
                type="text"
                name="lengthOfStay"
                id="lengthOfStay"
                placeholder="Length Of Stay"
                defaultValue={Defaultlvalue?.lengthOfStay}
              />
            </div>
 
            <div className="flex flex-col gap-2 sm:col-span-2 xl:col-span-1">
              <Label htmlFor="isActive">Active</Label>
              <select
                id="isActive"
                name="isActive"
                defaultValue={Defaultlvalue?.isActive ?? 'true'}
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
 
            <div className="flex flex-col gap-2 sm:col-span-2 xl:col-span-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                name="description"
                id="description"
                placeholder="Description separated by ,"
                defaultValue={Defaultlvalue?.description}
                className="min-h-[100px]"
              />
            </div>
 
            <div className="flex flex-col gap-2 sm:col-span-2 xl:col-span-3">
              <Label htmlFor="documents">Documents</Label>
              <Textarea
                name="documents"
                id="documents"
                placeholder="Documents separated by ,"
                defaultValue={Defaultlvalue?.documents}
                className="min-h-[100px]"
              />
            </div>
 
            <div className="flex flex-col gap-2 sm:col-span-2 xl:col-span-3">
              <Label htmlFor="image">Upload Image</Label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Input
                  type="file"
                  accept="image/*"
                  name="image"
                  id="image"
                  onChange={handleImageChange}
                  className="max-w-xs"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-20 w-20 rounded-md object-cover border"
                  />
                )}
              </div>
            </div>
 
            <Input type="hidden" name="id" value={Defaultlvalue?._id} />
          </div>
 
          <div className="flex justify-center sm:justify-end pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="px-8 py-4 text-lg w-full sm:w-auto"
            >
              {loading ? 'Uploading...' : 'Upload'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
 
export default FormVisa
 
