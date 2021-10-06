import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import OptionsModalAdd from './OptionsModalAdd'
import OptionsModalDelete from './OptionsModalDelete'
import OptionsModalUpdate from './OptionsModalUpdate'
import {
  createProductOption,
  deleteProductOption,
  getProductOption,
  updateProductOption,
} from 'src/config/productOptionAPI'
import Pagination from 'src/components/pagination/Pagination'
import { toast } from 'react-toastify'
import ProductOptionTable from './ProductOptionTable'
import ProductOptionHeader from './ProductOptionHeader'
import ProductOptionVariant from './ProductOptionVariant'

const ProductOption = () => {
  const [visible, setVisible] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [options, setOptions] = useState({})
  const [fakeOption, setfakeOption] = useState({})
  const [viewOption, setViewOption] = useState()
  const getOptionApi = async (page = 1) => {
    try {
      const response = await getProductOption(page)
      setOptions(response.data)
    } catch (err) {
      toast.error(`Load page ${page} không thành công`)
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
      toast.info(`Update dữ liệu thành công!`)
    } catch (err) {
      toast.error(`Update thất bại`)
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
      toast.info(`Xóa dữ liệu thành công`)
    } catch (err) {
      toast.error(`Proccess xóa gặp vấn đề`)
    }
  }

  const createOptionApi = async ({ name, meta }) => {
    try {
      const response = await createProductOption({ name, meta })
      setOptions({
        ...options,
        data: [response, ...options['data']],
      })
      getOptionApi()
    } catch (err) {
      toast.error(`System Error`)
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
              <ProductOptionHeader setVisibleAdd={setVisibleAdd} />
            </CCardHeader>
            <CCardBody>
              <ProductOptionTable
                options={options}
                setVisibleUpdate={setVisibleUpdate}
                setfakeOption={setfakeOption}
                setVisible={setVisible}
                visible={visible}
                setViewOption={setViewOption}
                page={options.page?.currentPage}
                perPage={options.page?.perPage}
              />
            </CCardBody>
            <CCardHeader className="flex_option">
              <Pagination
                currentPage={options.page?.currentPage}
                totalPage={options.page?.totalPage}
                changeData={getOptionApi}
              />
            </CCardHeader>
            {viewOption && (
              <CCardHeader>
                <ProductOptionVariant
                  option={viewOption}
                  options={options}
                  setOptions={setOptions}
                  setOption={setViewOption}
                />
              </CCardHeader>
            )}
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
