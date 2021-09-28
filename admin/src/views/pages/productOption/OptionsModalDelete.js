import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'

const OptionsModalDelete = (props) => {
  const { visible, setVisible } = props
  return (
    <CModal visible={visible} onDismiss={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Xác nhận xóa</CModalTitle>
      </CModalHeader>
      <CModalBody>Xác nhận xóa Options của sản phẩm</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Đóng
        </CButton>
        <CButton color="primary">Xóa</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsModalDelete
