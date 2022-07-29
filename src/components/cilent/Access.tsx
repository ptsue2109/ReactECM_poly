import { Card, Image } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Access = ({ data }: any) => {
  React.useEffect(() => {
  }, []);

  return (
    <FlexBox>
      {data && data.map((item: any, index: any) => (
        <Card className="border-none" key={index}>
          <div className={`${item?.Bgcolor} border-round-xl shadow-3 hover:shadow-8`} >
            <Link to="#"><AceessName>{item?.name}</AceessName></Link>
            <Link to="#">
              <img
                src={item?.image}
                className="h-full max-w-7rem"
              />
            </Link>
          </div>
        </Card>))}
    </FlexBox>
  );
};

export default Access;

const FlexBox = styled.div`
  display: flex;
  flex-wrap: wrap;  
  gap: 10px;
`;

const AceessName = styled.div`
  text-align: center;
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #efecec;
  z-index: 99999

`