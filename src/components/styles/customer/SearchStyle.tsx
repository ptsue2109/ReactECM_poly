import styled, { css } from "styled-components";

export const StyledSearch = styled.div<{ search?: boolean }>`
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 9999;
   color: black;
  & .search-form {
    width: 100%;
    height: 35px;
    position: relative;
    z-index: 1200;

    &-input {
      width: 100%;
      height: 100%;
      outline: none;
      border: 0;
      ${(props) =>
        props.search
          ? css`
              border-top-left-radius: 10px;
              border-top-right-radius: 10px;
            `
          : "border-radius: 10px;"}
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      padding-left: 40px;
      padding-right: 15px;
      text-overflow: ellipsis;
    }

    &-icon {
      height: 100%;
      width: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
      font-size: inherit;

      & svg {
        width: 15px;
        height: 15px;
        fill: var(--color);
        margin-bottom: -1px;
      }
    }
  }
`;

export const StyledSearchResult = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  top: 100%;
  background-color: #fff;
  box-shadow: 0px 2px 0px #ddd;
  height: auto;
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  list-style: none;
  margin: 0;
  z-index: 1200;

  & a {
    display: flex;
    align-items: center;
    padding: 5px;
    color: #444;
    border-bottom: 1px solid #eee;

    &:last-child {
      border: 0;
    }

    &:hover {
      color: #000;
    }

    span {
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      white-space: nowrap;
    }

    img {
      width: 40px;
      margin-right: 15px;
      vertical-align: middle;
    }
  }
`;