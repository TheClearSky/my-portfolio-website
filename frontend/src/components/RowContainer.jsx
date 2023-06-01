import React from 'react';
import './RowContainer.css';

export default function RowContainer({children:p_children,style:p_style}) {
  return (
    <div style={p_style} className="rowcontainer" >
        {p_children}
    </div>
  )
}
