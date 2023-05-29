import React from 'react';
import "./Glasscard.css";

export default function Glasscard({className:p_className,style:p_style,children:p_children}) {
  return (
    <div className={'glasscard'+((p_className)?(" "+ p_className):"")} style={p_style}>{p_children}</div>
  )
}
