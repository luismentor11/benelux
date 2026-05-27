"use client";

import React, { useState } from "react";

interface ContactFormProps {
  dict: {
    name: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    success: string;
  };
}

export default function ContactForm({ dict }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call with a premium delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="bg-stone-850 p-8 md:p-12 border border-stone-800 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in min-h-[400px]">
        {/* Animated Check Icon */}
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 animate-bounce">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-white">¡Muchas Gracias!</h3>
        <p className="text-stone-300 font-light text-sm max-w-sm leading-relaxed">
          {dict.success}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-4 border border-stone-700 text-stone-300 hover:text-white hover:border-white px-6 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all duration-300 cursor-pointer"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-stone-850 p-8 border border-stone-800 animate-fade-in"
    >
      {/* Name Input */}
      <div className="space-y-2">
        <label className="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase font-semibold block">
          {dict.name}
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
          className="border border-stone-800 bg-transparent text-white text-xs py-3 px-4 focus:border-primary focus:bg-stone-800/20 transition-all duration-300 outline-none w-full"
          required
        />
      </div>

      {/* Grid for Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase font-semibold block">
            {dict.email}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
            className="border border-stone-800 bg-transparent text-white text-xs py-3 px-4 focus:border-primary focus:bg-stone-800/20 transition-all duration-300 outline-none w-full"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase font-semibold block">
            {dict.phone}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
            className="border border-stone-800 bg-transparent text-white text-xs py-3 px-4 focus:border-primary focus:bg-stone-800/20 transition-all duration-300 outline-none w-full"
          />
        </div>
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label className="text-[0.65rem] tracking-[0.15em] text-stone-400 uppercase font-semibold block">
          {dict.message}
        </label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
          className="border border-stone-800 bg-transparent text-white text-xs py-3 px-4 focus:border-primary focus:bg-stone-800/20 transition-all duration-300 outline-none resize-none w-full"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-white text-stone-900 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-4 w-4 text-stone-900 hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </>
        ) : (
          dict.send
        )}
      </button>
    </form>
  );
}
