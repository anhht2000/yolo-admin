import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import React from 'react'
// import PropTypes from 'prop-types'

export default function ProductTable(props) {
  const { products } = props
  return (
    <CTable>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Ảnh</CTableHeaderCell>
          <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
          <CTableHeaderCell scope="col">Heading</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {products &&
          products.map((e, index) => {
            return (
              <CTableRow key={index}>
                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>@mdo</CTableDataCell>
              </CTableRow>
            )
          })}
      </CTableBody>
    </CTable>
  )
}

// ProductTable.propsType = {
//   products: PropTypes.string,
// }
