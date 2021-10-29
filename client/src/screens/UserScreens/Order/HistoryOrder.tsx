import React, { useEffect } from 'react';
import { TableE } from '../../../components/common/TableE';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import LayoutContainer from '../../../layout/HomeLayout/LayoutContainer';
import {
  actionGetReceiptUser,
  getCurrentPageReceipt,
  getDataReceipt,
} from '../../../redux/reducers/order.reducer';

interface Props {}

export const HistoryOrder = (props: Props) => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector(getCurrentPageReceipt);
  const receipt = useAppSelector(getDataReceipt);
  useEffect(() => {
    dispatch(actionGetReceiptUser({ page: currentPage }));
  }, [currentPage, dispatch]);
  return (
    <LayoutContainer>
      <div className="px-5 py-5 mx-1">
        <TableE data={receipt} />
      </div>
    </LayoutContainer>
  );
};
