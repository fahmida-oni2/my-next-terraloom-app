import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingComponent = ({ value, onChange, onBlur, name, ratingCount = 5}) => {
    const stars = Array(ratingCount).fill(0);

  const handleClick = (index) => {
    onChange(index + 1); 
  };
    return (
        <div className="flex justify-center items-center gap-1" onBlur={onBlur}>
      {stars.map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name={name}
              value={ratingValue}
              onClick={() => handleClick(index)}
              className="hidden"
            />
            <FaStar
              size={30}
              className="cursor-pointer transition-colors duration-200"
              color={ratingValue <= value ? "#ffc107" : "#e4e5e9"}
            />
          </label>
        );
      })}
    </div>
  );
};

export default RatingComponent;