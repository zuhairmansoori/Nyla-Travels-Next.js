'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function CarForm({ action, Defaultlvalue }) {
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(Defaultlvalue?.imageUrl?.url || null)
  console.log("defaulr value",Defaultlvalue);
  

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
    <div className="w-full lg:ml-64 lg:w-[calc(100%-16rem)] transition-all duration-300 px-4 sm:px-6 lg:px-10 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            {Defaultlvalue?._id ? 'Edit Car' : 'Add New Car'}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Fill in the details below to {Defaultlvalue?._id ? 'update the' : 'create a new'} car listing.
          </p>
        </div>

        <form action={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="CarName">Car Name</Label>
              <Input
                type="text"
                name="CarName"
                id="CarName"
                placeholder="Enter Car Name"
                defaultValue={Defaultlvalue?.CarName}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="Doors">Doors</Label>
              <Input
                type="number"
                name="Doors"
                id="Doors"
                placeholder="Number of Doors"
                defaultValue={Defaultlvalue?.Doors}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="FuelType">Fuel Type</Label>
              <Input
                type="text"
                name="FuelType"
                id="FuelType"
                placeholder="Petrol / Diesel / Electric"
                defaultValue={Defaultlvalue?.FuelType}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="Deposit">Deposit (₹)</Label>
              <Input
                type="number"
                name="Deposit"
                id="Deposit"
                placeholder="Deposit Amount"
                defaultValue={Defaultlvalue?.Deposit}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="RentdayPrice">Rent Per Day — Price (₹)</Label>
              <Input
                type="number"
                name="RentdayPrice"
                id="RentdayPrice"
                placeholder="Price Per Day"
                defaultValue={Defaultlvalue?.Rentday?.price}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="RentdayKm">Rent Per Day — Km Limit</Label>
              <Input
                type="number"
                name="RentdayKm"
                id="RentdayKm"
                placeholder="Km Limit Per Day"
                defaultValue={Defaultlvalue?.Rentday?.Km}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="RentweekPrice">Rent Per Week — Price (₹)</Label>
              <Input
                type="number"
                name="RentweekPrice"
                id="RentweekPrice"
                placeholder="Price Per Week"
                defaultValue={Defaultlvalue?.Rentweek?.price}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="RentweekKm">Rent Per Week — Km Limit</Label>
              <Input
                type="number"
                name="RentweekKm"
                id="RentweekKm"
                placeholder="Km Limit Per Week"
                defaultValue={Defaultlvalue?.Rentweek?.Km}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="Carmodel">Car Model Year</Label>
              <Input
                type="number"
                name="Carmodel"
                id="Carmodel"
                placeholder="e.g. 2023"
                defaultValue={Defaultlvalue?.Carmodel}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="Airbag">Airbags</Label>
              <Input
                type="number"
                name="Airbag"
                id="Airbag"
                placeholder="Number of Airbags"
                defaultValue={Defaultlvalue?.Airbag}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="Passengers">Passengers</Label>
              <Input
                type="number"
                name="Passengers"
                id="Passengers"
                placeholder="Seating Capacity"
                defaultValue={Defaultlvalue?.Passengers}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="Transmission">Transmission</Label>
              <select
                id="Transmission"
                name="Transmission"
                defaultValue={Defaultlvalue?.Transmission || ''}
                className="h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option value="">Select</option>
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
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

export default CarForm