import { CCard, CCardBody, CCardFooter, CCardHeader } from '@coreui/react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { imgLogo } from 'src/assets'
import { validateDe, validateName, validatePrice } from 'src/helper/CheckData'

export default function ProductForm() {
  const [values, setValues] = useState({})
  const [error, setError] = useState({})
  const [acceptFile, setAcceptFile] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: ['image/*'],
    onDrop: (acceptedFiles, rejectedFiles) => {
      var Accept = acceptedFiles.map((item) => {
        return Object.assign(item, {
          preview: URL.createObjectURL(item),
        })
      })
      setAcceptFile([...acceptFile, ...Accept])
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
  const handleRemoveErr = ({ target }) => {
    const { name } = target
    setError({
      ...error,
      [name]: '',
    })
  }
  const handleSubmit = async () => {
    const checkName = validateName(values?.name)
    const checkDe = validateDe(values?.description)
    const checkPrice = validatePrice(values.price)

    if (!checkName) {
      setError((prev) => {
        return { ...prev, name: 'Bạn phải nhập tên sản phẩm' }
      })
    }
    if (!checkDe) {
      setError((prev) => {
        return { ...prev, description: 'Bạn phải nhập miêu tả sản phẩm' }
      })
    }
    if (!checkPrice) {
      setError((prev) => {
        return { ...prev, price: 'Bạn phải nhập giá là kiểu số ' }
      })
    }
    setError((prev) => {
      if (Object.values(prev).every((e) => e === '')) {
        console.log('OK', values, acceptFile)
      }
      return prev
    })
  }
  return (
    <div className="row">
      <div className="col-md-9">
        <div className="main-form">
          <div className="form-body">
            <div className="form-group mb-3">
              <label htmlFor="name" className="text-title-field required" aria-required="true">
                Tên sản phẩm
              </label>
              <input
                className="form-control"
                placeholder="Nhập tên sản phẩm"
                name="name"
                type="text"
                id="name"
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              />
              <small className="charcounter">(120 character(s) remain)</small>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="price" className="text-title-field required" aria-required="true">
                Giá tiền
              </label>
              <input
                className="form-control"
                placeholder="Giá tiền"
                name="price"
                type="text"
                id="price"
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description" className="control-label">
                Miêu tả
              </label>
              <textarea
                className="form-control"
                rows="4"
                cols="50"
                name="description"
                id="description"
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
        </div>

        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <p>Thuộc tính</p>
            <p id="add__attribute">Thêm thuộc tính</p>
          </CCardHeader>
          <CCardBody>
            <p className="text-secondary">Ấn vào thêm thuộc tính để chọn thuộc tính cho sản phẩm</p>
          </CCardBody>
        </CCard>

        <CCard className="mt-3">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <p>Ảnh</p>
          </CCardHeader>
          <CCardBody>
            <div className="gallery-images-wrapper list-images">
              <label htmlFor="input__add-img" className="w-100">
                {acceptFile.length < 1 && (
                  <div className="text-center text-secondary cursor-pointer js-btn-trigger-add-image default-placeholder-gallery-image ">
                    <img id="display__img" src={imgLogo.placeholder} alt="" />
                    <p>Ấn vào đây để thêm ảnh cho sản phẩm</p>
                  </div>
                )}
              </label>

              <div {...getRootProps()}>
                <input {...getInputProps()} id="input__add-img" />
              </div>

              {acceptFile.length > 0 && (
                <ul className="list-unstyled list-gallery-media-images ui-sortable">
                  {acceptFile.map((image, index) => {
                    return (
                      <li className="gallery-image-item-handler" key={index}>
                        <div className="list-photo-hover-overlay">
                          <ul className="photo-overlay-actions">
                            <li>
                              <span
                                className="mr10 btn-trigger-remove-gallery-image"
                                onClick={() => handleRemoveImage(image)}
                              >
                                <i className="bx bxs-trash-alt"></i>
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="custom-image-box image-box">
                          <input type="hidden" className="image-data" />
                          <img src={image.preview} className="preview_image" alt="" />
                          <div className="image-box-actions"></div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}

              <label htmlFor="input__add-img">
                <p className="text-primary fs-7">Thêm ảnh</p>
              </label>
            </div>
          </CCardBody>
        </CCard>
      </div>
      <div className="col-md-3 right-sidebar">
        <div className="widget meta-boxes form-actions form-actions-default action-horizontal">
          <div className="widget-title">
            <h5>
              <span>Hành động</span>
            </h5>
          </div>
          <div className="widget-body">
            <div className="btn-set">
              <button
                name="submit"
                value="save"
                className="btn btn-info text-light"
                onClick={handleSubmit}
              >
                <i className="bx bx-save"></i> Lưu
              </button>
              &nbsp;
              <button name="submit" value="apply" className="btn btn-secondary text-light">
                <i className="bx bxs-x-circle"></i> Hủy bỏ
              </button>
            </div>
          </div>
        </div>

        <div className="widget meta-boxes">
          <div className="widget-title">
            <h5>
              <label htmlFor="status" className="control-label required" aria-required="true">
                Trạng thái
              </label>
            </h5>
          </div>
          <div className="widget-body">
            <div className="ui-select-wrapper form-group">
              <select
                className="form-control ui-select ui-select is-valid"
                id="status"
                name="status"
                aria-invalid="false"
              >
                <option value="published">Công khai</option>
                <option value="draft">Bản thảo</option>
                <option value="pending">Ẩn</option>
              </select>
              <span className="svg-next-icon svg-next-icon-size-16">
                <i className="bx bx-chevron-down"></i>
              </span>
            </div>
          </div>
        </div>

        <div className="widget meta-boxes">
          <div className="widget-title">
            <h5>
              <label htmlFor="is_featured" className="control-label">
                Sản phẩm nổi bật
              </label>
            </h5>
          </div>
          <div className="widget-body">
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
            </div>
          </div>
        </div>

        <div className="widget meta-boxes">
          <div className="widget-title">
            <h5>
              <label htmlFor="is_featured" className="control-label">
                Nhãn
              </label>
            </h5>
          </div>
          <div className="widget-body">
            <ul>
              <li>
                <input type="checkbox" id="bestsell" />
                <label htmlFor="bestsell">Bán chạy</label>
              </li>
              <li>
                <input type="checkbox" id="popular" />
                <label htmlFor="popular">Phổ biến</label>
              </li>
              <li>
                <input type="checkbox" id="new" />
                <label htmlFor="new">Mới nhất</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
