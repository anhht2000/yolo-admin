import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { actionSetCurrentReceipt } from '../../redux/reducers/order.reducer';

interface Props {
  data: any[];
}

export const TableE = ({ data }: Props) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const handleClickView = (data: any) => {
    dispatch(actionSetCurrentReceipt(data));
    history.push('/detail');
  };
  return (
    <div className="ps-section__right">
      <div className="ps-section__header">
        <h2>Lịch sử đơn hàng</h2>
      </div>
      <div className="ps-section__content">
        <div className="table-responsive">
          <table className="table ps-table--wishlist">
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Ngày tạo</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 &&
                data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>#{item.id}</td>
                      <td>{moment(item.createDate).format('DD-MM-YYYY hh:mm:ss')}</td>
                      <td>{item.totalPrice} VND</td>
                      <td>
                        <span className="label-warning status-label">{item.status}</span>
                      </td>
                      <td>
                        <span
                          className="ps-btn ps-btn--sm ps-btn--small"
                          onClick={() => {
                            handleClickView(item);
                          }}>
                          Xem
                        </span>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="ps-pagination"></div>
      </div>
    </div>
  );
};
