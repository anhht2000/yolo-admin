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
      <CButton color="primary my-3" onClick={handleClickAdd}>
        Thêm sản phẩm
      </CButton>
      <CRow className="mt-2 mb-4">
        <CCol xs={4}>
          <CForm className="row g-0 position-relative">
            <CCol xs="12">
              <CFormInput
                type="text"
                className="input__search"
                placeholder="Nhập để tìm kiếm"
                onChange={(e) => {
                  handleChangeSearch(e)
                }}
              />
            </CCol>
            <div className=".flex-{grow|shrink}-1 search__box">
              <i className="bx bx-search-alt-2" />
            </div>
          </CForm>
        </CCol>
        <CCol xs={8} className="text-end ">
          <CForm className="row justify-content-end">
            <CCol xs="auto">
              <CFormSelect name="createDate" onChange={(e) => handleSort(e)}>
                <option value="">Thời gian</option>
                <option value="0">Cũ nhất</option>
                <option value="1">Mới nhất</option>
              </CFormSelect>
            </CCol>
            <CCol xs="auto">
              <CFormSelect name="price" onChange={(e) => handleSort(e)}>
                <option value="">Giá</option>
                <option value="0">Thấp nhất</option>
                <option value="1">Cao nhất</option>
              </CFormSelect>
            </CCol>
          </CForm>
        </CCol>
      </CRow>
      <ProductTable products={products} />
    </div>
  )
}

export default Product
