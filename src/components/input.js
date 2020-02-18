import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';
import { LIGHT_GREEN } from './../constants';

export function InputField(props) {
  return (
    <input
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
      step={props.step}
    />
  );
}

InputField.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired
}

export function SliderField(props) {
  return (
    <InputRange
      step={1}
      minValue={props.minValue}
      maxValue={props.maxValue}
      formatLabel={value => `${value} ¢`}
      value={props.value}
      onChange={props.onChange}
    />
  );
}

SliderField.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
}

export function Button(props) {
  const style = {
    backgroundColor: LIGHT_GREEN,
    margin: "auto",
    display: "block",
    color: "white"
  }

  return (
    <button
      style={style}
      onClick={props.onClick}
      className='btn'
    >
      {props.text}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export function Toggle(props) {
  return (
    <div className="can-toggle">
      <input
        id="a"
        type="checkbox"
        checked={props.chekced}
        onChange={props.onChange}
      />
      <label htmlFor="a">
        <div
          className="can-toggle__switch"
          data-checked={props.checkedText}
          data-unchecked={props.uncheckedText}
        ></div>
      </label>
    </div>
  )
}

Toggle.propTypes = {
  checked: PropTypes.bool.isRequired,
  checkedText: PropTypes.string.isRequired,
  uncheckedText: PropTypes.string.isRequired
}
