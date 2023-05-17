import React from 'react';
import './RowContainer.css';

export default function RowContainer({children:p_children}) {
  return (
    <div className="rowcontainer" >
        {p_children}
    </div>
  )
}
