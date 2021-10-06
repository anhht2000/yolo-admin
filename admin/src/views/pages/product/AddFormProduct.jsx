import { CCol, CContainer, CRow } from '@coreui/react'
import React from 'react'
import FormProduct from 'src/components/product/FormProduct'

export default function AddFormProduct() {
  return (
    <CContainer>
      <CRow>
        <CCol xs="12" lg={7} xl={6} className="mx-auto shadow bg-body rounded py-3">
          <h4 className="text-center mb-3">Thêm sản phẩm</h4>
          <FormProduct initialValue={{ name: '', price: '', size: {}, color: {} }} />
        </CCol>
      </CRow>
    </CContainer>
  )
}
