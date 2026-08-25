"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    createActivity,
    updateActivity,
    deleteActivityImage,
} from "@/Action/activity";
import Image from "next/image";

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
    );
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

function DynamicListField({ label, items, setItems, placeholder }) {
    const handleChange = (index, value) => {
        const updated = [...items];
        updated[index] = value;
        setItems(updated);
    };

    const handleAdd = () => setItems([...items, ""]);
    const handleRemove = (index) => setItems(items.filter((_, i) => i !== index));

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2">
                {items.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No {label.toLowerCase()} added yet.</p>
                )}
                {items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                        <input
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
    );
}

// activity prop na ho → Create mode. activity prop ho → Edit mode.
export default function ActivityForm({ activity = null }) {
    const isEditMode = Boolean(activity);
    const router = useRouter();
    const fileInputRef = useRef(null);
    const [isPending, startTransition] = useTransition();

    const [formValues, setFormValues] = useState({
        title: activity?.title || "",
        destination: activity?.destination || "",
        category: activity?.category || "",
        description: activity?.description || "",
        price: activity?.price || "",
        duration: activity?.duration || "",
        meetingPoint: activity?.meetingPoint || "",
        isActive: activity?.isActive ?? true,
    });

    const [highlights, setHighlights] = useState(
        activity?.highlights?.length ? activity.highlights : [""]
    );
    const [included, setIncluded] = useState(
        activity?.included?.length ? activity.included : [""]
    );
    const [excluded, setExcluded] = useState(
        activity?.excluded?.length ? activity.excluded : [""]
    );
    const [timings, setTimings] = useState(
        activity?.timings?.length ? activity.timings : [""]
    );

    // Edit mode mein activity.images se aati hain, create mode mein hamesha khaali
    const [existingImages, setExistingImages] = useState(activity?.images || []);

    // Dono modes mein — nayi select ki hui, abhi upload nahi hui files
    const [newImages, setNewImages] = useState([]);

    const [message, setMessage] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageSelect = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        const entries = files.map((file) => ({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            file,
            previewUrl: URL.createObjectURL(file),
        }));

        setNewImages((prev) => [...prev, ...entries]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // Existing image X → sirf edit mode mein possible (create mode mein existingImages hoti hi nahi)
    // Turant Cloudinary se delete + state se hatao
    const removeExistingImage = async (publicId) => {
        setExistingImages((prev) => prev.filter((img) => img.publicId !== publicId));
        await deleteActivityImage(publicId).catch(() => {});
    };

    // New image X → sirf local state se hatao, kabhi upload hi nahi hui
    const removeNewImage = (id) => {
        setNewImages((prev) => {
            const target = prev.find((img) => img.id === id);
            if (target?.previewUrl) URL.revokeObjectURL(target.previewUrl);
            return prev.filter((img) => img.id !== id);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(null);

        if (existingImages.length === 0 && newImages.length === 0) {
            setMessage({ type: "error", text: "Please select at least one image." });
            return;
        }

        const fd = new FormData();
        Object.entries(formValues).forEach(([key, value]) => {
            fd.append(key, value.toString());
        });
        fd.append("highlights", JSON.stringify(highlights));
        fd.append("included", JSON.stringify(included));
        fd.append("excluded", JSON.stringify(excluded));
        fd.append("timings", JSON.stringify(timings));

        // Nayi files — dono modes mein "images"/"newImages" — server action ke naam se sync karna hoga
        newImages.forEach((img) => fd.append(isEditMode ? "newImages" : "images", img.file));

        // Sirf edit mode mein existing images bhejni hain
        if (isEditMode) {
            fd.append("existingImages", JSON.stringify(existingImages));
        }

        startTransition(async () => {
            const result = isEditMode
                ? await updateActivity(activity._id, null, fd)
                : await createActivity(null, fd);

            if (result.success) {
                setMessage({ type: "success", text: result.message });
                setTimeout(() => router.push("/admin/activity"), 1000);
            } else {
                setMessage({ type: "error", text: result.message });
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {message && (
                <div
                    className={`rounded-lg px-4 py-3 text-sm font-medium ${
                        message.type === "success"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <SectionCard number="1" title="Basic Info">
                <Field label="Title" required>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formValues.title}
                        onChange={handleInputChange}
                        placeholder="e.g. Desert Safari with BBQ Dinner"
                        className={inputClass}
                    />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <Field label="Destination" required>
                        <input
                            type="text"
                            name="destination"
                            required
                            value={formValues.destination}
                            onChange={handleInputChange}
                            placeholder="e.g. Dubai"
                            className={inputClass}
                        />
                    </Field>
                    <Field label="Category" required>
                        <input
                            type="text"
                            name="category"
                            required
                            value={formValues.category}
                            onChange={handleInputChange}
                            placeholder="e.g. Desert Safari"
                            className={inputClass}
                        />
                    </Field>
                </div>

                <Field label="Description" required>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        value={formValues.description}
                        onChange={handleInputChange}
                        placeholder="Full activity description..."
                        className={`${inputClass} resize-none`}
                    />
                </Field>
            </SectionCard>

            <SectionCard number="2" title="Pricing">
                <Field label="Price" required>
                    <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                            INR
                        </span>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            step="0.01"
                            value={formValues.price}
                            onChange={handleInputChange}
                            placeholder="0.00"
                            className={`${inputClass} pl-12`}
                        />
                    </div>
                </Field>
            </SectionCard>

            <SectionCard number="3" title="Details">
                <div className="grid grid-cols-2 gap-4">
                    <Field label="Duration" required>
                        <input
                            type="text"
                            name="duration"
                            required
                            value={formValues.duration}
                            onChange={handleInputChange}
                            placeholder="e.g. 6 hours"
                            className={inputClass}
                        />
                    </Field>
                    <Field label="Meeting Point">
                        <input
                            type="text"
                            name="meetingPoint"
                            value={formValues.meetingPoint}
                            onChange={handleInputChange}
                            placeholder="e.g. Hotel Lobby Pickup"
                            className={inputClass}
                        />
                    </Field>
                </div>

                <DynamicListField
                    label="Timings"
                    items={timings}
                    setItems={setTimings}
                    placeholder="e.g. 9:00 AM - 3:00 PM"
                />
            </SectionCard>

            <SectionCard number="4" title="Images">
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
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                    />
                </label>

                {(existingImages.length > 0 || newImages.length > 0) && (
                    <div className="grid grid-cols-4 gap-3">
                        {existingImages.map((img) => (
                            <div
                                key={img.publicId}
                                className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
                            >
                                <Image src={img.url} alt={img.publicId} width={200} height={200} className="w-full h-full object-cover" />
                                <button
                                    type="button"
                                    onClick={() => removeExistingImage(img.publicId)}
                                    className="absolute top-1.5 right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-black/70 text-white text-xs hover:bg-red-600 transition"
                                    aria-label="Remove image"
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        {newImages.map((img) => (
                            <div
                                key={img.id}
                                className="relative aspect-square rounded-lg overflow-hidden border-2 border-dashed border-blue-300 bg-gray-50"
                            >
                                <Image src={img.previewUrl} alt="" width={200} height={200} className="w-full h-full object-cover" />
                                {isEditMode && (
                                    <span className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-[10px] rounded">
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

            <SectionCard number="5" title="Activity Info">
                <DynamicListField
                    label="Highlights"
                    items={highlights}
                    setItems={setHighlights}
                    placeholder="e.g. Camel Riding"
                />
                <DynamicListField
                    label="Included"
                    items={included}
                    setItems={setIncluded}
                    placeholder="e.g. Hotel Pickup & Drop"
                />
                <DynamicListField
                    label="Excluded"
                    items={excluded}
                    setItems={setExcluded}
                    placeholder="e.g. Personal Expenses"
                />
            </SectionCard>

            <SectionCard number="6" title="Status">
                <label className="flex items-center justify-between cursor-pointer">
                    <div>
                        <p className="text-sm font-medium text-gray-900">Active</p>
                        <p className="text-xs text-gray-500">Visible to customers on the website</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setFormValues((prev) => ({ ...prev, isActive: !prev.isActive }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formValues.isActive ? "bg-blue-600" : "bg-gray-300"
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                formValues.isActive ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
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
                    {isPending ? "Saving…" : isEditMode ? "Save Changes" : "Save Activity"}
                </button>
            </div>
        </form>
    );
}