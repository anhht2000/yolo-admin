import { cilAperture, cilDelete, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
import { resetDateTime } from 'src/config/dateTime'

const ProductOptionTable = (props) => {
  const { options, setVisibleUpdate, setfakeOption, setVisible, visible, setViewOption } = props
  return (
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">STT</CTableHeaderCell>
          <CTableHeaderCell scope="col">OptionName</CTableHeaderCell>
          <CTableHeaderCell scope="col">DayCreate</CTableHeaderCell>
          <CTableHeaderCell scope="col">DayUpdate</CTableHeaderCell>
          <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {options.data &&
          options.data.map((item, index) => (
            <CTableRow key={index}>
              <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
              <CTableDataCell>{item.name}</CTableDataCell>
              <CTableDataCell>{resetDateTime(item.createDate)}</CTableDataCell>
              <CTableDataCell>{resetDateTime(item.updateDate)}</CTableDataCell>
              <CTableDataCell>
                <div>
                  <CIcon
                    icon={cilPencil}
                    className="me-2 icon-hover"
                    style={{ height: '15px', width: '15px' }}
                    onClick={() => {
                      setVisibleUpdate(true)
                      setfakeOption(item)
                    }}
                  />
                  <CIcon
                    icon={cilDelete}
                    onClick={() => {
                      setVisible(!visible)
                      setfakeOption(item)
                    }}
                    className="me-2 icon-hover"
                    style={{ height: '15px', width: '15px' }}
                  />
                  <CIcon
                    icon={cilAperture}
                    onClick={() => {
                      setViewOption(item)
                    }}
                    className="me-2 icon-hover"
                    style={{ height: '15px', width: '15px' }}
                  />
                </div>
              </CTableDataCell>
            </CTableRow>
          ))}
      </CTableBody>
    </CTable>
  )
}

export default ProductOptionTable
