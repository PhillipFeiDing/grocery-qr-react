import React, { Component } from 'react'
import {ProductConsumer} from '../../context'

function makeJsonStringGroceryList(cart) {
    return encodeURI(JSON.stringify(cart.map((cartItem) => ({
        id: cartItem.id,
        count: cartItem.count
    }))))
}

export default class Checkout extends Component {
    
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <p>Here is your QR encoded grocery list!</p>
                <ProductConsumer>
                    {
                        (value) => {
                            const cart = value.cart
                            const jsonString = makeJsonStringGroceryList(cart)
                            return (
                                <img
                                    src={"https://api.qrserver.com/v1/create-qr-code/?data=" + jsonString + "&amp;size=500x500"}
                                    alt="" title=""
                                />
                            )
                        }
                    }
                </ProductConsumer>
                <div style={{marginTop: '1em'}}>
                    Save it and share!
                </div>
            </div>
        )
    }
}