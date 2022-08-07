import { RiSearchLine } from 'react-icons/ri';
import { useEffect, useState } from "react";
import { StyledSearch, StyledSearchResult } from "../../../styles/customer/SearchStyle";
import { SearchProduct } from "../../../../app/stores/thunks/productThunk";
import { useAppDispatch, useAppSelector } from '../../../../app/stores/hooks';
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import { currencyFm } from '../../../../ultils';

type Props = {};

const Search = (props: Props) => {
   const [isOpen, setOpen] = useState<boolean>(false);
   const [isLoading, setLoading] = useState<boolean>(true);
   const [searchValue, setSearchValue] = useState<string>("");
   const [searchData, setSearchData] = useState<any[]>([]);
   const { products } = useAppSelector(state => state.productReducer)
   const dispatch = useAppDispatch();
   const debounceDropDown = debounce(setSearchValue, 500);

   const fetchDataSearch = async () => {
      setOpen(!!searchValue);
      setLoading(!searchValue);
      if (!searchValue) return setSearchData([]);
      dispatch(SearchProduct(searchValue))
         setSearchData(products);
         setTimeout(() => {
            setLoading(false);
         }, 500);
   };

   useEffect(() => {
      fetchDataSearch();
   }, [searchValue]);

   useEffect(() => {
      document.addEventListener("click", (e: any) => {
         const search = document.getElementById("searchId");
         if (!search?.contains(e.target)) {
            setOpen(false);
         }
      });
   }, []);

   return (
      <StyledSearch search={isOpen} id="searchId">
         <form className="search-form">
            <input
               type="text"
               className="search-form-input"
               placeholder="Nhập từ khóa tìm kiếm..."
               onFocus={() => setOpen(!!searchValue)}
               onKeyUp={(e) => debounceDropDown(e.target.value)}
            />
            <div className="search-form-icon">
               <RiSearchLine />
            </div>
         </form>
         {isOpen && (
            <StyledSearchResult>
               {isLoading ? (
                  <a>Đang tìm kiếm...</a>
               ) : searchData?.length ? (
                  searchData.map((product) => (
                     <Link
                        key={product?._id}
                        to={`/products/${product.slug}`}
                        onClick={() => setOpen(false)}
                     >
                        <img src={product.image[0].url} alt="" />
                        <span>{product.name}</span>
                        <span>{currencyFm.format( product.cost)}</span>
                     </Link>
                  ))
               ) : (
                  <a>Không có kết quả với từ khóa: "{searchValue}"</a>
               )}
            </StyledSearchResult>
         )}
      </StyledSearch>
   );
};

export default Search;