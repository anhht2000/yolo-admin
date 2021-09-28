import {
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React from 'react'

const OptionsVariantModalAdd = (props) => {
  const { visibleAdd, setVisibleAdd } = props
  return (
    <CModal visible={visibleAdd} onDismiss={() => setVisibleAdd(false)}>
      <CModalHeader>
        <CModalTitle>Thêm thuộc tính</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h5>Tên Options</h5>
        <CFormSelect aria-label="Default select example">
          {/* api fake data */}
          <option>Open this select menu</option>
          <option value="1">Kích Thước</option>
          <option value="2">Màu sắc</option>
          <option value="3">Chất liệu</option>
        </CFormSelect>
        <h5>Tên Thuộc tính</h5>
        <CFormInput type="text" placeholder="Ect... XL" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
          Đóng
        </CButton>
        <CButton color="primary">Lưu thuộc tính</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsVariantModalAdd
