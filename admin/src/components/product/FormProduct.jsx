import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
  CSpinner,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { filter } from 'src/data/FilterDataPage'
import { getLoading } from 'src/redux/slice/productSlice'
import productApi from '../../core/productApi'

export default function FormProduct({ type, initialValue }) {
  const [values, setValues] = useState({})
  const [acceptFile, setAcceptFile] = useState([])
  const history = useHistory()
  const isLoading = useSelector(getLoading)
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

  useEffect(() => {
    if (type === 'edit') {
      const color = {}
      initialValue?.color?.map((e) => {
        color[e] = true
      })
      const size = {}
      initialValue?.size?.map((e) => {
        size[e] = true
      })
      setValues({ ...initialValue, size, color })

      if (initialValue?.productImg) {
        console.log('env', process.env.REACT_APP_API_URL)
        const dtTest = initialValue?.productImg.map((e) => ({
          preview: process.env.REACT_APP_API_URL + e?.imgPath,
          name: e?.name,
        }))
        setAcceptFile(dtTest)
      }
    }
  }, [type, initialValue])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'text') {
      setValues({ ...values, [name]: value })
    } else {
      setValues({
        ...values,
        [name]: {
          ...values[name],
          [value]: checked === true,
        },
      })
    }
  }

  const handleSubmit = async () => {
    try {
      const argS =
        values.size &&
        Object.entries(values.size)
          .filter((e) => e[1] === true)
          .map((e) => e[0])
      const argC =
        values.color &&
        Object.entries(values.color)
          .filter((e) => e[1] === true)
          .map((e) => e[0])
      const formdata = new FormData()
      acceptFile.forEach((item) => {
        formdata.append('allImg', item)
      })
      formdata.append('name', values.name || '')
      formdata.append('price', values.price || '')
      formdata.append('description', values.description || '')
      formdata.append('size', argS)
      formdata.append('color', argC)

      if (type === 'edit') {
        await productApi.updateProduct(initialValue?.id, formdata)
        history.push('/product')
      } else {
        await productApi.createProduct(formdata)
        history.push('/product')
      }
    } catch (error) {
      console.log(error)
    }
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
            name="description"
            multiple
            defaultValue={values?.description}
            onChange={(e) => handleChange(e)}
          />
        </CCol>
      </CRow>

      <CRow className="mb-3 align-items-center">
        <CFormLabel htmlFor="image" className="col-sm-2 col-form-label flex-grow-1">
          Kích thước
        </CFormLabel>
        <CCol sm={9} className="d-flex">
          {filter &&
            filter.size.map((e, index) => {
              return (
                <CFormCheck
                  key={index}
                  name="size"
                  value={e.content}
                  label={e.content}
                  className="me-4"
                  checked={
                    false || (values.hasOwnProperty('size') && values.size[e.content]) || false
                  }
                  onClick={(e) => handleChange(e)}
                />
              )
            })}
        </CCol>
      </CRow>
      <CRow className="mb-3 align-items-center">
        <CFormLabel htmlFor="image" className="col-sm-2 col-form-label flex-grow-1">
          Màu sắc
        </CFormLabel>
        <CCol sm={9} className="d-flex flex-wrap align-item-center">
          {filter &&
            filter.color.map((e, index) => {
              return (
                <CFormCheck
                  key={index}
                  name="color"
                  value={e.content}
                  label={e.content}
                  className="me-4 pb-2"
                  checked={
                    false || (values.hasOwnProperty('color') && values.color[e.content]) || false
                  }
                  onChange={(e) => handleChange(e)}
                />
              )
            })}
        </CCol>
      </CRow>
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
              <i className="bx bx-cloud-upload"></i> Upload
            </div>
          </div>
          <div className="preview">
            {acceptFile.map((item, index) => (
              <div key={index} className="preview__img__flex">
                <img src={item.preview} alt={index} className="preview__img" />
                <div className={'preview__title'}>{item.name}</div>
                <i className="bx bx-x preview__icon" onClick={() => handleRemoveImage(item)} />
              </div>
            ))}
          </div>
        </CCol>
      </CRow>
      <CRow className="text-center justify-content-center">
        <CButton className="w-auto" onClick={handleSubmit}>
          {isLoading && <CSpinner component="span" size="sm" />}
          Lưu
        </CButton>
      </CRow>
    </CForm>
  )
}
