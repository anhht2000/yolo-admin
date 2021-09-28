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
  }
  const handleSubmit = () => {
    console.log({ ...values, image: [...image] })
  }
  // form edit
  if (type === 'edit') {
    return (
      <CForm>
        {console.log('test', values)}
        <CRow className="mb-3">
          <CFormLabel htmlFor="title" className="col-sm-2 col-form-label flex-grow-1">
            Tên
          </CFormLabel>
          <CCol sm={9}>
            {/* defaultValue="email@example.com" */}
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
                    name="size"
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
  //form add
  else
    return (
      <CForm>
        {console.log(values)}
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
            <CFormCheck
              name="size"
              value="s"
              label="S"
              className="me-4"
              onChange={(e) => handleChange(e)}
            />
            <CFormCheck
              name="size"
              value="m"
              label="M"
              className="me-4"
              onChange={(e) => handleChange(e)}
            />
            <CFormCheck
              name="size"
              value="xl"
              label="XL"
              className="me-4"
              onChange={(e) => handleChange(e)}
            />
            <CFormCheck
              name="size"
              value="xxl"
              label="XXL"
              className="me-4"
              onChange={(e) => handleChange(e)}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3 align-items-center">
          <CFormLabel htmlFor="image" className="col-sm-2 col-form-label flex-grow-1">
            Màu sắc
          </CFormLabel>
          <CCol sm={9} className="d-flex">
            <CFormCheck
              name="color"
              value="red"
              label="Đỏ"
              className="me-4"
              onChange={(e) => handleChange(e)}
            />
            <CFormCheck
              name="color"
              value="blue"
              label="Xanh"
              className="me-4"
              onChange={(e) => handleChange(e)}
            />
            <CFormCheck
              name="color"
              value="pink"
              label="Hồng"
              className="me-4"
              onChange={(e) => handleChange(e)}
            />
            <CFormCheck
              name="color"
              value="yellow"
              label="Vàng"
              className="me-4"
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
