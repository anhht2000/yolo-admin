import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import React from 'react'

const OptionsVariantModalDelete = (props) => {
  const { visible, setVisible, option, variant } = props
  return (
    <CModal visible={visible} onDismiss={() => setVisible(false)}>
      <CModalHeader>
        <CModalTitle>Xác nhận xóa</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Xác nhận xóa thuộc tính: {variant.name} của Option: {option.name}{' '}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary">Save changes</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsVariantModalDelete
