import { CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import FormAdd from 'src/components/product/FormAdd'

export default function AddFormProduct() {
  return (
    <CContainer>
      <CRow>
        <CCol xs="12" lg={7} xl={6} className="mx-auto shadow bg-body rounded py-3">
          <h4 className="text-center mb-3">Thêm sản phẩm</h4>
          <FormAdd initialValue={{ title: '', price: '', size: {}, color: {} }} />
        </CCol>
      </CRow>
    </CContainer>
  )
}
