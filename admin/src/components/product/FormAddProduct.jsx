import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CSpinner,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getLoading } from 'src/redux/slice/productSlice'
import { toast } from 'react-toastify'
import productApi from 'src/config/productApi'
import { getAllOption } from 'src/config/productOptionAPI'
import { fun } from 'src/data/FilterDataPage'

export default function FormAddProduct({ type, initialValue }) {
  const [values, setValues] = useState({})
  const [acceptFile, setAcceptFile] = useState([])
  const history = useHistory()
  const isLoading = useSelector(getLoading)
  const [selectData, setSelectData] = useState([])
  const [selectForm, setSelectForm] = useState('default')
  const [variantTemp, setVariantTemp] = useState([])
  const [variantSend, setVariantSend] = useState({})
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/*'],
    onDrop: (acceptedFiles, rejectedFiles) => {
      var Files = Object.assign(acceptFile)
      var Accept = acceptedFiles.map((item) => {
        return Object.assign(item, {
          preview: URL.createObjectURL(item),
        })
      })
      setAcceptFile([...Files, ...Accept])
    },
  })

  const handleRemoveImage = (image) => {
    const newArrImage = acceptFile.filter((item) => item.preview !== image.preview)
    setAcceptFile(newArrImage)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
  }
  const handleChangeOptionVariant = (e) => {
    const data = variantTemp.find((item) => item.id === parseInt(e.target.name))
    const temp = data.optionValue.find((item) => item.id === parseInt(e.target.value))
    const newTemp = { ...temp, use: !temp.use }
    const newData = {
      ...data,
      optionValue: data.optionValue.map((item) => (item.id === newTemp.id ? newTemp : item)),
    }
    setVariantTemp(variantTemp.map((item) => (newData.id === item.id ? newData : item)))

    if (variantSend[e.target.name]) {
      const data = variantSend[e.target.name].find((item) => item === e.target.value)
      if (data) {
        setVariantSend({
          ...variantSend,
          [e.target.name]: [
            ...variantSend[e.target.name].filter((item) => item !== e.target.value),
          ],
        })
        return
      }
      setVariantSend({
        ...variantSend,
        [e.target.name]: [...variantSend[e.target.name], e.target.value],
      })
      return
    }
    setVariantSend({
      ...variantSend,
      [e.target.name]: [e.target.value],
    })
  }

  const LoadOptions = async () => {
    try {
      const { data } = await getAllOption()
      await fun()
      setSelectData(data.data)
    } catch (error) {
      toast.error(`System error`)
    }
  }

  useEffect(() => {
    LoadOptions()
  }, [])

  const handleSubmit = async () => {
    try {
      const formdata = new FormData()
      acceptFile.forEach((item) => {
        formdata.append('allImg', item)
      })
      formdata.append('name', values.name || '')
      formdata.append('price', values.price || '')
      formdata.append('description', values.description || '')
      formdata.append('option', JSON.stringify(variantSend))
      await productApi.createProduct(formdata)
      toast.success('Thêm sản phẩm thành công')

      history.push('/product')
    } catch (error) {}
  }
  return (
    <CForm>
      <CRow className="mb-3">
        <CFormLabel htmlFor="name" className="col-sm-2 col-form-label flex-grow-1">
          Tên
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            type="text"
            id="name"
            name="name"
            placeholder="Vui lòng nhập tên sản phẩm"
            defaultValue={values?.name}
            onChange={(e) => handleChange(e)}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="price" className="col-sm-2 col-form-label flex-grow-1">
          Giá
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            type="text"
            id="price"
            placeholder="Vui lòng nhập giá sản phẩm"
            name="price"
            defaultValue={values?.price}
            onChange={(e) => handleChange(e)}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel htmlFor="description" className="col-sm-2 col-form-label flex-grow-1">
          Miêu tả
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            type="text"
            id="description"
            placeholder="Vui lòng nhập miêu tả sản phẩm"
            name="description"
            multiple
            defaultValue={values?.description}
            onChange={(e) => handleChange(e)}
          />
        </CCol>
      </CRow>
      <CRow className="mb-3">
        <CFormLabel
          htmlFor="image"
          className="col-sm-2 col-form-label flex-grow-1"
          style={{ cursor: 'pointer' }}
        >
          Thêm thuộc tính
        </CFormLabel>
        <CCol sm={9} className="d-flex flex-wrap align-item-center">
          {selectData.length > 0 && (
            <CFormSelect
              size="sm"
              className="mb-12"
              aria-label="Small select example"
              value={selectForm}
              onChange={(e) => {
                setSelectForm(e.target.value)
                if (e.target.value === 'default') return
                var data = selectData.find((item) => item.id === parseInt(e.target.value))
                if (data) {
                  const checkDataExist = variantTemp.find((item) => item.id === data.id)
                  if (checkDataExist) {
                    toast.info('Đã Thêm Thuộc tính này')
                    return
                  }
                  data = {
                    ...data,
                    optionValue: data.optionValue.map((item) => {
                      return { ...item, use: false }
                    }),
                  }
                  const newPush = [data, ...variantTemp]
                  setVariantTemp(newPush)
                }
              }}
            >
              <option value="default">Ấn vào đây để chọn loại sản phẩm</option>
              {selectData?.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </CFormSelect>
          )}
          {selectData.length === 0 && <CSpinner size="sm" />}
        </CCol>
      </CRow>
      {variantTemp.length > 0 &&
        variantTemp.map((item, index) => (
          <CRow className="mb-3" key={index}>
            <CFormLabel htmlFor="description" className="col-sm-2 col-form-label flex-grow-1">
              {item.name}
            </CFormLabel>
            <CCol sm={9} className={'flex_type_1'}>
              {item.optionValue &&
                item.optionValue.map((data, index) => (
                  <span key={index}>
                    <input
                      type="checkbox"
                      name={item.id}
                      value={data.id}
                      checked={data.use}
                      onChange={handleChangeOptionVariant}
                    />{' '}
                    {data.name}
                  </span>
                ))}
            </CCol>
          </CRow>
        ))}
      <CRow className="mb-3">
        <CFormLabel
          htmlFor="image"
          className="col-sm-2 col-form-label flex-grow-1"
          style={{ cursor: 'pointer' }}
        >
          Ảnh
        </CFormLabel>
        <CCol sm={9} className="d-flex flex-wrap align-item-center">
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <div className="upload">
              <i className="bx bx-cloud-upload"></i> Tải lên
            </div>
          </div>
          <div className="preview">
            {acceptFile.map((item, index) => (
              <div key={index} className="preview__img__flex">
                <div>
                  <i className="bx bx-x preview__icon" onClick={() => handleRemoveImage(item)} />
                </div>
                <img src={item.preview} alt={index} className="preview__img" />
                <div className={'preview__title'}>{item.name}</div>
              </div>
            ))}
          </div>
        </CCol>
      </CRow>
      <CRow className="text-center justify-content-center ">
        <CButton className="w-auto" onClick={handleSubmit}>
          {isLoading && <CSpinner component="span" size="sm" />}
          Lưu
        </CButton>
        <CButton
          className="w-auto ms-3"
          color="secondary"
          onClick={() => {
            history.push('/product')
          }}
        >
          Hủy bỏ
        </CButton>
      </CRow>
    </CForm>
  )
}
