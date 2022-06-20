import { useState, useEffect } from "react";

import { lpad } from "utils/string";

const CurTime = () => {
  const [date, setDate] = useState(new Date());

  const hours = lpad(date.getHours(), 2, "0");
  const minutes = lpad(date.getMinutes(), 2, "0");
  const seconds = lpad(date.getSeconds(), 2, "0");

  useEffect(() => {
    const refreshDate = () => {
      setDate(new Date());
    };

    const refreshInterval = setInterval(refreshDate, 1000);

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
