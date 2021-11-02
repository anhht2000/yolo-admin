import { cilCheckCircle, cilXCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import Pagination from 'src/components/pagination/Pagination'
import { getAllUser } from 'src/config/userManageApi'

const ManageUser = () => {
  const [users, setUsers] = useState([])
  const [page, setPage] = useState({})
  const [search, setSearch] = useState('')

  const handleSearch = async (page) => {
    const result = await getAllUser(page, search)
    setUsers(result.data.user)
    setPage(result.data.page)
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleSearch()
    }, 1000)
    return () => {
      clearTimeout(debounce)
    }
    //eslint-disable-next-line
  }, [search])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <CRow className={'mt-2 flex_option'}>
                <CCol xs="6" md="4">
                  <strong>Quản lý khách hàng</strong> <small>(khóa tài khoản khách ...)</small>
                </CCol>
                <CCol xs="6" md="4">
                  <CForm className="row g-0 position-relative">
                    <CCol xs="12">
                      <CFormInput
                        type="text"
                        className="input__search"
                        value={search}
                        placeholder="Nhập tài khoản hoặc điện thoại"
                        onChange={(e) => {
                          setSearch(e.target.value)
                        }}
                      />
                    </CCol>
                    <div className=".flex-{grow|shrink}-1 search__box">
                      <i className="bx bx-search-alt-2" />
                    </div>
                  </CForm>
                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">STT</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Tên đăng nhập</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Địa Chỉ nhà</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Số lượng đơn</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users.length === 0 && (
                    <CTableRow>
                      <CTableDataCell scope="col" colSpan={6} className={'mt-2 text-center'}>
                        Không có user nào
                      </CTableDataCell>
                    </CTableRow>
                  )}
                  {users.length > 0 &&
                    users.map((user, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">
                          {page.currentPage &&
                            page.perPage &&
                            (page?.currentPage - 1) * page.perPage + index + 1}
                        </CTableHeaderCell>
                        <CTableDataCell>{user.username}</CTableDataCell>
                        <CTableDataCell>{user.phone}</CTableDataCell>
                        <CTableDataCell>{user.address}</CTableDataCell>
                        <CTableDataCell>{user.receipts}</CTableDataCell>
                        <CTableDataCell>
                          <CTooltip
                            content={`${
                              user.active
                                ? 'Ấn vào để vô hiệu hóa tài khoản'
                                : 'Ấn vào để mở lại tài khoản'
                            }`}
                            placement="top"
                          >
                            <CIcon
                              icon={user.active ? cilXCircle : cilCheckCircle}
                              className="me-2 icon-hover"
                              style={{
                                height: '15px',
                                width: '15px',
                                color: user.active ? 'red' : 'green',
                              }}
                            />
                          </CTooltip>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
              {page && (
                <Pagination
                  currentPage={page?.currentPage}
                  totalPage={page?.totalPage}
                  changeData={handleSearch}
                />
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default ManageUser
