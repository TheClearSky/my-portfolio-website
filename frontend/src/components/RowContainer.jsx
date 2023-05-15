import React from 'react';
import './RowContainer.css';

export default function RowContainer({gap:p_gap="3em",width:p_width="100%",maxwidth:p_maxwidth="1200px",padding:p_padding="2em 4em",children:p_children}) {
  return (
    <div className="rowcontainer" style={{gap:p_gap,width:p_width,maxWidth:p_maxwidth,padding:p_padding}}>
        {p_children}
    </div>
  )
}
