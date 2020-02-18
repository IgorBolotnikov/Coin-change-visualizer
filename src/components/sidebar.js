import React from 'react';

import { DEEP_BLUE } from './../constants';

export default function Sidebar(props) {
  const sidebarStyle = {
    backgroundColor: DEEP_BLUE,
  }

  return (
    <div
      style={sidebarStyle}
      className="container-md p-4"
    >
      {props.children}
    </div>
  );
}
