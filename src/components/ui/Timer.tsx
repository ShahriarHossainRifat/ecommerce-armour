// src/components/ui/Timer.tsx
import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimerProps {
  targetDate: Date; // Pass the end date for the deal
}

const calculateTimeLeft = (targetDate: Date): TimeLeft | null => {
  const difference = +targetDate - +new Date();
  let timeLeft: TimeLeft | null = null;

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const formatTime = (time: number): string => {
  return time < 10 ? `0${time}` : `${time}`;
};

const Timer: React.FC<TimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
    calculateTimeLeft(targetDate)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    // Clear interval if the component is unmounted or time runs out
    if (!timeLeft) {
      clearTimeout(timer);
    }
    return () => clearTimeout(timer);
  }); // Runs on every render to update the timer

  if (!timeLeft) {
    return (
      <div className="text-brand-primary font-semibold">Deal Expired!</div>
    );
  }

  return (
    <div className="flex items-center gap-2 md:gap-4">
      {/* Days */}
      <div className="text-center">
        <div className="w-[63px] h-[63px] bg-white shadow-md rounded-lg flex items-center justify-center font-digital text-2xl md:text-3xl text-brand-gray-dark mb-1">
          {formatTime(timeLeft.days)}
        </div>
        <span className="text-sm md:text-base font-sans text-brand-gray-dark">
          Days
        </span>
      </div>
      {/* Separator (Optional) */}
      {/* <span className="text-3xl text-brand-gray-dark">:</span> */}

      {/* Hours */}
      <div className="text-center">
        <div className="w-[63px] h-[63px] bg-white shadow-md rounded-lg flex items-center justify-center font-digital text-2xl md:text-3xl text-brand-gray-dark mb-1">
          {formatTime(timeLeft.hours)}
        </div>
        <span className="text-sm md:text-base font-sans text-brand-gray-dark">
          Hr
        </span>
      </div>
      {/* Separator (Optional) */}
      {/* <span className="text-3xl text-brand-gray-dark">:</span> */}

      {/* Minutes */}
      <div className="text-center">
        <div className="w-[63px] h-[63px] bg-white shadow-md rounded-lg flex items-center justify-center font-digital text-2xl md:text-3xl text-brand-gray-dark mb-1">
          {formatTime(timeLeft.minutes)}
        </div>
        <span className="text-sm md:text-base font-sans text-brand-gray-dark">
          Mins
        </span>
      </div>
      {/* Separator (Optional) */}
      {/* <span className="text-3xl text-brand-gray-dark">:</span> */}

      {/* Seconds */}
      <div className="text-center">
        <div className="w-[63px] h-[63px] bg-white shadow-md rounded-lg flex items-center justify-center font-digital text-2xl md:text-3xl text-brand-gray-dark mb-1">
          {formatTime(timeLeft.seconds)}
        </div>
        <span className="text-sm md:text-base font-sans text-brand-gray-dark">
          Sec
        </span>
      </div>
    </div>
  );
};

export default Timer;
