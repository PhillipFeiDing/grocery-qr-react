import React, { Component } from 'react'
import axios from 'axios'

function loadFromQR(fileInputDOM) {
    fileInputDOM.click()
}

function fileSelectedHandler(event, value) {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.set('file', file)
    axios({
        method: 'post',
        url: 'http://api.qrserver.com/v1/read-qr-code/',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data' }
    }).then(function (response) {
        //handle success
        let cart = response.data[0].symbol[0].data
        cart = cart === null ? [] : JSON.parse(cart)
        cart.map((cartItem) => {
            value.addToCart(cartItem.id)
            for (let i = 1; i < cartItem.count; i++) {
                value.increment(cartItem.id)
            }
            return null
        })
    }).catch(function (response) {
        //handle error
        window.alert(response);
    })
}

export default class EmptyCart extends Component {

    constructor(props) {
        super(props)
        this.value = props.value
        // console.log(this.value)
    }
    
    render() {
        return (
            <div className="container mt-5" style={{textAlign: 'center'}}>
                <div className="row">
                    <div className="col-10 mx-auto text-center ">
                        <h1 className="text-title">Your cart is currently empty</h1>
                        <button 
                            className="btn btn-outline-danger text-uppercase mb-3 px-5"
                            type="button" onClick={() => {loadFromQR(this.fileInputDOM)}}
                        >
                            Load from QR
                            <input
                                type='file' style={{display: 'none'}}
                                ref={(el) => {this.fileInputDOM = el}}
                                onChange = {(event) => {fileSelectedHandler(event, this.value)}}
                            />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
