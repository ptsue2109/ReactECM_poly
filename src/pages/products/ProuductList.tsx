import { Card } from 'antd';
import React from 'react'
import CardProduct from '../../components/CardProduct';
import { useAppDispatch, useAppSelector } from './../../app/stores/hooks';
type Props = {}

const ProuductList = (props: Props) => {
    const {products} = useAppSelector(state => state.productReducer)
  return (
    <div>
         <Card className="w-full mt-5"><CardProduct data={products}/></Card>
    </div>
  )
}

export default ProuductList