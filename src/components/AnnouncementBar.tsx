"use client";
import React from 'react'

function AnnouncementBar({ message }: { message: string }) {

    if (!message || message.trim() === "") {
        console.log("No message to display in AnnouncementBar");
        return null; // 
    }
    // Horný riadok s oznamom, ktorý sa zobrazuje na stránke
    return (
        <div className="text-white text-center py-2 w-full" style={{ backgroundColor: '#ff4410' }}>
            <p>{message}</p>
        </div >
    )
}

export default AnnouncementBar