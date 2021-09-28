import {
  CButton,
  CContainer,
  CFormCheck,
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
import { useHistory } from 'react-router'
// import PropTypes from 'prop-types'

export default function ProductTable(props) {
  const { products } = props
  const [visible, setVisible] = useState({ status: false, slug: '' })
  const handleDelete = () => {
    console.log('xoas', visible.slug)
    setVisible({ ...visible, status: false })
  }
  const handleChangeCheck = (value) => {
    //post api
    console.log(!value)
    //get list again
  }
  const history = useHistory()
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
                    <CFormCheck
                      defaultChecked={e.active}
                      onChange={() => handleChangeCheck(e.active)}
                    />
                  </CTableHeaderCell>
                  <CTableDataCell>
                    <img style={{ height: '80px' }} className="hei" src={e.image01} alt="" />
                  </CTableDataCell>
                  <CTableDataCell>{e.title}</CTableDataCell>
                  <CTableDataCell>{e.size.join(', ')}</CTableDataCell>
                  <CTableDataCell>{e.colors.join(', ')}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="success"
                      variant="outline"
                      className="me-1"
                      onClick={() => history.push('/product/' + e.slug)}
                    >
                      Sửa
                    </CButton>
                    <CButton
                      color="danger"
                      variant="outline"
                      onClick={() => setVisible({ ...visible, status: true, slug: e.slug })}
                    >
                      Xóa
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CModal visible={visible.status} onDismiss={() => setVisible({ ...visible, status: false })}>
        <CModalHeader onDismiss={() => setVisible({ ...visible, status: false })}>
          <CModalTitle>Xác nhận</CModalTitle>
        </CModalHeader>
        <CModalBody>Bạn có chắc chắn muốn xóa sản phẩm {visible.slug} không?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible({ ...visible, status: false })}>
            Đóng
          </CButton>
          <CButton color="primary" onClick={handleDelete}>
            Xác nhận
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

// ProductTable.propsType = {
//   products: PropTypes.string,
// }
