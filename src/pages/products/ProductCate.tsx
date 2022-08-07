import React from 'react'
import { useAppDispatch, useAppSelector } from './../../app/stores/hooks';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAsyncCategorySelected } from "../../app/stores/thunks/cateThunk"
import CardProduct from '../../components/CardProduct';
import { Card } from 'antd';
type Props = {}

const ProductCate = (props: Props) => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const {  category , products} = useAppSelector((state) => state.cateReducer);
  
  React.useEffect(() => {
    dispatch(fetchAsyncCategorySelected(slug))
  }, [dispatch, slug]);

  return (
    <>
      <Card className="w-full mt-5"><CardProduct data={products}/></Card>

    </>
  )
}

export default ProductCate