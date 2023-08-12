import React from "react";

interface Props {
  xAmount: number;
  yAmount: number;
  horizontal?: boolean;
  vertical?: boolean;
}

/**
 * Component for button.
 *
 * @component
 * @property    {number}     xAmount:          vertical number amount
 * @property    {number}     yAmount:          vertical number amount
 * @property    {boolean}    horizontal:       type of space
 * @property    {boolean}    horizontal:       type of space
 * @example
 * return (
 *   <Space xAmount={4} />
 * )
 * @returns     {JSX.Element}
 */
const Space = (props: Props) => {
  const { xAmount, yAmount, horizontal = false, vertical = true } = props;
  if (horizontal) return <div className={`my-${yAmount}`} />;
  if (horizontal && vertical)
    return <div className={`mx-${xAmount} my-${yAmount}`} />;
  return <div className={`mx-${xAmount}`} />;
};

export default Space;
