// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import Carousel from 'react-bootstrap/Carousel';

// export default function ShowCarousel() {
//     const MirCarousel = () => {
        
//         const [carousel, setCarousel] = useState([])

//         const getCarousel = async () => {
//             const response = await axios.get('http://localhost:8000')
//             setCarousel(response.data)
//         }

//         useEffect(() => {
//             getCarousel();
//         }, [])

//         return (
//             <div>
//                 {
//                     carousel.map((car,id) => {
//                         <div>
//                             <p>{car.word}</p>
//                         </div>
//                     })
//                 }
//             </div>
//         )
//     }
// }