import { CCol, CContainer, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import FormProduct from 'src/components/product/FormAddProduct'
import FormEditProduct from 'src/components/product/FormEditProduct'
import { actionGeOneProduct, getCurrentProduct } from 'src/redux/slice/productSlice'

export default function EditFormProduct() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const productCurrent = useSelector(getCurrentProduct)
  const size = productCurrent?.productOption
    ?.filter((e) => e?.option?.name === 'size')
    .map((e) => e?.optionValue?.name)
  const color = productCurrent?.productOption
    ?.filter((e) => e?.option?.name === 'color')
    .map((e) => e?.optionValue?.name)
  useEffect(() => {
    dispatch(actionGeOneProduct(slug))
  }, [dispatch])
  return (
    <CContainer>
      <CRow>
        <CCol xs="12" lg={7} xl={6} className="mx-auto shadow bg-body rounded py-3">
          <h4 className="text-center mb-3">Sửa sản phẩm</h4>
          <FormEditProduct type={'edit'} initialValue={{ ...productCurrent, size, color }} />
        </CCol>
      </CRow>
    </CContainer>
    // <></>
  )
}
