"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading/Loading";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function page() {
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      
      router.push("/login");
      return;
    }
    // Function to load reviews from localStorage
    const loadReviews = () => {
      try {
        const storedReviews = JSON.parse(
          localStorage.getItem("reviews") || "[]"
        );

        setAllReviews(storedReviews.reverse());
      } catch (error) {
        console.error("Error loading reviews from localStorage:", error);
        setAllReviews([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, [isLoaded, isSignedIn, router]);

 
  const handleDeleteReview = (indexToDelete) => {
    const currentDisplayedReviews = allReviews.slice();
    const updatedDisplayedReviews = currentDisplayedReviews.filter(
      (_, index) => {
        return index !== indexToDelete;
      }
    );
    const reviewsToSave = updatedDisplayedReviews.slice().reverse();

    try {
    
      localStorage.setItem("reviews", JSON.stringify(reviewsToSave));
      setAllReviews(updatedDisplayedReviews);

      toast.success("Review successfully deleted!");
    } catch (error) {
      console.error("Error saving updated reviews to localStorage:", error);
      toast.error("Failed to delete review.");
    }
  };

  if (!isLoaded || isLoading) {
    return <Loading />;
  }
  if (allReviews.length === 0) {
    return (
      <div className="text-center p-10">
        <h2 className="text-2xl font-bold text-gray-700">
          No Reviews Saved Locally
        </h2>
        <p>Submit a review on a kit's detail page to see it here!</p>
        <div className="flex justify-center items-center mb-5 mt-5">
          <Link
            href="/all-kits"
            className="btn rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-50 mt-5"
          >
            Browse Kits
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-6 my-10">
      <h1 className="text-3xl font-extrabold mb-8 border-b pb-2">
        Reviews ({allReviews.length})
      </h1>

      <div className="space-y-6">
        {allReviews.map((review, index) => (
          <div
            key={index}
            className="bg-white flex flex-col lg:flex-row gap-5 shadow-lg rounded-lg p-5 border border-gray-100 transition duration-300 hover:shadow-xl"
          >
            {review.imageUrl && (
              <Image
                src={review.imageUrl}
                alt={`Image for ${review.kitName || review.title}`}
                width={240}
                height={200}
                className="rounded-md mb-3 object-cover"
              />
            )}

            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {review.kitName || review.title}
              </h2>

              <p className="text-sm text-gray-500 mb-3">
                Reviewed by: **{review.reviewerName}**
              </p>

              <p className="text-lg font-semibold text-yellow-600">
                Rating: **{review.rating} / 5 Stars** ⭐
              </p>

              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="italic text-gray-700">"{review.reviewText}"</p>
              </div>

              <p className="text-xs text-gray-400 mt-3 text-right">
                {review.submissionDate &&
                  new Date(review.submissionDate).toLocaleDateString()}
              </p>
            </div>
            <div className="flex justify-end items-end p-2">
              <button
                onClick={() => handleDeleteReview(index)}
                className="btn bg-[#00D390] text-white hover:bg-[#00b97a]"
              >
                Delete 
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mb-5 mt-5">
        <Link
          href="/all-kits"
          className="btn rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-50"
        >
          Go Back
        </Link>
      </div>
      <div className="border-b-2 border-solid border-b-gray-400 mb-5 ml-7 mr-7"></div>
      <Toaster />
    </div>
  );
}
