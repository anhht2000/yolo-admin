import React from 'react';

interface Props {}

export const TableE = (props: Props) => {
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
              <tr>
                <td>#MF-10000051</td>
                <td>Oct 28, 2021 09:10</td>
                <td>$493.89</td>
                <td>
                  <span className="label-warning status-label">Pending</span>
                </td>
                <td>
                  <span className="ps-btn ps-btn--sm ps-btn--small">Xem</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="ps-pagination"></div>
      </div>
    </div>
  );
};
