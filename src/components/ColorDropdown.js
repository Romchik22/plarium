import React from 'react'
import PropTypes from 'prop-types'

const ColorDropdown = ({ colors, onChange }) => {

    return (
      <div className="dropdown">
        <div className=" square square-drop"></div>
        {colors.map((color, i) =>
            <div className="color-item" key={color + i} onClick={() => onChange(color.value)}>
              <span className="color-item-text">{color.name}</span>
              <div className="color-item-square" style={{backgroundColor: color.value}}>
              </div>
            </div>
          )}
      </div>
    )
};

ColorDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })).isRequired
};

export default ColorDropdown;