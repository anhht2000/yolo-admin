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

const OptionsVariantModalUpdate = (props) => {
  const { visibleUpdate, setVisibleUpdate } = props
  return (
    <CModal visible={visibleUpdate} onDismiss={() => setVisibleUpdate(false)}>
      <CModalHeader>
        <CModalTitle>Sửa thuộc tính của option: {'color'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h3>Tên thuộc tính</h3>
        <CFormInput type="text" placeholder="Ect...XL" />
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

export default OptionsVariantModalUpdate
