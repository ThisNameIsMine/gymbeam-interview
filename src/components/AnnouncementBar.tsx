"use client";
import React from 'react'

function AnnouncementBar({ message }: { message: string }) {
    const [displayMessage, setDisplayMessage] = React.useState(message);
    if (!displayMessage) {
        console.log("No message to display in AnnouncementBar");
        return null; // If no message, don't render the bar
    }
    return (
        <div className="text-white text-center py-2 w-full" style={{ backgroundColor: '#ff4410' }}>
            <p>{displayMessage}</p>
        </div >
    )
}

export default AnnouncementBar