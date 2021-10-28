import moment from 'moment';
import React from 'react';
import { imgLogo } from '../../../assets';
import { useAppSelector } from '../../../hooks/reduxHooks';
import LayoutContainer from '../../../layout/HomeLayout/LayoutContainer';
import { getCurrentReceipt } from '../../../redux/reducers/order.reducer';

interface Props {}

export const DetailOrder = (props: Props) => {
  const data: any = useAppSelector(getCurrentReceipt);

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
                <span className="label-warning status-label">{data.status}</span>
              </span>
            </div>
            <div className="col-12">
              <span>Tổng tiền:</span> <span className="order-detail-value"> {data.totalPrice} VND </span>
            </div>
            <div className="col-12">
              <span>Phí ship:</span> <span className="order-detail-value"> 15.000 VND </span>
            </div>
            <div className="col-12"></div>
            <h5>Thông tin người đặt hàng</h5>
            <div className="col-12">
              <span>Họ và tên:</span> <span className="order-detail-value">{data.user.username}</span>
            </div>
            <div className="col-12">
              <span>Điện thoại:</span> <span className="order-detail-value">{data.user.phone}</span>
            </div>
            <div className="col-12">
              <span>Địa chỉ:</span> <span className="order-detail-value">{data.user.address}</span>
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
                    {data.receiptProducts.length > 0 &&
                      data.receiptProducts.map((item: any) => (
                        <tr key={item.id}>
                          <td className="text-center">1</td>
                          <td className="text-center">
                            <img
                              src="https://martfury.botble.com/storage/products/19-150x150.jpg"
                              width="50"
                              alt="NYX Beauty Couton Pallete Makeup 12"
                            />
                          </td>
                          <td>
                            NYX Beauty Couton Pallete Makeup 12 (SW-194-A0){' '}
                            <p className="mb-0">
                              <small>(Color: Green, Size: XL)</small>
                            </p>
                            <p className="d-block mb-0 sold-by">
                              <small>
                                Sold by:{' '}
                                <a href="https://martfury.botble.com/stores/jack-flatley">Jack Flatley</a>
                              </small>
                            </p>
                          </td>
                          <td>₹1,132.00</td>
                          <td className="text-center">1</td>
                          <td className="money text-right">
                            <strong>₹1,132.00</strong>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <span className="ps-btn ps-btn--sm ps-btn--danger">Quay lại</span>
            </div>
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
};
