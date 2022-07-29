import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
type Props = {
  data: any;
};

const Brands = ({ data }: Props) => {
  React.useEffect(() => {
    console.log("brands", data);
  }, []);
  return (
    <Card >
      <div className="flex justify-items-center gap-5 mt-6" style={{ width: "50px"}}>
        {data &&
          data.map((item: any, index: any) => (
            <div key={index}>
              <Link to={`/brands/${item?.slug}`}><img
                src={item?.image[0]?.url}
                alt=""
                style={{ width: "100px"}}
              /></Link>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default Brands;
