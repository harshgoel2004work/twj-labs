"use client"

import { saveLeadToDatabase } from '@/actions/submit-lead';
import React from 'react'

const APITest = () => {
    const handleSendDummyData = () => {
        const dummyData = {
            name: "John Doe",
            company: "Acme Corp",
            contact: "john.doe@example.com",
            services: ["Web Development", "SEO"],
            budget: "$5000 - $10000",
            website: "https://acme-corp.com",
            projectDetails: "Looking to revamp our company website with modern design and SEO optimization."
        };

        saveLeadToDatabase(dummyData);
    }
  return (
    <div>
        <button onClick={handleSendDummyData} className='bg-white rounded-full px-6 py-3 cursor-pointer'>
            Test Button
        </button>
    </div>
  )
}

export default APITest