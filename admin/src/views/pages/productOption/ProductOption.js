import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilDelete, cilPencil, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
const ProductOption = () => {
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="flex_option">
              <div>
                <strong>Quản lý Options Sản phẩm</strong> <small>(Size, color, ...)</small>
              </div>
              <div>
                <CButton
                  color={'primary'}
                  style={{ padding: '4px 8px' }}
                  onClick={() => {
                    setVisibleAdd(true)
                  }}
                >
                  <CIcon
                    icon={cilPlus}
                    className="me-2"
                    style={{ height: '15px', width: '15px' }}
                  />
                  Thêm
                </CButton>
              </div>
            </CCardHeader>
            <CCardHeader className="flex_option gap">
              <CFormInput type="text" placeholder="options" />
              <CButton color={'primary'} style={{ padding: '6px 11px', width: '10%' }}>
                Tìm kiếm
              </CButton>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                    <CTableHeaderCell scope="col">OptionName</CTableHeaderCell>
                    <CTableHeaderCell scope="col">DayCreate</CTableHeaderCell>
                    <CTableHeaderCell scope="col">DayUpdate</CTableHeaderCell>
                    <CTableHeaderCell scope="col">DayDelete</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                    <CTableDataCell>Mark</CTableDataCell>
                    <CTableDataCell>Otto</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                    <CTableDataCell>@mdo</CTableDataCell>
                    <CTableDataCell>
                      <div>
                        <CIcon
                          icon={cilPencil}
                          className="me-2 icon-hover"
                          style={{ height: '15px', width: '15px' }}
                          onClick={() => {
                            setVisibleUpdate(true)
                          }}
                        />
                        <CIcon
                          icon={cilDelete}
                          onClick={() => {
                            setVisible(!visible)
                          }}
                          className="me-2 icon-hover"
                          style={{ height: '15px', width: '15px' }}
                        />
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CModal visible={visible} onDismiss={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Xác nhận xóa</CModalTitle>
        </CModalHeader>
        <CModalBody>Xác nhận xóa Options của sản phẩm</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={visible} onDismiss={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Xác nhận xóa</CModalTitle>
        </CModalHeader>
        <CModalBody>Xác nhận xóa Options của sản phẩm</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="primary">Save changes</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={visibleAdd} onDismiss={() => setVisibleAdd(false)}>
        <CModalHeader>
          <CModalTitle>Thêm sản phẩm</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h3>Tên Options</h3>
          <CFormInput type="text" placeholder="Ect... Kích Thước" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
            Đóng
          </CButton>
          <CButton color="primary">Lưu sản phẩm</CButton>
        </CModalFooter>
      </CModal>
      <CModal visible={visibleUpdate} onDismiss={() => setVisibleUpdate(false)}>
        <CModalHeader>
          <CModalTitle>Sửa sản phẩm</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <h3>Tên Options</h3>
          <CFormInput type="text" placeholder="Ect... Kích Thước" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisibleUpdate(false)}>
            Đóng
          </CButton>
          <CButton color="primary">Lưu thay đổi</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ProductOption
