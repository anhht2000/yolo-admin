import { CCol, CContainer, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import FormAdd from 'src/components/product/FormAdd'
import { products } from 'src/data/products'

export default function EditFormProduct() {
  const { slug } = useParams()
  const [productCurrent, setProductCurrent] = useState()
  useEffect(() => {
    const productList = products.find((product) => product.slug === slug)
    setProductCurrent(productList)
  }, [slug])
  return (
    <CContainer>
      <CRow>
        <CCol xs="12" lg={7} xl={6} className="mx-auto shadow bg-body rounded py-3">
          <h4 className="text-center mb-3">Sửa sản phẩm</h4>
          <FormAdd type={'edit'} initialValue={productCurrent} />
        </CCol>
      </CRow>
    </CContainer>
  )
}
