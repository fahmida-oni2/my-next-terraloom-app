'use client'; 

import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'; 
import RatingComponent from '../RatingComponent/RatingComponent';

const defaultReviewValues = {
  reviewerName: "",
  reviewText: "",
  rating: 0,
};

export default function ReviewForm({ propertyData }) {
    const {image_url,title,description,price,category,_id } = propertyData;
    const router = useRouter(); 

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: defaultReviewValues,
    });

    function onSubmit(reviewData) {
        const submissionPayload = {
            kitId: _id,
            kitName: title,
            price: price,
            imageUrl: image_url,
            ...reviewData,
            submissionDate: new Date().toISOString(),
        };

        const existingReviews = JSON.parse(localStorage.getItem("reviews") || "[]");
        const updatedReviews = [...existingReviews, submissionPayload];
        localStorage.setItem("reviews", JSON.stringify(updatedReviews));

        toast.success("Review submitted");
        router.push(`/my-review`); 
    }

    return (
        <div className="flex justify-center items-center">
            <div className="card bg-base-100 w-full lg:max-w-sm shrink-0 shadow-2xl hero-content flex-col mt-5 lg:mt-0">
                <div className="card-body p-6 w-full">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="pt-3 border-t mt-3 border-gray-200 space-y-3"
                    >
                        <h4 className="text-2xl font-bold text-center ">
                            Submit Your Review
                        </h4>

                       
                        <div>
                            <label htmlFor="reviewerName" className="label block text-base font-medium">Your Name</label>
                            <input
                                type="text"
                                id="reviewerName"
                                {...register("reviewerName")}
                                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
                            />
                            {errors.reviewerName && (<p className="text-red-500 text-sm mt-1">{errors.reviewerName.message}</p>)}
                        </div>

                      
                        <label className="label block text-base font-medium mb-2">Your Rating</label>
                        <Controller
                            name="rating"
                            control={control}
                            rules={{ validate: (value) => value > 0 || "Please provide a star rating" }}
                            render={({ field }) => (
                                <RatingComponent {...field} name="rating" />
                            )}
                        />
                        {errors.rating && (<p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>)}

                        {/* Review Text Area */}
                        <div>
                            <label htmlFor="reviewText" className="label block text-base font-medium">Review Text</label>
                            <textarea
                                id="reviewText"
                                rows="4"
                                {...register("reviewText", {
                                    required: "Review text is required",
                                    minLength: { value: 10, message: "Minimum 10 characters" },
                                })}
                                className="input w-full p-3 border border-gray-300 rounded-lg focus:ring-[#632EE3] focus:border-[#632EE3]"
                                placeholder="Write your review here..."
                            />
                            {errors.reviewText && (<p className="text-red-500 text-sm mt-1">{errors.reviewText.message}</p>)}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="btn bg-gradient-to-r from-[#632EE3] to-[#9F62F2] text-white w-full py-3 rounded-lg font-semibold text-lg transition shadow-md"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
}