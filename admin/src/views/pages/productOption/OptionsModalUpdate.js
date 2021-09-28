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

const OptionsModalUpdate = (props) => {
  const { visibleUpdate, setVisibleUpdate } = props
  return (
    <CModal visible={visibleUpdate} onDismiss={() => setVisibleUpdate(false)}>
      <CModalHeader>
        <CModalTitle>Sửa Options</CModalTitle>
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
  )
}

export default OptionsModalUpdate
