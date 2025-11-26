import React from 'react';
import Image from 'next/image';
import Link from 'next/link';  
import ReviewForm from '@/components/ReviewForm/ReviewForm';

async function getPost(kitId) {
    const url = `http://localhost:5000/all-kits/${kitId}`;
    const res = await fetch(url); 

    if (!res.ok) {
        console.error(`Fetch failed with status: ${res.status}`);
        throw new Error('Failed to fetch data'); 
    }
    
    const data = await res.json();
    return data.result;
}

export default async function Page(props) {
  const resolvedParams = await props.params;
    const kitId = resolvedParams.id;

    const data = await getPost(kitId);
    
    if (!data) {
        return <div><h1 className='text-3xl font-bold text-center'>Property Not Found</h1></div>;
    }
    const { 
        _id, 
        title, 
        price, 
        image_url, 
        category, 
        creator_name, 
        creator_email, 
        created_date, 
       stock_status, 
        description 
    } = data;

    return (
        <div>
            <div className="lg:flex grid grid-cols-1 gap-5 m-10 items-center">
                
                <div className="mr-10">
                    <Image
                        className="lg:w-350 lg:h-100 md:w-[200px] w-[250px] mx-auto lg:object-cover shadow-xl border-gray-500"
                        src={image_url} 
                        alt={title}
                        width={400} 
                        height={300}
                        style={{ objectFit: 'cover' }}
                    />
                </div>

           
                <div className="space-y-3 p-5">
                    <h1 className="font-extrabold text-3xl text-center">{title}</h1>
                    <p className="font-bold text-2xl text-center">Category: {category}</p>
                    <p className="font-bold text-2xl text-center">Posted by: <span className="text-[#632EE3]">{creator_name}</span></p>
                    <p className="font-bold text-2xl text-center">Contact Email: <span className="text-[#632EE3]">{creator_email}</span></p>
                    <p className="font-bold text-2xl text-center">Posted Date: <span className="text-[#632EE3]">{created_date}</span></p>
                    
                    <div className="border-b border-solid border-b-gray-300 mt-5"></div>
                    
                    <div className="lg:flex gap-2 m-5 justify-center items-center">
                        <div className="mr-10 flex gap-2 justify-center items-center">
                            <p className="font-bold text-2xl text-center"> Stock Status:</p>
                            <h1 className="font-extrabold text-2xl text-center">{stock_status}</h1>
                        </div>
                        <div className="mr-10 flex gap-2 justify-center items-center">
                            <p className="font-bold text-2xl text-center"> Price:</p>
                            <h1 className="font-extrabold text-2xl text-center">{price} TK</h1>
                        </div>
                    </div>
                    
                    <div className="mr-10">
                        <p className="font-bold text-center text-3xl mb-3 border-b-2 border-solid border-b-gray-400">Description</p>
                        <h1 className="font-extrabold text-2xl text-center">{description}</h1>
                    </div>
                </div>
            </div>

            <ReviewForm 
                kitData={{ 
                    _id, 
                    title, 
                    price, 
                    image_url
                }} 
            />

            <div className="flex justify-center items-center mb-5 mt-5">
                <Link
                    href="/all-kits" 
                    className="btn rounded-xl text-white bg-gradient-to-r from-[#632EE3] to-[#9F62F2] w-50"
                >
                    Go Back
                </Link>
            </div>
            <div className="border-b-2 border-solid border-b-gray-400 mb-5 ml-7 mr-7"></div>
        </div>
    );
}