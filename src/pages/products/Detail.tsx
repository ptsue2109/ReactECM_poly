import React from "react";
import ImageGallery from "react-image-gallery";
import { Link, useParams } from "react-router-dom";
import { currencyFm } from "../../ultils";
import { Tabs, Button, Breadcrumb, Card, Rate, Collapse, message, InputNumber } from "antd";
import { ScrollPanel } from 'primereact/scrollpanel';
import CardProduct from './../../components/CardProduct';
import { useAppSelector, useAppDispatch } from './../../app/stores/hooks';
import { userAddCart } from "../../app/stores/slices/orderSlice";
type Props = {};

const Detail = (props: Props) => {
  const { slug } = useParams();
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(state => state.productReducer);
  const {userInfo} = useAppSelector(state => state.authReducer)
  const productDetail = products.find((item) => item.slug === slug);
  const [quantity, setQuantity] = React.useState(0)
  document.title = `${productDetail?.name}`;

  const addToCart = () => {

    dispatch(userAddCart({
      products: {
        productImage: productDetail?.image[0].url!,
        productName: productDetail?.name!,
        cost: productDetail?.cost!,
        product: productDetail?._id!,
        price: productDetail?.price!,
        quantity: 1,
      }
    }));
    message.success('Thêm vào giỏ hàng thành công');

  };
  const onChange = (value: number) => {
    console.log('changed', value);
    setQuantity(value)

  };
  const { TabPane } = Tabs;
  const { Panel } = Collapse;
  const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;


  return (
    <>
      <div className="bread_cumb w-full container">
        <Breadcrumb
          separator=">"
          className=" shadow-3 absolute left-0 breadcrumb_a  p-2"
        >
          <Breadcrumb.Item>
            <Link to="/"> Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>products</Breadcrumb.Item>
          <Breadcrumb.Item>{productDetail?.name}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="grid ">
        <div className="col-12 clearfix"></div>
        <div className="col-6">
          <Card className="p-5">
            <ImageGallery
              showFullscreenButton={false}
              showPlayButton={false}
              autoPlay={true}
              items={
                productDetail?.image.map((item: any) => {
                  return {
                    original: item?.url,
                    thumbnail: item?.url,
                  };
                }) || []
              }
            />
          </Card>
        </div>
        <div className="col-6">
          {productDetail ? (
            <Card className="p-2">
              <h3>{productDetail?.name} </h3>
              <div className="flex align-items-center gap-5">
                <Rate
                  allowHalf
                  defaultValue={5}
                  style={{ fontSize: "30px" }}
                  disabled
                />
                <span>163 đánh giá</span>
              </div>
              <div className="flex justify-content-between align-items-center">
                <div className="flex">
                  <p className="text-4xl text-red-500 font-bold mt-3">
                    {currencyFm.format(productDetail?.cost)}
                  </p>
                  <p className="text-xl pt-3 pl-5  text-color mt-3 line-through">
                    {currencyFm.format(productDetail?.cost)}
                  </p>
                </div>
                <div className="border-primary max-w-7rem">
                  Trả góp chỉ từ 2.350.500₫/tháng
                </div>
              </div>
              <div className="detail-pro pro-info">
                <div className="flex justify-content-between gap-4 border-green-100">
                  <div className="">
                    <ul>
                      <li>
                        Danh mục:
                        <Link
                          to={`/categories/${productDetail?.categoryId?.slug}`}
                        >
                          {productDetail?.categoryId?.cateName}
                        </Link>
                      </li>
                      <li>Kho: {productDetail?.stock}</li>
                      <li>Mô tả ngắn : </li>
                    </ul>
                  </div>
                  <div className="flex-0">
                    <label className="mb-2">
                      <b>Số lượng</b>
                    </label>
                    <br />
                    <Button type="primary" onClick={addToCart}>
                      Thêm vào giỏ hàng
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ) : undefined}

          {/* Promotion and voucher */}
          <div className=" w-full flex gap-3 border-round">
            <div className="DescNCmt  col-12   ">
              <Collapse defaultActiveKey={['1']} >
                <Panel showArrow={false} header="CHƯƠNG TRÌNH KHUYẾN MÃI" key="panel2">
                  <p>{text}</p>
                </Panel>
                <Panel showArrow={false} prefixCls="true" header="PHƯƠNG THỨC THANH TOÁN" key="panel3">
                  <p>{text}</p>
                </Panel>
              </Collapse>
            </div>

          </div>
        </div>

        {/* Detail and same product  */}
        <div className=" w-full flex gap-2 border-round">
          <div className="DescNCmt  col-7   ">
            <Tabs defaultActiveKey="1" className="border-round_custom">
              <TabPane tab="Chi tiết sản phẩm" key="1" >
                <ScrollPanel style={{ width: '100%', height: '20rem' }}>
                  <div className="text-color p-2" dangerouslySetInnerHTML={{ __html: productDetail?.desc ? productDetail?.desc : 'chưa có thông tin chi tiết' }}></div>
                </ScrollPanel>
              </TabPane>
              <TabPane tab="Đáng giá sản phẩm" key="3">
                <div className="text-color p-2">
                  <p> LƯời chưa làm </p>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <div className="SameProduct col-5">

            <Tabs defaultActiveKey="1" className="border-round_custom">
              <TabPane tab="Sản phẩm liên quan" key="3" >
                <ScrollPanel style={{ width: '100%', height: '20rem' }}>
                  <CardProduct data={products} setSize="product_sm" /> </ScrollPanel>
              </TabPane>

            </Tabs>


          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
