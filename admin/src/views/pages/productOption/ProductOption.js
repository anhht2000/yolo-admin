import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
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
import {
  createProductOption,
  deleteProductOption,
  getProductOption,
  updateProductOption,
} from 'src/config/productOptionAPI'
import { resetDateTime } from 'src/config/dateTime'
import Pagination from 'src/components/pagination/Pagination'
import { toast } from 'react-toastify'

const ProductOption = () => {
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [options, setOptions] = useState({})
  const [fakeOption, setfakeOption] = useState({})
  const getOptionApi = async (page = 1) => {
    try {
      const response = await getProductOption(page)
      setOptions(response.data)
    } catch (err) {
      toast.error(`~~ load page ${page} lỗi rồi nhá ~~`)
    }
  }

  const updateOptionApi = async (data) => {
    try {
      const response = await updateProductOption(data.name, data.id)
      setOptions({
        ...options,
        data: options['data'].map((option) => {
          return option.id === response.data.data.id ? response.data.data : option
        }),
      })
      toast.info(`~~ update dữ liệu thành công rồi nha ~~`)
    } catch (err) {
      toast.error(`~~ update fail rồi nhá ~~`)
    }
  }

  const deleteOptionApi = async (id) => {
    try {
      await deleteProductOption(id)
      // setOptions({
      //   ...options,
      //   data: options['data'].filter((option) => {
      //     return option.id !== id
      //   }),
      // })
      getOptionApi()
      toast.info(`~~ xóa dữ liệu thành công ~~`)
    } catch (err) {
      toast.error(`~~ process xóa gặp vấn đề ~~`)
    }
  }

  const createOptionApi = async (name) => {
    try {
      const response = await createProductOption(name)
      setOptions({
        ...options,
        data: [response, ...options['data']],
      })
      getOptionApi()
    } catch (err) {
      toast.error(`~~ thêm Option Đã bị lỗi ~~`)
    }
  }
  useEffect(() => {
    getOptionApi()
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
                                setfakeOption(item)
                              }}
                            />
                            <CIcon
                              icon={cilDelete}
                              onClick={() => {
                                setVisible(!visible)
                                setfakeOption(item)
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
                changeData={getOptionApi}
              />
            </CCardHeader>
          </CCard>
        </CCol>
      </CRow>
      <OptionsModalDelete
        setVisible={setVisible}
        visible={visible}
        fakeOption={fakeOption}
        deleteOptionApi={deleteOptionApi}
      />
      <OptionsModalAdd
        setVisibleAdd={setVisibleAdd}
        createOptionApi={createOptionApi}
        visibleAdd={visibleAdd}
      />
      <OptionsModalUpdate
        setVisibleUpdate={setVisibleUpdate}
        visibleUpdate={visibleUpdate}
        fakeOption={fakeOption}
        setfakeOption={setfakeOption}
        updateOptionApi={updateOptionApi}
      />
    </>
  )
}

export default ProductOption
