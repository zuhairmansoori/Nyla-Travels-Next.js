"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Plane,
  User,
  Mail,
  Phone,
  MapPin,
  Ticket,
  CalendarDays,
  Users,
  MessageSquareText,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Check,
  X,
  ConciergeBell,
} from "lucide-react";

const ASSISTANCE_TYPE_OPTIONS = [
  { value: "wheelchair", label: "Wheelchair Assistance" },
  { value: "meet_greet", label: "Meet & Greet" },
  { value: "fast_track", label: "Fast-Track / Priority Immigration" },
  { value: "porter", label: "Porter / Baggage Handling" },
  { value: "lounge_access", label: "Lounge Access" },
  { value: "unaccompanied_minor", label: "Unaccompanied Minor Assistance" },
  { value: "senior_citizen", label: "Senior Citizen Assistance" },
  { value: "medical_assistance", label: "Medical / Mobility Assistance" },
];

const INITIAL_FORM_STATE = {
  fullName: "",
  email: "",
  phone: "",
  airportName: "",
  flightNumber: "",
  direction: "",
  travelDate: "",
  passengers: "1",
  assistanceTypes: [],
  specialRequests: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\+[1-9]\d{7,14}$/;

/**
 * Sends the booking payload to the backend.
 * Replace the endpoint below with your actual API route
 * (e.g. an app/api/airport-assistance/route.js handler in Next.js).
 */
async function submitAirportAssistanceRequest(payload) {
  const response = await fetch("/api/airport-assistance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.message || "Something went wrong. Please try again.");
  }

  return response.json();
}

export default function AirportAssistanceForm({ onSubmit = submitAirportAssistanceRequest }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // idle | success | error
  const [statusMessage, setStatusMessage] = useState("");
  const [assistancePopoverOpen, setAssistancePopoverOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const toggleAssistanceType = (value) => {
    setFormData((prev) => {
      const alreadySelected = prev.assistanceTypes.includes(value);
      const nextTypes = alreadySelected
        ? prev.assistanceTypes.filter((item) => item !== value)
        : [...prev.assistanceTypes, value];
      return { ...prev, assistanceTypes: nextTypes };
    });
    if (errors.assistanceTypes) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.assistanceTypes;
        return next;
      });
    }
  };

  const removeAssistanceType = (value) => {
    setFormData((prev) => ({
      ...prev,
      assistanceTypes: prev.assistanceTypes.filter((item) => item !== value),
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      nextErrors.fullName = "Enter your full name.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email address is required.";
    } else if (!EMAIL_REGEX.test(formData.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      nextErrors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(formData.phone.trim())) {
      nextErrors.phone = "Include the country code, e.g. +1 415 555 0123.";
    }

    if (!formData.airportName.trim()) {
      nextErrors.airportName = "Airport name is required.";
    }

    if (!formData.flightNumber.trim()) {
      nextErrors.flightNumber = "Flight number is required.";
    }

    if (!formData.direction) {
      nextErrors.direction = "Select arrival or departure.";
    }

    if (!formData.assistanceTypes.length) {
      nextErrors.assistanceTypes = "Select at least one assistance type.";
    }

    if (!formData.travelDate) {
      nextErrors.travelDate = "Travel date is required.";
    } else if (formData.travelDate < today) {
      nextErrors.travelDate = "Travel date cannot be in the past.";
    }

    const passengerCount = Number(formData.passengers);
    if (!formData.passengers || Number.isNaN(passengerCount) || passengerCount < 1) {
      nextErrors.passengers = "Enter at least 1 passenger.";
    } else if (passengerCount > 20) {
      nextErrors.passengers = "For groups over 20, contact us directly.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitStatus("idle");
    setStatusMessage("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({ ...formData, service: "Airport Assistance" });
      setSubmitStatus("success");
      setStatusMessage(
        "Request received. Our team will confirm your airport assistance shortly."
      );
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      setSubmitStatus("error");
      setStatusMessage(
        error?.message || "We couldn't submit your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card id='airport-assistance-form' className="w-full max-w-2xl mx-auto overflow-hidden border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl py-0">
      {/* <CardHeader className="bg-gradient-to-br from-[#003069] to-[#0d7fd6] text-white space-y-2 px-6 py-8 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm">
            <Plane className="h-5 w-5 -rotate-45" aria-hidden="true" />
          </span>
          <div>
            <CardTitle className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
              Airport Assistance
            </CardTitle>
            <CardDescription className="text-blue-100/90">
              Meet-and-greet, wheelchair support, and fast-track help at the airport.
            </CardDescription>
          </div>
        </div>
      </CardHeader> */}

      <CardContent className="px-6 py-8 sm:px-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <input type="hidden" name="service" value="Airport Assistance" />

          {submitStatus === "success" && (
            <div
              role="status"
              className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              <p>{statusMessage}</p>
            </div>
          )}

          {submitStatus === "error" && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />
              <p>{statusMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-700">
                Full Name
              </Label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Aisha Khan"
                  className="pl-9 rounded-xl"
                  value={formData.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
              </div>
              {errors.fullName && (
                <p id="fullName-error" className="text-sm text-red-600">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">
                Email Address
              </Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-9 rounded-xl"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-slate-700">
                Phone Number
              </Label>
              <div className="relative">
                <Phone
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 415 555 0123"
                  className="pl-9 rounded-xl"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
              </div>
              {errors.phone && (
                <p id="phone-error" className="text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="airportName" className="text-slate-700">
                Airport Name
              </Label>
              <div className="relative">
                <MapPin
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="airportName"
                  name="airportName"
                  placeholder="Dubai International (DXB)"
                  className="pl-9 rounded-xl"
                  value={formData.airportName}
                  onChange={(e) => handleChange("airportName", e.target.value)}
                  aria-invalid={Boolean(errors.airportName)}
                  aria-describedby={errors.airportName ? "airportName-error" : undefined}
                />
              </div>
              {errors.airportName && (
                <p id="airportName-error" className="text-sm text-red-600">
                  {errors.airportName}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="flightNumber" className="text-slate-700">
                Flight Number
              </Label>
              <div className="relative">
                <Ticket
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="flightNumber"
                  name="flightNumber"
                  placeholder="EK202"
                  className="pl-9 rounded-xl uppercase placeholder:normal-case"
                  value={formData.flightNumber}
                  onChange={(e) => handleChange("flightNumber", e.target.value)}
                  aria-invalid={Boolean(errors.flightNumber)}
                  aria-describedby={errors.flightNumber ? "flightNumber-error" : undefined}
                />
              </div>
              {errors.flightNumber && (
                <p id="flightNumber-error" className="text-sm text-red-600">
                  {errors.flightNumber}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="direction" className="text-slate-700">
                Arrival / Departure
              </Label>
              <Select
                value={formData.direction}
                onValueChange={(value) => handleChange("direction", value)}
              >
                <SelectTrigger
                  id="direction"
                  className="rounded-xl w-full"
                  aria-invalid={Boolean(errors.direction)}
                  aria-describedby={errors.direction ? "direction-error" : undefined}
                >
                  <SelectValue placeholder="Select one" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arrival">Arrival</SelectItem>
                  <SelectItem value="departure">Departure</SelectItem>
                </SelectContent>
              </Select>
              {errors.direction && (
                <p id="direction-error" className="text-sm text-red-600">
                  {errors.direction}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelDate" className="text-slate-700">
                Travel Date
              </Label>
              <div className="relative">
                <CalendarDays
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="travelDate"
                  name="travelDate"
                  type="date"
                  min={today}
                  className="pl-9 rounded-xl"
                  value={formData.travelDate}
                  onChange={(e) => handleChange("travelDate", e.target.value)}
                  aria-invalid={Boolean(errors.travelDate)}
                  aria-describedby={errors.travelDate ? "travelDate-error" : undefined}
                />
              </div>
              {errors.travelDate && (
                <p id="travelDate-error" className="text-sm text-red-600">
                  {errors.travelDate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passengers" className="text-slate-700">
                Number of Passengers
              </Label>
              <div className="relative">
                <Users
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <Input
                  id="passengers"
                  name="passengers"
                  type="number"
                  min={1}
                  max={20}
                  className="pl-9 rounded-xl"
                  value={formData.passengers}
                  onChange={(e) => handleChange("passengers", e.target.value)}
                  aria-invalid={Boolean(errors.passengers)}
                  aria-describedby={errors.passengers ? "passengers-error" : undefined}
                />
              </div>
              {errors.passengers && (
                <p id="passengers-error" className="text-sm text-red-600">
                  {errors.passengers}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="assistanceTypes" className="text-slate-700">
              Assistance Type
              <span className="ml-1 text-slate-400 font-normal">(select all that apply)</span>
            </Label>
            <Popover open={assistancePopoverOpen} onOpenChange={setAssistancePopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  id="assistanceTypes"
                  type="button"
                  variant="outline"
                  role="combobox"
                  aria-expanded={assistancePopoverOpen}
                  aria-invalid={Boolean(errors.assistanceTypes)}
                  aria-describedby={errors.assistanceTypes ? "assistanceTypes-error" : undefined}
                  className="w-full justify-between rounded-xl font-normal h-auto min-h-10 py-2 px-3"
                >
                  <span className="flex items-center gap-2 text-slate-500">
                    <ConciergeBell className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {formData.assistanceTypes.length === 0
                      ? "Choose assistance types"
                      : `${formData.assistanceTypes.length} selected`}
                  </span>
                  <ChevronDown className="h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[--radix-popover-trigger-width] p-1.5 rounded-xl"
                align="start"
              >
                <div className="max-h-64 overflow-y-auto">
                  {ASSISTANCE_TYPE_OPTIONS.map((option) => {
                    const isSelected = formData.assistanceTypes.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => toggleAssistanceType(option.value)}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-left text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                            isSelected
                              ? "bg-[#003069] border-[#003069] text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && <Check className="h-3 w-3" aria-hidden="true" />}
                        </span>
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>

            {formData.assistanceTypes.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {formData.assistanceTypes.map((value) => {
                  const option = ASSISTANCE_TYPE_OPTIONS.find((item) => item.value === value);
                  return (
                    <Badge
                      key={value}
                      variant="secondary"
                      className="rounded-full bg-blue-50 text-[#003069] hover:bg-blue-100 pl-3 pr-1.5 py-1 gap-1 font-normal"
                    >
                      {option?.label}
                      <button
                        type="button"
                        onClick={() => removeAssistanceType(value)}
                        className="rounded-full p-0.5 hover:bg-blue-200/60 transition-colors"
                        aria-label={`Remove ${option?.label}`}
                      >
                        <X className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            )}

            {errors.assistanceTypes && (
              <p id="assistanceTypes-error" className="text-sm text-red-600">
                {errors.assistanceTypes}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-slate-700">
              Special Requests
              <span className="ml-1 text-slate-400 font-normal">(optional)</span>
            </Label>
            <div className="relative">
              <MessageSquareText
                className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400"
                aria-hidden="true"
              />
              <Textarea
                id="specialRequests"
                name="specialRequests"
                placeholder="Wheelchair access, elderly passenger, extra luggage assistance..."
                className="pl-9 rounded-xl min-h-[100px] resize-none"
                value={formData.specialRequests}
                onChange={(e) => handleChange("specialRequests", e.target.value)}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#003069] hover:bg-[#0d7fd6] text-white font-medium h-11 transition-colors"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Submitting request...
              </span>
            ) : (
              "Request Airport Assistance"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}