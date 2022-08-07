import React from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {SearchProduct} from "../app/stores/thunks/productThunk"
type Props = {}

const Search = (props: Props) => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    console.log('searchParam',searchParam);
    
    const [load, setLoad] = React.useState(false);
    
    React.useEffect(() => {
        if (searchParam.get("q") === null || searchParam.get("q") === "") {
            navigate("/", { replace: true });
        } else {
            console.log(searchParam.get("q"));
        }
    }, [searchParam]);

    return (
        <div className='container '>
            Search key : {searchParam.get("q")} <br />
            Tìm thấy 7195 sản phẩm cho từ khoá 'd'
        
            
        </div>
    )
}

export default Search