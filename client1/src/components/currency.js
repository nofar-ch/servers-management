import React from 'react'

const Currency = (props) => {
   const {changeCurrencyFn} = props;
    return <div className="form-group" style={{position: 'absolute',marginTop: '-16px', right:'0',  width: '100px'}}>
        <select className="form-control" id="select" onChange={() => changeCurrencyFn()}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="ILS">ILS</option>
        </select>
         </div>
}

export default Currency;