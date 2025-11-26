"use client";
import Loading from "@/components/Loading/Loading";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";


export default function page() {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user === null) {
      router.push("/login");
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) {
    return <Loading />;
  }

  if (isLoaded && user === null) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let totalKits = 0;
    try {
      const countResponse = await fetch("http://localhost:5000/all-kits");
      const existingKits = await countResponse.json();

      if (Array.isArray(existingKits)) {
        totalKits = existingKits.length;
      }
    } catch (error) {
      console.error("Error fetching kit count:", error);
      toast.error("Failed to determine kit priority. Submission cancelled.");
      return;
    }
    const newPriority = totalKits + 1;
    const formData = {
      title: e.target.name.value,
      category: e.target.category.value,
      creator_name: user.fullName || user.username || "Anonymous",
      creator_email: user.primaryEmailAddress?.emailAddress || "N/A",
      stock_status: e.target.stock.value,
      image_url: e.target.imageLink.value,
      created_date: new Date(),
      description: e.target.description.value,
      story: e.target.story.value,
      price: parseFloat(e.target.price.value),
      priority: newPriority,
    };
    fetch("http://localhost:5000/all-kits", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.insertedId) {
          toast.success(`Kit has been added successfully!`);
          e.target.reset();
          router.push("/all-kits")

        } else {
          toast.error(
            "Failed to add kit. Server responded, but insertion failed."
          );
          console.error("Server response data:", data);
        }
      })
      .catch((err) => {
        toast.error("Error . Please try again.");
      });
  };
  return (
    <>
      <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl text-center font-extrabold text-gray-900 mb-6 pb-3">
          Add New Kit
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* title */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Kit Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          {/* Category (Dropdown) */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category:
            </label>
            <select
              id="category"
              defaultValue={""}
              name="category"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Textile">Textile</option>
              <option value="Pottery">Pottery</option>
              <option value="Gardening">Gardening</option>
              <option value="Arts and Crafts">Arts and Crafts</option>
              <option value="Home Goods">Home Goods</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
            />
          </div>

          {/* Story */}
          <div>
            <label
              htmlFor="story"
              className="block text-sm font-medium text-gray-700"
            >
              Story:
            </label>
            <textarea
              id="story"
              name="story"
              required
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
            />
          </div>

          {/* Price (Number Input) */}
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm">
                Tk
              </span>
              <input
                type="number"
                id="price"
                name="price"
                required
                min="0"
                step="0.01"
                placeholder="550000"
                className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Stock status */}
          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock Status:
            </label>
            <select
              id="stock"
              defaultValue={""}
              name="stock"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select Stock Status
              </option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>

          {/* Image Link Input */}
          <div>
            <label
              htmlFor="imageLink"
              className="block text-sm font-medium text-gray-700"
            >
              Image Link (URL):
            </label>
            <input
              type="url"
              id="imageLink"
              name="imageLink"
              placeholder="e.g., https://example.com/property.jpg"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="pt-2 border-t mt-4 border-gray-200">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Posted By:
            </p>

            {/* User Name (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                User Name:
              </label>
              <input
                type="text"
                value={user.fullName || user.username || "Anonymous"}
                name="UserName"
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>

            {/* User Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                User Email:
              </label>
              <input
                type="email"
                name="email"
                value={user.primaryEmailAddress?.emailAddress || "N/A"}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* submit button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
      <Toaster />
    </>
  );
}
