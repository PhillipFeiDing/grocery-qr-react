import React, { Component } from 'react'
import Product from'./Product'
import Title from './Title'
import {ProductConsumer} from '../context'

export default class ProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchPrompt: ''
        }
        this.onSearchChange = this.onSearchChange.bind(this)
    }
    
    onSearchChange(e) {
        const searchPrompt = e.target.value
        this.setState(() => ({
            searchPrompt
        }))
    }

    render() {
        return (
            <React.Fragment>
                <div className = "py-5">
                    <div className="container">
                            <Title name="Our" title="product" />
                            <div style={{textAlign: 'center'}}>
                                <input
                                    type='text' placeholder='What are you looking for?'
                                    style={{maxWidth: '75%', width: '300px'}}
                                    onChange={this.onSearchChange}
                                />
                            </div>
                            <div className="row">
                                <ProductConsumer>
                                    {(value) => {
                                        let filtered = value.products
                                        const searchPrompt = this.state.searchPrompt.toLowerCase()
                                        if (searchPrompt !== '') {
                                            filtered = filtered.filter((product) => (product.title.toLowerCase().indexOf(searchPrompt) !== -1))
                                        }
                                        if (filtered.length === 0) {
                                            return (
                                                <p style={{color: 'red', textAlign: 'center', width: '100%', marginTop: '1em'}}>Oops, we cannot find your product.</p>
                                            )
                                        }
                                        return filtered.map(product => <Product key={product.id} product={product}/>)
                                    }}
                                </ProductConsumer>
                            </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
