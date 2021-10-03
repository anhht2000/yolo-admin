import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { filter } from 'src/data/FilterDataPage'

export default function FormAdd({ type, initialValue }) {
  const [values, setValues] = useState({})
  const [acceptFile, setAcceptFile] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/*'],
    onDrop: (acceptedFiles, rejectedFiles) => {
      console.log('acceptedFiles', acceptedFiles)
      console.log('rejectedFiles', rejectedFiles)
      setAcceptFile(
        acceptedFiles.map((item) =>
          Object.assign(item, {
            preview: URL.createObjectURL(item),
          }),
        ),
      )
    },
  })
  useEffect(() => {
    setValues(initialValue)
  }, [initialValue])

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
      const formdata = new FormData()
      acceptFile.forEach((item) => {
        formdata.append('allImg', item)
      })
      // formdata.append('title', values.title)
      // formdata.append('price', values.price)
      await axios.post('http://localhost:4000/product/add', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {},
      })
      setAcceptFile([])
    } catch (error) {
      alert(error)
    }
  }
  return (
    <CForm>
      <CRow className="mb-3">
        <CFormLabel htmlFor="title" className="col-sm-2 col-form-label flex-grow-1">
          Tên
        </CFormLabel>
        <CCol sm={9}>
          <CFormInput
            type="text"
            id="title"
            name="title"
            defaultValue={values?.title}
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
                  // defaultChecked={
                  //   values?.size && values.size.indexOf(e.content.toLowerCase()) !== -1
                  // }
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
                  // defaultChecked={
                  //   values?.color && values.color.indexOf(e.content.toLowerCase()) !== -1
                  // }
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
              <i className="bx bx-cloud-upload"></i> upload
            </div>
          </div>
          <div className="preview">
            {acceptFile.map((item, index) => (
              <div key={index} className="preview__img__flex">
                <img src={item.preview} alt={index} className="preview__img" />
                <div className={'preview__title'}>{item.name}</div>
              </div>
            ))}
          </div>
        </CCol>
      </CRow>
      <CRow className="text-center justify-content-center">
        <CButton className="w-auto" onClick={handleSubmit}>
          Lưu
        </CButton>
      </CRow>
    </CForm>
  )
}
