import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
  CCol,
  CForm,
  CFormInput,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  createOptionVariant,
  deleteOptionVariant,
  updateOptionVariant,
} from 'src/config/optionVariantAPI'
import ProductOptionVariantModalDelete from './ProductOptionVariantModalDelete'
import ProductOptionVariantModalUpdate from './ProductOptionVariantModalUpdate'

const ProductOptionVariant = (props) => {
  const { option, setOption, setOptions, options } = props
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [visibleUpdate, setVisibleUpdate] = useState(false)
  const [variant, setVariant] = useState('')
  const [tempVariant, setTempVariant] = useState({})
  const setPress = async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      try {
        const response = await createOptionVariant(variant, option.id)
        setOption({
          ...option,
          optionValue: [...option['optionValue'], response.data.data],
        })
        toast.success(`Thêm dữ liệu thành công`)
      } catch (error) {
        toast.error(`Thêm variant bị lỗi rồi`)
      }
      setVariant('')
    }
  }

  const deleteVariant = async (id) => {
    try {
      await deleteOptionVariant(option.id, id)
      setOption({
        ...option,
        optionValue: option['optionValue'].filter((item) => item.id !== id),
      })
      toast.success(`Xóa dữ liệu thành công`)
    } catch (err) {
      toast.error(`Xóa không thành công`)
    }
  }

  const updateVariant = async (name, optionId, variantId) => {
    try {
      const response = await updateOptionVariant(name, optionId, variantId)
      setOption({
        ...option,
        optionValue: option['optionValue'].map((item) =>
          item.id === response.data.data.id ? response.data.data : item,
        ),
      })
      toast.success(`Update dữ liệu thành công`)
    } catch (err) {
      toast.error(`Update thất bại `)
    }
  }

  useEffect(() => {
    setOptions({
      ...options,
      data: options['data'].map((data) => (data.id === option.id ? option : data)),
    })
    // eslint-disable-next-line
  }, [option])
  return (
    <>
      <CAccordion activeItemKey={2}>
        <CAccordionItem itemKey={1}>
          <CAccordionHeader>Variant Of Options: &quot; {option.name} &quot;</CAccordionHeader>
          <CAccordionBody>
            <CForm className="row g-3">
              <CCol md={3}>
                <CFormInput
                  value={variant}
                  type="text"
                  placeholder="Thêm Thuộc tính"
                  onChange={(e) => {
                    setVariant(e.target.value)
                  }}
                  onKeyPress={setPress}
                />
              </CCol>
              {option?.optionValue.map((item, index) => (
                <CCol
                  md={3}
                  key={index}
                  className={'flex_option'}
                  style={{ border: '1px solid rgb(177,183,193)', padding: '5px' }}
                >
                  <div className="">{item.name}</div>
                  <div>
                    <CIcon
                      icon={cilPencil}
                      className="me-2 icon-hover"
                      style={{ height: '15px', width: '15px' }}
                      onClick={() => {
                        setVisibleUpdate(true)
                        setTempVariant(item)
                      }}
                    />
                    <CIcon
                      icon={cilTrash}
                      className="me-2 icon-hover"
                      style={{ height: '15px', width: '15px' }}
                      onClick={() => {
                        setVisibleDelete(true)
                        setTempVariant(item)
                      }}
                    />
                  </div>
                </CCol>
              ))}
            </CForm>
          </CAccordionBody>
        </CAccordionItem>
      </CAccordion>
      <ProductOptionVariantModalDelete
        variant={tempVariant}
        visible={visibleDelete}
        setVisible={setVisibleDelete}
        option={option}
        deleteVariant={deleteVariant}
      />
      <ProductOptionVariantModalUpdate
        variant={tempVariant}
        option={option}
        updateVariant={updateVariant}
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
      />
    </>
  )
}

export default ProductOptionVariant
