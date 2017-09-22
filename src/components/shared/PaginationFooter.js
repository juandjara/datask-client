import React from 'react'
import PropTypes from 'prop-types'
import Tooltip from 'react-toolbox/lib/tooltip'
import IconButton from 'react-toolbox/lib/button/IconButton'

const TooltipIconButton = Tooltip(IconButton);

const PaginationFooter = props => {
  const {params, onPageChange} = props
  return (
    <div style={{
      margin: '1em 0',
      textAlign: 'right'
    }}>
      <TooltipIconButton
        onClick={() => onPageChange(0)}
        disabled={params.first}
        icon="first_page" 
        tooltip="Primera pag."
        tooltipPosition="left"
      />
      <TooltipIconButton
        onClick={() => onPageChange(params.page - 1)}
        disabled={params.first}
        icon="chevron_left" 
        tooltip="Pag. anterior"
        tooltipPosition="left"
      />
      <TooltipIconButton
        onClick={() => onPageChange(params.page + 1)}
        disabled={params.last}
        icon="chevron_right"
        tooltip="Pag. siguiente"
        tooltipPosition="left"
      />
      <TooltipIconButton
        onClick={() => onPageChange(params.totalPages - 1)}
        disabled={params.last}
        icon="last_page"
        tooltip="Ultima pag."
        tooltipPosition="left"
      />
    </div>
  )
}
PaginationFooter.propTypes = {
  onPageChange: PropTypes.func,
  params: PropTypes.shape({
    page: PropTypes.number,
    totalPages: PropTypes.number,
    first: PropTypes.bool,
    last: PropTypes.bool
  })
}

export default PaginationFooter