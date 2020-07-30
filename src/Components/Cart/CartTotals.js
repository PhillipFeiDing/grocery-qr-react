import React from 'react'
import {Link} from 'react-router-dom'

export default function CartTotals({value}) {
    const {cartTotal, cartSubtotal, cartTax, clearCart} = value;
    return (
        <React.Fragment>
            <div className= "container">
                <div className= "row">
                    <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                        <Link to='/cart'>
                            <button style={{marginRight: '.5em'}}className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button" onClick={() => clearCart()}>Clear Cart</button>
                        </Link>
                        <Link to='/checkout'>
                            <button className="btn btn-outline-danger text-uppercase mb-3 px-5" type="button">Checkout QR</button>
                        </Link>
                        <h5><span className="text-title">subtotal: </span><strong>$ {Math.round(cartSubtotal * 100) / 100}</strong></h5>
                        <h5><span className="text-title">Tax: </span><strong>$ {Math.round(cartTax * 100) / 100}</strong></h5>
                        <h5><span className="text-title">Total: </span><strong>$ {Math.round(cartTotal * 100) / 100}</strong></h5>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )
}
