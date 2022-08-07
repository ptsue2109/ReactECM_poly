import styled from "styled-components";

export const Container = styled.div`
  max-width: 630px;
  width: 100%;
  padding: 0 15px;
  margin: 15px auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: #d70018;
  margin-bottom: 15px;

  a {
    position: absolute;
    left: 0;
    display: flex;
    color: #d70018;
    align-items: center;
  }
`;

export const BoxItem = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.1);
  border-radius: 15px;
  padding: 15px;
  color: #000;
  gap: 15px;
  margin-bottom: 15px;
  word-break: break-word;
`;

export const BoxImage = styled.img`
  max-width: 200px;
  min-width: 200px;
  max-height: 200px;
  min-height: 200px;
  border-style: none;
  vertical-align: middle;
  object-fit: contain;
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  .title {
    width: calc(100% - 20px);
  }

  .price {
    display: flex;
    align-items: center;
    gap: 15px;
    &-old {
      color: #d70018;
      font-size: 15px;
    }
    &-sale {
      font-size: 14px;
      color: #777777;
    }
    &-percent {
      background-color:  #d70018;
      color: #fff;
      font-size: 12px;
      padding: 0 5px;
      line-height: 18px;
      border-radius: 5px;
    }
    margin: 10px 0 15px;
  }

  .close-btn {
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
  }

  .amount {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
    span {
      line-height: 1.5;
    }
  }

  .ant-input-group {
    width: auto;
  }

  .ant-input,
  .ant-btn {
    width: 30px;
    height: 25px;
    padding: 0;
    text-align: center;

    &:hover,
    &:focus,
    &:active {
      border-color: #d9d9d9;
      color: #000;
    }
    &::after {
      outline: 0;
      box-shadow: 0;
      background-color: transparent;
    }
  }

  .ant-input {
    border-left: 0;
    border-right: 0;
  }

  .ant-btn {
    &:first-child {
      border-right: 0;
    }
    &:last-child {
      border-left: 0;
    }
  }
`;

export const Description = styled.div`
  background: #f6f6f6;
  border-radius: 10px;
  padding: 15px;
`;

export const TotalPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  margin-bottom: 15px;

  h2 {
    color:  #d70018;
    font-size: 16px;
  }
`;

export const ButtonGroup = styled.div`
  button {
    width: 100%;
    margin-bottom: 15px;
    padding: 10px;
    height: auto;
    text-transform: uppercase;
  }
`;
