import React from "react";
import { Props } from "./types";

/**
 * Component for button.
 *
 * @component
 * @property    {string}     name:          button title
 * @property    {Function}   onClick:       function to invoke on click
 * @property    {string}     type:          button type
 * @property    {string}     disabled:      disable button
 * @property    {string}     className:     styles
 * @property    {string}     dataBsToggle:  data-bs-toggle
 * @property    {string}     dataBsTarget:  data-bs-target
 * @example
 * return (
 *   <Button name="Search" className="btn btn-outline-warning" type="button" disabled={data.length === 0 && true} dataBsToggle="modal" dataBsTarget="#exampleModalCenterTitle" />
 * )
 * @returns     {JSX.Element}
 */
function Button(props: Props) {
  const {
    dataBsTarget,
    dataBsToggle,
    name,
    onClick,
    type,
    disabled = false,
    className,
  } = props;
  return (
    <button
      className={className}
      data-bs-toggle={dataBsToggle}
      data-bs-target={dataBsTarget}
      onClick={onClick}
      type={type || "button"}
      disabled={disabled}
    >
      <span>{name}</span>
    </button>
  );
}

export default Button;
