import { useState, useEffect } from "react";

const CurTime = () => {
  const [date, setDate] = useState(new Date());
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

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
      {hours} &nbsp;:&nbsp; {minutes} &nbsp;:&nbsp; {seconds}
    </div>
  );
};

export default CurTime;
