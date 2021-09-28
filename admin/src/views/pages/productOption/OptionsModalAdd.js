import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React from 'react'

const OptionsModalAdd = (props) => {
  const { visibleAdd, setVisibleAdd } = props
  return (
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
        <CButton color="primary">Lưu Options</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsModalAdd
