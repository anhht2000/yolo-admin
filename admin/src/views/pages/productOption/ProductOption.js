import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { cilDelete, cilPencil, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import OptionsModalAdd from './OptionsModalAdd'
import OptionsModalDelete from './OptionsModalDelete'
import OptionsModalUpdate from './OptionsModalUpdate'
import { GetProductOption } from 'src/config/ProductAPI'
import { resetDateTime } from 'src/config/dateTime'
import Pagination from 'src/components/pagination/Pagination'
const ProductOption = () => {
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [options, setOptions] = useState({})
  useEffect(() => {
    GetProductOption()
      .then((result) => {
        setOptions(result.data)
        console.log(result.data)
      })
      .catch((err) => {})
  }, [])
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="flex_option">
              <div>
                <strong>Quản lý Options Sản phẩm</strong> <small>(Size, color, ...)</small>
              </div>
              <div>
                <CButton
                  color={'primary'}
                  style={{ padding: '4px 8px' }}
                  onClick={() => {
                    setVisibleAdd(true)
                  }}
                >
                  <CIcon
                    icon={cilPlus}
                    className="me-2"
                    style={{ height: '15px', width: '15px' }}
                  />
                  Thêm
                </CButton>
              </div>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                    <CTableHeaderCell scope="col">OptionName</CTableHeaderCell>
                    <CTableHeaderCell scope="col">DayCreate</CTableHeaderCell>
                    <CTableHeaderCell scope="col">DayUpdate</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {options.data &&
                    options.data.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{resetDateTime(item.createDate)}</CTableDataCell>
                        <CTableDataCell>{resetDateTime(item.updateDate)}</CTableDataCell>
                        <CTableDataCell>
                          <div>
                            <CIcon
                              icon={cilPencil}
                              className="me-2 icon-hover"
                              style={{ height: '15px', width: '15px' }}
                              onClick={() => {
                                setVisibleUpdate(true)
                              }}
                            />
                            <CIcon
                              icon={cilDelete}
                              onClick={() => {
                                setVisible(!visible)
                              }}
                              className="me-2 icon-hover"
                              style={{ height: '15px', width: '15px' }}
                            />
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <CCardHeader className="flex_option">
              <Pagination
                currentPage={options.page?.currentPage}
                totalPage={options.page?.totalPage}
              />
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <OptionsModalDelete setVisible={setVisible} visible={visible} />
      <OptionsModalAdd setVisibleAdd={setVisibleAdd} visibleAdd={visibleAdd} />
      <OptionsModalUpdate setVisibleUpdate={setVisibleUpdate} visibleUpdate={visibleUpdate} />
    </>
  )
}

export default ProductOption
