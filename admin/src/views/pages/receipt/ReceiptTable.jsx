import {
  CCard,
  CCardBody,
  CFormSelect,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'src/components/pagination/Pagination'
import {
  actionGetAllReceipt,
  getCurrentPageReceipts,
  getTotalPageReceipts,
} from 'src/redux/slice/receiptSlice'
import receiptApi from '../../../config/receiptApi'

export default function ReceiptTable({ data }) {
  const dispatch = useDispatch()
  const formatDate = (time) => {
    const day = `0${new Date(time).getDate()}`.slice(0, 2)
    const month = `0${new Date(time).getMonth()}`.slice(0, 2)
    const year = new Date(time).getFullYear()
    const value = `${day} / ${month} / ${year}`
    return value
  }
  const totalPage = useSelector(getTotalPageReceipts)
  const currentPage = useSelector(getCurrentPageReceipts)
  const changePage = (value) => {
    dispatch(actionGetAllReceipt(value))
  }
  const handleChangeSelect = async ({ target }) => {
    const { value, name } = target
    await receiptApi.changeStatusReceipts(name, value)
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
              <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
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
                    <CTableDataCell>
                      <CFormSelect
                        size="sm"
                        defaultValue={e?.status}
                        name={e?.id}
                        onChange={handleChangeSelect}
                      >
                        <option value="success">Success</option>
                        <option value="processing">Processing</option>
                        <option value="cancel">Cancel</option>
                      </CFormSelect>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
      </CCardBody>
      {data && (
        <Pagination currentPage={currentPage} totalPage={totalPage} changeData={changePage} />
      )}
    </CCard>
  )
}
