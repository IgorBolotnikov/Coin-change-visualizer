import React from 'react';
import PropTypes from 'prop-types';
import InputRange from 'react-input-range';

export function InputField(props) {
  return (
    <input className="input-field"
      id={props.id}
      value={props.value}
      onChange={props.onChange}
      type={props.type}
      placeholder={props.placeholder}
      step={props.step}
      disabled={props.disabled}
    />
  );
}

InputField.propTypes = {
  id: PropTypes.number,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  disabled: PropTypes.bool
}

export function SliderField(props) {
  return (
    <InputRange
      step={1}
      minValue={props.minValue}
      maxValue={props.maxValue}
      formatLabel={value => `${value}${props.format || ""}`}
      value={props.value}
      onChange={props.onChange}
      step={props.step}
    />
  );
}

SliderField.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  format: PropTypes.string
}

export function DoubleSliderField(props) {
  return (
    <InputRange
      step={1}
      minValue={props.minValue}
      maxValue={props.maxValue}
      formatLabel={value => `${value}${props.format || ""}`}
      value={props.value}
      onChange={props.onChange}
      step={props.step}
    />
  );
}

DoubleSliderField.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  format: PropTypes.string
}

export function Button(props) {
  return (
    <button
      onClick={props.onClick}
      className='btn button-accent'
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

export function CheckBox(props) {
  return (
    <input
      type="checkbox"
      id={props.id}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
}

CheckBox.propTypes = {
  id: PropTypes.number,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
}
