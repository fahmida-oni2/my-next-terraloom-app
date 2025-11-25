import React from 'react'
async function getPost(kitId) {
    const res = await fetch(`http://localhost:5000/all-kits/${kitId}`);
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data.result;
}
export default async function page({ params }) {
    const {id} =  params ;
    const post = await getPost(id)
  return (
    <div>
      details page :   <h1>{post.title}</h1>
    </div>
  )
}

