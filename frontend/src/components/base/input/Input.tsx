import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
  className: string;
  type: string;
  placeHolder?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  disabled?: boolean;
}

/**
 * Component for button.
 *
 * @component
 * @property    {string}     placeHolder:        input placeholder
 * @property    {Function}   onChange:           function to invoke on change
 * @property    {string}     type:               input type
 * @property    {string}     ariaLabel:          ...
 * @property    {string}     className:          styles
 * @property    {string}     ariaDescribedby:    ...
 * @property    {string}     value:              input value
 * @property    {boolean}    disabled:           disable input
 * @example
 * return (
 *    <Input id="email" className="form-control form-control-lg" type="email" onChange={handleChange} value={value} />
 * )
 * @returns     {JSX.Element}
 */
function Input(props: Props) {
  const {
    className,
    type,
    placeHolder,
    ariaLabel,
    ariaDescribedby,
    onChange,
    value,
    disabled,
    ...rest
  } = props;
  return (
    <input
      className={className || "form-control input-text"}
      type={type}
      placeholder={placeHolder || "Search...."}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedby}
      disabled={disabled}
      onChange={onChange}
      value={value}
      {...rest}
    />
  );
}

export default Input;
