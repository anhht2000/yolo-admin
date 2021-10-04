import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem } from '@coreui/react'
import React from 'react'

const ProductOptionVariant = (props) => {
  const { option } = props
  return (
    <CAccordion activeItemKey={2}>
      <CAccordionItem itemKey={1}>
        <CAccordionHeader>
          Variant Of Options: &quot;{option.name}&quot; STT: {option.id}
        </CAccordionHeader>
        <CAccordionBody>
          <strong>This is the first item&#39;s accordion body.</strong> It is hidden by default,
          until the collapse plugin adds the appropriate classes that we use to style each element.
          These classes control the overall appearance, as well as the showing and hiding via CSS
          transitions. You can modify any of this with custom CSS or overriding our default
          variables. It&#39;s also worth noting that just about any HTML can go within the{' '}
          <code>.accordion-body</code>, though the transition does limit overflow.
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  )
}

export default ProductOptionVariant
