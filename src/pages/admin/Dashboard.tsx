import React from 'react'
import { Link } from 'react-router-dom'
import {pageTitle} from '../../ultils'
interface Props {
    
}

const Dashboard = (props: Props) => {
    React.useEffect(() =>{document.title= "Dashboard"; pageTitle('Thống kê')},[]);

    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
