'use client'
import { deleteImageFromCloudinary, craertCar, upadateCar } from '@/Action/cars'
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

function SectionCard({ number, title, children }) {
    return (
        <section className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-5">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white text-xs font-semibold">
                    {number}
                </span>
                <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            </div>
            <div className="space-y-4">{children}</div>
        </section>
    )
}

function Field({ label, required, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );
}
const inputClass =
    "w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition";

function DynamicListField(item, setitem, label, placeholder) {
    const handleChange = (index, value) => {
        const updrage = [...item]
        updrage[index] = value
        setitem(updrage)
    }
    const handleAdd = () => setitem([...item, ""])
    const handleRemove = (index) => setitem(item.filter((_, i) => i !== index))

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2" >
                {item.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No {label.toLowerCase()} added yet.</p>
                )}

                {item.map((item, index) => (
                    <div key={index}>
                        <index
                            type="text"
                            value={item}
                            onChange={(e) => handleChange(index, e.target.value)}
                            placeholder={placeholder}
                            className={inputClass}
                        />
                        <button
                            type="button"
                            onClick={() => handleRemove(index)}
                            className="shrink-0 w-9 h-9 flex items-center justify-center text-gray-400 border border-gray-200 rounded-lg hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition"
                            aria-label={`Remove ${label}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
            <button
                type="button"
                onClick={handleAdd}
                className="mt-2.5 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
                <span className="text-base leading-none">+</span> Add {label.slice(0, -1)}
            </button>
        </div>
    )
}

export default function CarForm({ Cars = null }) {
    const isEditMode = Boolean(Cars)
    const router = useRouter()
    const fileInputref = useRef()
    const [isPending, startTransition] = useTransition()
    

    const [formValue, setFormValue] = useState({
        carName: Cars?.carName || "",
        doors: Cars?.doors || "",
        fuelType: Cars?.fuelType || "",
        deposit: Cars?.deposit || "",
        description: Cars?.description || "",
        carModel: Cars?.carModel || "",
        airbag: Cars?.airbag || "",
        transmission: Cars?.transmission || "",
        passengers: Cars?.passengers || "",
        isActive: Cars?.isActive ?? true
    })

    const [rentDay, setrentDay] = useState({
        price: Cars?.rentDay?.price || "",
        km: Cars?.rentDay?.km || ""
    })
    const [rentWeek, setrentweek] = useState({
        price: Cars?.rentWeek?.price || "",
        km: Cars?.rentWeek?.km || ""
    })
    const [existingImage, setexistingImage] = useState(Cars?.imageUrl || [])
    const [newImage, setNewImage] = useState([])
    const [message, setMessage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValue((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return;
        const entries = files.map((file) => ({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            file,
            previewUrl: URL.createObjectURL(file)
        }));

        setNewImage((prev) => [...prev, ...entries]);
        if (fileInputref.current) fileInputref.current.value = ""
    }

    const removeExistingImage = async (publicId) => {
        setexistingImage((prev) => prev.filter((img) => img.publicId !== publicId))
        await deleteImageFromCloudinary(publicId).catch(() => { })
    }

    const removeNewImage = (id) => {
        setNewImage((prev) => {
            const target = prev.find(img => img.id === id)
            if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((img) => img.id !== id);
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null)
        if (existingImage.length === 0 && newImage.length === 0) {
            setMessage({ type: "error", text: "Please select at least one image." });
            return
        }
        const fd = new FormData();
        Object.entries(formValue).forEach(([key, value]) => {
            fd.append(key, value.toString());
        });
        fd.append('rentDay', JSON.stringify(rentDay));
        fd.append('rentWeek', JSON.stringify(rentWeek));
        // Nayi files — dono modes mein "images"/"newImages" — server action ke naam se sync karna hoga
        newImage.forEach((img) => fd.append(isEditMode ? "newImages" : "images", img.file));
      
        
        // Sirf edit mode mein existing images bhejni hain
        if (isEditMode) {
            fd.append("existingImages", JSON.stringify(existingImage))
        }

        startTransition(async () => {
            const result = isEditMode
                ? await upadateCar(Cars._id, fd) : await craertCar(fd)
            if (result.success) {
                setMessage({ type: "success", text: result.message });
                setTimeout(() => router.push("/admin/cars"), 1000);
            } else {
                setMessage({ type: "error", text: result.message });
            }
        })


    };
    return (
        <>

            <form onSubmit={handleSubmit} className='space-y-5 p-10'>
                {message && (
                    <div
                        className={`rounded-lg px-4 py-3 text-sm font-medium ${message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                            }`}
                    >
                        {message.text}
                    </div>
                )}
                <SectionCard number="1" title="Basic Info">
                    <div className='grid grid-cols-3 gap-4'>
                        <Field label={"Car Name"} required>
                            <input
                                type='text'
                                name='carName'
                                required
                                value={formValue.carName}
                                onChange={handleChange}
                                placeholder='e.g. Rools Royls Ghost'
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Car Model'} required>
                            <input
                                type='text'
                                name='carModel'
                                required
                                value={formValue.carModel}
                                onChange={handleChange}
                                placeholder='e.g. 2025'
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Doors'}>
                            <input
                                type='number'
                                name='doors'
                                required
                                value={formValue.doors}
                                onChange={handleChange}
                                placeholder='e.g. 4'
                                className={inputClass}
                            />
                        </Field>
                    </div>
                    <div className='grid grid-cols-4 gap-4'>
                        <Field label={'Airbag'}>
                            <input
                                type='number'
                                name='airbag'
                                required
                                value={formValue.airbag}
                                onChange={handleChange}
                                placeholder='e.g. 4'
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Passengers'}>
                            <input
                                type='number'
                                name='passengers'
                                required
                                value={formValue.passengers}
                                onChange={handleChange}
                                placeholder='Number of passengers'
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Transmission'}>
                            <select name="transmission" value={formValue.transmission} required onChange={handleChange} className={inputClass}>
                                <option value="" disabled>Select Transmission</option>
                                <option value="automatic">Auto</option>
                                <option value="manual">Manual</option>
                            </select>
                        </Field>
                        <Field label={'Fuel Type'}>
                            <select name="fuelType" value={formValue.fuelType} required onChange={handleChange} className={inputClass}>   
                                <option value="" disabled>Select Fuel</option>
                                <option value="petrol">Petrol</option>
                                <option value="diesel">Diesel</option>
                                <option value="ev">EV</option>
                            </select>
                        </Field>
                    </div>
                    <Field label={'Description'}>
                        <textarea
                            name='description'
                            required
                            value={formValue.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder='Full Car Description'
                            className={`${inputClass} resize-none`}
                        />
                    </Field>

                </SectionCard>

                <SectionCard number='2' title='Pricing'>
                    <div className='grid grid-cols-5 gap-4'>
                        <Field label={'Rent/day'}>
                            <input
                                type="number"
                                name="price"
                                required
                                value={rentDay.price}
                                onChange={(e) => setrentDay((prev) => ({ ...prev, price: e.target.value }))}
                                placeholder='car price per day'
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Km/day'}>
                            <input
                                type="number"
                                name='km'
                                required
                                value={rentDay.km}
                                onChange={(e) => setrentDay((prev) => ({ ...prev, km: e.target.value }))}
                                placeholder='e.g. 25km'
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Rent/week'}>
                            <input
                                type="text"
                                name='price'
                                required
                                value={rentWeek.price}
                                placeholder='Rent per week'
                                onChange={(e) => setrentweek((prev) => ({ ...prev, price: e.target.value }))}
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Km/week'}>
                            <input
                                type="number"
                                name='km'
                                required
                                value={rentWeek.km}
                                placeholder='Week per km'
                                onChange={(e) => setrentweek((prev) => ({ ...prev, km: e.target.value }))}
                                className={inputClass}
                            />
                        </Field>
                        <Field label={'Deposit'}>
                            <input
                                type="number"
                                name='deposit'
                                required
                                value={formValue.deposit}
                                placeholder='e.g. 30000'
                                onChange={handleChange}
                                className={inputClass}
                            />
                        </Field>
                    </div>
                </SectionCard>

                <SectionCard number='3' title='Image'>
                    <label
                        htmlFor="image-upload"
                        className="flex flex-col items-center justify-center gap-1.5 border-2 border-dashed border-gray-300 rounded-xl py-8 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition"
                    >
                        <span className="text-sm font-medium text-gray-700">Click to select images</span>
                        <span className="text-xs text-gray-400">
                            PNG, JPG up to 10MB — uploads happen when you click Save
                        </span>
                        <input
                            id="image-upload"
                            ref={fileInputref}
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleImageSelect}
                            className="hidden"
                        />
                    </label>
                    {(existingImage.length > 0 || newImage.length > 0) && (
                        <div className='grid grid-cols-4 gap-4'>
                            {existingImage.map((img) => (
                                <div key={img.public_id}
                                    className='relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50'
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.public_id}
                                        width={200}
                                        height={200}
                                        className='w-full h-full object-cover'
                                    />
                                    <button
                                        type='button'
                                        onClick={() => removeExistingImage(img.publicId)}
                                        className='absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/70 text-white text-xs hover:bg-red-600 transition'
                                        aria-label='Remove image'
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            {newImage.map((img) => (
                                <div
                                    key={img.id}
                                    className='relative aspect-square rounded-lg  overflow-hidden border-2 border-dashed border-blue-300 bg-gray-50 '
                                >
                                    <Image
                                        src={img.previewUrl}
                                        alt={img.id}
                                        width={200}
                                        height={200}
                                        className='w-full h-full object-cover'
                                    />
                                    {isEditMode && (
                                        <span className='absolute bottom-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded'>
                                            New
                                        </span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(img.id)}
                                        className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/70 text-white text-xs hover:bg-red-600 transition"
                                        aria-label="Remove image"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </SectionCard>
                <SectionCard number='4' title='Status' >
                    <label className='flex items-center justify-between cursor-pointer'>
                        <div>
                            <p className='text-sm font-medium text-gray-500'>
                                Visible to customers on the website
                            </p>
                        </div>
                        <button
                            type='button'

                            onClick={() => setFormValue((prev) => ({ ...prev, isActive: !prev.isActive }))}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${formValue.isActive ? 'bg-blue-600' : 'bg-gray-300'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${formValue.isActive ? 'translate-x-6' : 'translate-x-1'}`}></span>



                        </button>
                    </label>
                </SectionCard>

                <div className="flex gap-3 justify-end sticky bottom-0 bg-linear-to-t from-gray-50 via-gray-50 pt-4 pb-1">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-5 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                        {isPending ? "Saving…" : isEditMode ? "Save Changes" : "Save Car"}
                    </button>
                </div>


            </form>
        </>
    )


}
