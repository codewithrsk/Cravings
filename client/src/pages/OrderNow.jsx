import React, { useEffect, useState } from "react";
import DataNotFound from "../assets/NodataFound.gif";

const OrderNow = () => {
  const [isLoding, setIsLoding] = useState(true);

  if (isLoding) {
    return (
      <>
        <div className="w-[94vh] h-[94vh]">
          <img src={DataNotFound} alt="" className="h-full w-full" />
        </div>
      </>
    );
  }

  return (
    <>
      <div>OrderNow</div>
    </>
  );
};

export default OrderNow;
