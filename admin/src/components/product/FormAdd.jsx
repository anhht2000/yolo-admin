import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { filter } from 'src/data/FilterDataPage'

export default function FormAdd({ type, initialValue }) {
  const [image, setImage] = useState([])
  const [values, setValues] = useState({})
  useEffect(() => {
    setValues(initialValue)
  }, [initialValue])
  const handleChangeImage = (e) => {
    const { files } = e.target
    const url = URL.createObjectURL(files[0])
    setImage([...image, url])
  }
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
    console.log({ name, value, type, checked })
  }
  const handleSubmit = () => {
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

    const value = { ...values, size: argS, colors: argC, image01: image[0], image02: image[1] }
  }
  // form edit
  if (type === 'edit') {
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
            <i className="bx bx-cloud-upload ms-2"></i>
          </CFormLabel>
          <CCol sm={9} style={{ maxHeight: '105px', overflow: 'hidden' }}>
            <CFormInput type="file" id="image" hidden onChange={(e) => handleChangeImage(e)} />
            {image &&
              image.map((e, index) => {
                return <img key={index} src={e} style={{ height: '105px' }} alt="" />
              })}
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
  //form add
  else
    return (
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="title" className="col-sm-2 col-form-label flex-grow-1">
            Tên
          </CFormLabel>
          <CCol sm={9}>
            {/* defaultValue="email@example.com" */}
            <CFormInput type="text" id="title" name="title" onChange={(e) => handleChange(e)} />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="price" className="col-sm-2 col-form-label flex-grow-1">
            Giá
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput type="text" id="price" name="price" onChange={(e) => handleChange(e)} />
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
                    //   values.size && values.size.indexOf(e.content.toLowerCase()) !== -1
                    // }
                    onChange={(e) => handleChange(e)}
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
                    //   values.color && values.color.indexOf(e.content.toLowerCase()) !== -1
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
            <i className="bx bx-cloud-upload ms-2"></i>
          </CFormLabel>
          <CCol sm={9} style={{ maxHeight: '105px', overflow: 'hidden' }}>
            <CFormInput type="file" id="image" hidden onChange={(e) => handleChangeImage(e)} />
            {image &&
              image.map((e, index) => {
                return <img key={index} src={e} style={{ height: '105px' }} alt="" />
              })}
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
