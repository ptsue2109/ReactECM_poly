import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Access = ({ data ,title}: any) => {
  return (
    <>
    <div className="flex justify-content-between mt-3 my-5">
    <h3 className="mt-5 uppercase font-bold">{title}</h3>
     <Link to={'/'} className="text-color hover:text-red-600 text-lg">Xem tất cả</Link>
    </div>
    <GridBox>
      {data && data.map((item: any, index: any) => (
        <GridItem key={index} style={{ backgroundColor: `${item?.Bgcolor}`, backgroundImage: `url(${item?.image})` }} className="shadow-3 border-round-xl hover:shadow-5 cursor-pointer">
          <Link to="" className="item-categories" >
            <span className="text-50 text-base mx-auto px-1">{item?.name}</span>
          </Link>
        </GridItem>
      ))}
    </GridBox></>
  );
};

export default Access;

const GridBox = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(10,1fr);
  margin-bottom: 5rem;
`;

const GridItem = styled.div`
  width: 111px;
  height: 125px;
`