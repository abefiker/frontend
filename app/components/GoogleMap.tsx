// 'use client';
// import { useEffect, useState } from 'react';

// export default function GoogleMap({ lat, lng }: { lat: number; lng: number }) {
//     const [mapUrl, setMapUrl] = useState('');

//     useEffect(() => {
//         if (lat && lng) {
//             setMapUrl(`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${lat},${lng}`);
//         }
//     }, [lat, lng]);

//     if (!mapUrl) return <p className="text-gray-500">Loading map...</p>;

//     return (
//         <iframe
//             width="100%"
//             height="400"
//             style={{ border: 0, borderRadius: '8px' }}
//             loading="lazy"
//             allowFullScreen
//             referrerPolicy="no-referrer-when-downgrade"
//             src={mapUrl}
//         />
//     );
// }
