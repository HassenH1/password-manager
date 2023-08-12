import React, { useState } from "react";

function useToggle(initialStatus = false): [boolean, Function] {
  const [show, setShow] = useState(initialStatus);
  const toggle = () => setShow((prev: boolean) => !prev);
  return [show, toggle];
}

export default useToggle;
