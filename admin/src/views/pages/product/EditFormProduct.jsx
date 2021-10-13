import { CCol, CContainer, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import FormEditProduct from 'src/components/product/FormEditProduct'
import { actionGeOneProduct, getCurrentProduct } from 'src/redux/slice/productSlice'

export default function EditFormProduct() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const productCurrent = useSelector(getCurrentProduct)

  useEffect(() => {
    dispatch(actionGeOneProduct(slug))
  }, [dispatch, slug])
  return (
    <CContainer>
      <CRow>
        <CCol xs={12} className="mx-auto shadow bg-body rounded py-3">
          <h4 className="text-center mb-3">Sửa sản phẩm</h4>
          <FormEditProduct type={'edit'} initialValue={{ ...productCurrent }} />
        </CCol>
      </CRow>
    </CContainer>
    // <></>
  )
}
