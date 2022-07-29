import React from 'react'
import { Link, useNavigate, useSearchParams } from "react-router-dom";
type Props = {}

const Search = (props: Props) => {
    const navigate = useNavigate();
    const [searchParam] = useSearchParams();
    const [load, setLoad] = React.useState(false);
    
    React.useEffect(() => {
        if (searchParam.get("q") === null || searchParam.get("q") === "") {
            navigate("/", { replace: true });
        } else {
            console.log(searchParam.get("q"));
        }
    }, [searchParam]);

    return (
        <div>
            Search key : {searchParam.get("q")}
        </div>
    )
}

export default Search