import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { TableE } from '../../../components/common/TableE';
import LayoutContainer from '../../../layout/HomeLayout/LayoutContainer';

interface Props {}

export const HistoryOrder = (props: Props) => {
  return (
    <LayoutContainer>
      <div className="px-5 py-5 mx-1">
        <TableE />
      </div>
    </LayoutContainer>
  );
};
