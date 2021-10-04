import {
  CButton,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CSpinner,
} from '@coreui/react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { fun } from 'src/data/FilterDataPage'

const OptionsModalAdd = (props) => {
  const { visibleAdd, setVisibleAdd, createOptionApi } = props
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const addOption = async () => {
    setLoading(true)
    await fun()
    if (name === '') {
      toast.error('trường dữ liệu không được để trống')
      setLoading(false)
      setVisibleAdd(false)
      return
    }
    createOptionApi(name)
    setLoading(false)
    setVisibleAdd(false)
  }
  return (
    <CModal visible={visibleAdd} onDismiss={() => setVisibleAdd(false)}>
      <CModalHeader>
        <CModalTitle>Thêm sản phẩm</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <h3>Tên Options</h3>
        <CFormInput
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
          type="text"
          placeholder="Ect... Kích Thước"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisibleAdd(false)}>
          Đóng
        </CButton>
        <CButton color="primary" onClick={addOption} disabled={loading}>
          {loading && <CSpinner size="sm" />} Lưu thay đổi
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default OptionsModalAdd
