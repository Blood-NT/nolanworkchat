import React, { useState, useEffect } from 'react';
import "./clockComponent.css"
const ClockComponent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getTimeByTimezone = (timezone) => {
    const options = {
      timeZone: timezone,
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return currentTime.toLocaleTimeString([], options);
  };

  return (
 
    <div className="digital-clock">
      {getTimeByTimezone('Asia/Ho_Chi_Minh')}
    </div>

  );
};

export default ClockComponent;
