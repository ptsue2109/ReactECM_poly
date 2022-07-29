import React from 'react'
import { useAppDispatch, useAppSelector } from './../../app/stores/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductByBrand } from "../../app/stores/thunks/brandThunk"
import CardProduct from '../../components/CardProduct';
import { Card } from 'antd';
type Props = {}

const ProductBrand = (props: Props) => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const {  brand , products} = useAppSelector((state) => state.brandReducer);

  React.useEffect(() => {
    dispatch(fetchProductByBrand(slug))
  }, [dispatch, slug]);

  return (
    <>
      <Card className="w-full mt-5"><CardProduct data={products} brands={brand}/></Card>

    </>
  )
}

export default ProductBrand