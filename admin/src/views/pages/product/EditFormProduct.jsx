import { CCol, CContainer, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import FormEditProduct from 'src/components/product/FormEditProduct'
import { actionGeOneProduct, getCurrentProduct } from 'src/redux/slice/productSlice'
import ProductForm from './ProductForm'

export default function EditFormProduct() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const productCurrent = useSelector(getCurrentProduct)

  useEffect(() => {
    dispatch(actionGeOneProduct(slug))
  }, [dispatch, slug])
  return <ProductForm initialValue={productCurrent} />
}
