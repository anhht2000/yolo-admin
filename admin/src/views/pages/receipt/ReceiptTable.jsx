import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import Pagination from 'src/components/product/Pagination'

export default function ReceiptTable({ data }) {
  const formatDate = (time) => {
    const day = `0${new Date(time).getDate()}`.slice(0, 2)
    const month = `0${new Date(time).getMonth()}`.slice(0, 2)
    const year = new Date(time).getFullYear()
    const value = `${day} / ${month} / ${year}`
    return value
  }
  return (
    <CCard>
      <CCardBody>
        <CTable width="100%" color="light" hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              <CTableHeaderCell scope="col">Mã hóa đơn</CTableHeaderCell>
              <CTableHeaderCell scope="col">SĐT đặt hàng</CTableHeaderCell>
              <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tổng tiền</CTableHeaderCell>
              <CTableHeaderCell scope="col">Ngày Tạo</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data &&
              data.map((e, index) => {
                return (
                  <CTableRow align="middle" key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{e?.id}</CTableDataCell>
                    <CTableDataCell className="row__table">{e?.user?.phone}</CTableDataCell>
                    <CTableDataCell className="row__table">{e?.user?.address}</CTableDataCell>
                    <CTableDataCell className="row__table">{e?.totalPrice}</CTableDataCell>
                    <CTableDataCell>{formatDate(e?.createDate)}</CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
      </CCardBody>
      {/* {data && (
        <CCardHeader className="flex_option">
          <Pagination
            currentPage={options.page?.currentPage}
            totalPage={options.page?.totalPage}
            changeData={getOptionApi}
          />
        </CCardHeader>
      )} */}
    </CCard>
  )
}
