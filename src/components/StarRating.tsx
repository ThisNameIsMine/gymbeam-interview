// src/components/StarRating.tsx
import { LuStar } from 'react-icons/lu';

interface StarRatingProps {
    rating: number;
    maxStars?: number;
    starSize?: string;
    className?: string;
}

export default function StarRating({
    rating,
    maxStars = 5,
    starSize = 'w-5 h-5', // 
    className = '',
}: StarRatingProps) {
    const fullStars = Math.floor(rating);
    const emptyStars = maxStars - fullStars;
    // Spočítame počet plných hviezd a prázdnych hviezd na základe hodnotenia
    // maxStars je predvolený na 5, ak nie je zadaný inak
    return (
        <div className={`flex items-center ${className}`}>
            {Array.from({ length: fullStars }).map((_, index) => (
                <LuStar key={`full-${index}`} className={`${starSize} text-yellow-400 fill-current`} />
            ))}
            {Array.from({ length: emptyStars }).map((_, index) => (
                <LuStar key={`empty-${index}`} className={`${starSize} text-gray-300 fill-current`} />
            ))}
        </div>
    );
}
