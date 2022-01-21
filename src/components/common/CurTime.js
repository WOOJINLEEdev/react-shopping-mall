import React, { useState, useEffect } from "react";

const CurTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const getDate = () => {
      setDate(new Date());
    };

    const refreshInterval = setInterval(() => getDate(), 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div>
      {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}
      &nbsp;:&nbsp;
      {date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}
      &nbsp;:&nbsp;
      {date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()}
    </div>
  );
};

export default CurTime;
