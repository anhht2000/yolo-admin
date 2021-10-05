import {
  CButton,
  CContainer,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import DEFAULT from 'src/constant/comon'
import { actionGetAllProduct, getTotalPage } from 'src/redux/slice/productSlice'
import productApi from '../../core/productApi'

export default function ProductTable(props) {
  const { products } = props
  const history = useHistory()
  const dispatch = useDispatch()
  const totalPage = useSelector(getTotalPage)

  const [visible, setVisible] = useState({ status: false, id: '' })
  const handleDelete = async (id) => {
    await productApi.deleteProduct(id)
    dispatch(actionGetAllProduct())
    setVisible({ ...visible, status: false })
  }
  const handleChangeCheck = (value) => {
    //post api
    //get list again
  }
  return (
    <CContainer>
      <CTable width="100%">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ảnh</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Kích cỡ</CTableHeaderCell>
            <CTableHeaderCell scope="col">Màu sắc</CTableHeaderCell>
            <CTableHeaderCell scope="col">Hành động</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {products &&
            products.map((e, index) => {
              return (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">
                    {/* <CFormCheck
                      defaultChecked={e.active}
                      onChange={() => handleChangeCheck(e.active)}
                    /> */}
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <img
                      style={{ height: '80px', width: '100px', objectFit: 'cover' }}
                      className="hei"
                      src={DEFAULT.path + e?.productImg[0]?.imgPath}
                      alt=""
                    />
                  </CTableDataCell>
                  <CTableDataCell>{e.name}</CTableDataCell>
                  <CTableDataCell>
                    {e?.productOption
                      .filter((e) => e?.option?.name === 'size')
                      .map((e) => e?.optionValue?.name)
                      .join(' ')}
                  </CTableDataCell>
                  <CTableDataCell>
                    {e?.productOption
                      .filter((e) => e?.option?.name === 'color')
                      .map((e) => e?.optionValue?.name)
                      .join(' ')}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="success"
                      variant="outline"
                      className="me-1"
                      onClick={() => history.push('/product/' + e.id)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      variant="outline"
                      onClick={() => setVisible({ ...visible, status: true, id: e.id })}
                    >
                      Xóa
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
          <CTableRow className="d-block text-center">
            {/* <CPagination>
              <CPaginationItem aria-label="Previous" disabled>
                <span aria-hidden="true">&laquo;</span>
              </CPaginationItem>
              {totalPage.map((e, index) => (
                <CPaginationItem key={index}>1</CPaginationItem>
              ))}
              <CPaginationItem aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </CPaginationItem>
            </CPagination> */}
          </CTableRow>
        </CTableBody>
      </CTable>
      <CModal visible={visible.status} onDismiss={() => setVisible({ ...visible, status: false })}>
        <CModalHeader onDismiss={() => setVisible({ ...visible, status: false })}>
          <CModalTitle>Xác nhận</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xóa sản phẩm có id = {visible.id} không?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible({ ...visible, status: false })}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={() => handleDelete(visible.id)}>
            Xác nhận
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}
