import { CButton, CCol, CForm, CFormInput, CFormSelect, CRow } from '@coreui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ProductTable from 'src/components/product/ProductTable'
import {
  actionGetAllProduct,
  actionSearchProduct,
  actionSortProduct,
  getProduct,
} from 'src/redux/slice/productSlice'

const Product = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const products = useSelector(getProduct)
  const handleClickAdd = () => {
    history.push('/product/add')
  }
  const handleChangeSearch = ({ target }) => {
    dispatch(actionSearchProduct(target.value))
  }
  const handleSort = ({ target }) => {
    const { name, value } = target
    dispatch(actionSortProduct({ by: name, order: value }))
  }
  useEffect(() => {
    dispatch(actionGetAllProduct())
  }, [dispatch])
  return (
    <div>
      <h2>Quản lý sản phẩm</h2>
      <CButton color="dark my-3" onClick={handleClickAdd}>
        Thêm sản phẩm
      </CButton>
      <CRow className="mt-2">
        <CCol xs={6}>
          <CForm className="row g-0">
            <CCol xs="auto">
              <CFormInput
                type="text"
                placeholder="Enter to search"
                onChange={(e) => {
                  handleChangeSearch(e)
                }}
              />
            </CCol>
            <CCol xs="auto">
              <CButton className="mb-3" disabled>
                Tìm kiếm
              </CButton>
            </CCol>
          </CForm>
        </CCol>
        <CCol xs={6} className="text-end">
          <CForm className="row justify-content-end">
            <CCol xs="auto">
              <CFormSelect name="createDate" onChange={(e) => handleSort(e)}>
                <option value="">Time</option>
                <option value="0">Cũ nhất</option>
                <option value="1">Mới nhất</option>
              </CFormSelect>
            </CCol>
            <CCol xs="auto">
              <CFormSelect name="price" onChange={(e) => handleSort(e)}>
                <option value="">Price</option>
                <option value="0">Thấp nhất</option>
                <option value="1">Cao nhất</option>
              </CFormSelect>
            </CCol>
          </CForm>
        </CCol>
      </CRow>
      {/* table  */}
      <ProductTable products={products} />
    </div>
  )
}

export default Product
