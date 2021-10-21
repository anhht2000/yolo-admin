import { CCard, CCardBody, CCardFooter, CCardHeader } from '@coreui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import { imgLogo } from 'src/assets'
import productApi from 'src/config/productApi'
import { validateDe, validateName, validatePrice } from 'src/helper/CheckData'
import { actionGetOption, getOption, getOptionValue } from 'src/redux/slice/productSlice'

export default function ProductForm() {
  const history = useHistory()
  const [values, setValues] = useState({})
  const [error, setError] = useState({})
  const [numberAttri, setNumberAttri] = useState(0)
  const [currentOption, setCurrentOption] = useState([])
  const [variant, setVariant] = useState({})
  const [label, setLabel] = useState([])
  const [acceptFile, setAcceptFile] = useState([])
  const dispatch = useDispatch()
  const option = useSelector(getOption)
  const optionValue = useSelector(getOptionValue)
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
  const toCapitalize = useCallback(function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }, [])

  const handleChangeLabel = ({ target }) => {
    const { id } = target
    let isCheck = label.includes(id)
    if (isCheck) {
      setLabel((prev) => prev.filter((e) => e !== id))
    } else {
      setLabel((prev) => [...prev, id])
    }
  }
  const handleCheckbox = ({ target }) => {
    const { name, value } = target

    if (!variant.hasOwnProperty(`${name}`)) {
      setVariant((prev) => {
        return { ...prev, [name]: [] }
      })
      setVariant((prev) => {
        return { ...prev, [name]: [...prev[name], value] }
      })
    } else {
      setVariant((prev) => {
        if (prev[name].includes(value)) {
          return { ...prev, [name]: prev[name].filter((e) => e !== value) }
        } else return { ...prev, [name]: [...prev[name], value] }
      })
    }
  }
  const handleClickAddAttribute = () => {
    if (numberAttri + 1 <= option.length) {
      setNumberAttri(numberAttri + 1)
      setCurrentOption(option?.slice(0, numberAttri + 1))
    }
  }
  const handleRemoveAttribute = (option) => {
    if (numberAttri - 1 >= 0) {
      setNumberAttri(numberAttri - 1)
      setCurrentOption(currentOption.filter((item) => item.id !== option.id))
    }
  }
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
        const formdata = new FormData()
        acceptFile.forEach((item) => {
          formdata.append('allImg', item)
        })
        formdata.append('name', values.name)
        formdata.append('price', values.price)
        formdata.append('description', values.description)
        formdata.append('status', values.status)
        formdata.append('label', label)
        formdata.append('option', JSON.stringify(variant))
        callApi(formdata)
      }
      return prev
    })
  }
  const callApi = useCallback(
    async (formdata) => {
      const data = await productApi.createProduct(formdata)

      if (data?.status === 200) {
        toast.success('Thêm sản phẩm thành công')
        history.push('/product')
      } else {
        toast.error('Thêm sản phẩm thất bại')
      }
    },
    [history],
  )
  useEffect(() => {
    dispatch(actionGetOption())
  }, [dispatch])
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
                placeholder="Nhập tên sản phẩm"
                name="name"
                type="text"
                value={values?.name}
                className={Boolean(error.name) ? 'input__err form-control' : 'form-control'}
                id="name"
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              />
              <span className={'text__err'}>{error?.name}</span>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="price" className="text-title-field required" aria-required="true">
                Giá tiền
              </label>
              <input
                className={Boolean(error.price) ? 'input__err form-control' : 'form-control'}
                placeholder="Giá tiền"
                name="price"
                type="text"
                value={values?.price}
                id="price"
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              />
              <span className={'text__err'}>{error?.price}</span>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description" className="control-label required">
                Miêu tả
              </label>
              <textarea
                className={Boolean(error.description) ? 'input__err form-control' : 'form-control'}
                rows="4"
                cols="50"
                name="description"
                id="description"
                value={values?.description}
                onMouseDown={handleRemoveErr}
                onChange={handleChange}
              ></textarea>
              <span className={'text__err'}>{error?.description}</span>
            </div>
          </div>
        </div>

        <CCard>
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <p>Thuộc tính</p>
          </CCardHeader>
          <CCardBody>
            {currentOption.length === 0 && (
              <p className="text-secondary">
                Ấn vào thêm thuộc tính để chọn thuộc tính cho sản phẩm
              </p>
            )}
            <div className="list-product-attribute-wrap">
              <div className="list-product-attribute-wrap-detail">
                {currentOption.length > 0 &&
                  currentOption.map((option) => {
                    return (
                      <div className="product-attribute-set-item" key={option.id}>
                        <div className="row">
                          <div className="col-md-4 col-sm-6">
                            <div className="form-group mb-3">
                              <label className="text-title-field">Attribute name</label>
                              <select className="next-input product-select-attribute-item" disabled>
                                <option value="">{toCapitalize(option?.name)}</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-5 col-sm-6">
                            <div className="form-group mb-3">
                              <label className="text-title-field">Value</label>
                              <div className="product-select-attribute-item-value-wrap">
                                {optionValue[option.id].length > 0 &&
                                  optionValue[option.id].map((optValue) => {
                                    return (
                                      <span key={optValue.id} className="me-4">
                                        <input
                                          type="checkbox"
                                          name={option.id}
                                          value={optValue.id}
                                          checked={variant[option.id]?.includes(
                                            String(optValue.id),
                                          )}
                                          onChange={handleCheckbox}
                                        />
                                        {toCapitalize(optValue.name)}
                                      </span>
                                    )
                                  })}
                              </div>
                            </div>
                          </div>
                          <div className="col-md-3 col-sm-6 product-set-item-delete-action">
                            <div className="form-group mb-3">
                              <label className="text-title-field">&nbsp;</label>
                              <div className="icon__container">
                                <span
                                  className="btn btn-danger "
                                  onClick={() => {
                                    handleRemoveAttribute(option)
                                  }}
                                >
                                  <i className="bx bx-trash icon__delete-attribute"></i>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
              <span
                className="btn btn-light text-primary btn-trigger-add-attribute-item hidden"
                onClick={handleClickAddAttribute}
              >
                Thêm thuộc tính
              </span>
            </div>
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
              <button
                name="submit"
                className="btn btn-secondary text-light"
                onClick={() => {
                  history.push('/product')
                }}
              >
                <i className="bx bxs-x-circle"></i> Hủy bỏ
              </button>
            </div>
          </div>
        </div>

        <div className="widget meta-boxes">
          <div className="widget-title">
            <h5>
              <label htmlFor="status" className="control-label " aria-required="true">
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
                onChange={handleChange}
              >
                <option value="published">Công khai</option>
                <option value="draft">Bản thảo</option>
                <option value="pending">Riêng tư</option>
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
                <input type="checkbox" id="bestsell" onChange={handleChangeLabel} />
                <label htmlFor="bestsell">Bán chạy</label>
              </li>
              <li>
                <input type="checkbox" id="popular" onChange={handleChangeLabel} />
                <label htmlFor="popular">Phổ biến</label>
              </li>
              <li>
                <input type="checkbox" id="new" onChange={handleChangeLabel} />
                <label htmlFor="new">Mới nhất</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
