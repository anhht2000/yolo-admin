import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import { imgLogo } from '../../../assets';
import { useAppSelector } from '../../../hooks/reduxHooks';
import LayoutContainer from '../../../layout/HomeLayout/LayoutContainer';
import { getCurrentReceipt } from '../../../redux/reducers/order.reducer';

interface Props {}

export const DetailOrder = (props: Props) => {
  const data: any = useAppSelector(getCurrentReceipt);
  const history = useHistory();

  return (
    <LayoutContainer>
      <div className="card ">
        <div className="card-header">
          <h3 className="my-3">Chi tiết đơn đặt hàng</h3>
        </div>
        <div className="card-body p-4">
          <div className="customer-order-detail">
            <div className="row">
              <div className="col-md-6">
                <div className="order-slogan">
                  <img width="100" src={imgLogo.logo} alt="Martfury - Laravel Ecommerce system" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="order-meta">
                  <p>
                    <span>Mã hóa đơn:</span> <span className="order-detail-value">#{data?.id}</span>
                  </p>
                  <span>Thời gian:</span>{' '}
                  <span className="order-detail-value">
                    {moment(data.createDate).format('DD-MM-YYYY hh:mm:ss')}
                  </span>
                </div>
              </div>
            </div>
            <h5>Thông tin đơn hàng</h5>
            <div className="col-12">
              <span>Trạng thái đơn hàng:</span>{' '}
              <span className="order-detail-value">
                <span className="label-warning status-label">{data?.status}</span>
              </span>
            </div>
            <div className="col-12">
              <span>Tổng tiền:</span> <span className="order-detail-value"> {data?.totalPrice} VND </span>
            </div>
            <div className="col-12">
              <span>Phí ship:</span> <span className="order-detail-value"> 15.000 VND </span>
            </div>
            <div className="col-12"></div>
            <h5>Thông tin người đặt hàng</h5>
            <div className="col-12">
              <span>Họ và tên:</span> <span className="order-detail-value">{data?.user?.username}</span>
            </div>
            <div className="col-12">
              <span>Điện thoại:</span> <span className="order-detail-value">{data?.user?.phone}</span>
            </div>
            <div className="col-12">
              <span>Địa chỉ:</span> <span className="order-detail-value">{data?.user?.address}</span>
            </div>
            <h5>Chi tiết đặt hàng</h5>
            <div className="col-12">
              <div className="table-responsive">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th className="text-center">Ảnh</th>
                      <th>Sản phẩm</th>
                      <th className="text-center">Giá sản phẩm</th>
                      <th className="text-right">Số lượng</th>
                      <th className="price text-right">Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.receiptProducts?.length > 0 &&
                      data.receiptProducts?.map((item: any, index: any) => (
                        <tr key={item?.id}>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/${item?.product[0]?.productImg[0].imgPath}`}
                              width="50"
                              alt="NYX Beauty Couton Pallete Makeup 12"
                            />
                          </td>
                          <td>
                            {item?.pruductName}
                            <p className="mb-0">
                              <small>
                                {item?.receiptOptionProducts.map((vl: any) => {
                                  return `${vl.productOptionName}:${vl.productOptionValue} `;
                                })}
                              </small>
                            </p>
                          </td>
                          <td className="text-center">{item?.unitPrice} VND</td>
                          <td className="">{item?.quanlity} </td>
                          <td className="money text-right">
                            <strong>{item?.unitPrice * item?.quanlity} VND</strong>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <span className="ps-btn ps-btn--sm ps-btn--danger" onClick={() => history.push('/history')}>
                Quay lại
              </span>
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};
