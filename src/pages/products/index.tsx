import { InvestmentInfo } from "components";
import { ProductsUI } from "modules";
import { useState } from "react";

const Products = () => {
  const [info, setInfo] = useState(false);
  return (
    <>
      <InvestmentInfo show={info} close={() => setInfo(false)} />
      <ProductsUI subscribe={() => setInfo(true)} />
    </>
  );
};

export { Products };
