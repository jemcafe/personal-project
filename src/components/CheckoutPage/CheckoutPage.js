import React, { Component } from 'react';
import './CheckoutPage.css';
import axios from 'axios';

import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';

import Checkout from './Checkout/Checkout';

class CheckoutPage extends Component {
    constructor () {
        super();
        this.state = {}
        this.removeCartItems = this.removeCartItems.bind(this);
    }

    removeCartItems () {
        const { user, updateCartItems } = this.props;
        axios.delete('/api/remove-all-items').then( res => {
            axios.get('/api/cart').then( resp => {
                updateCartItems( resp.data );
                this.props.history.push(`/${user}/cart`);
            }).catch( err => console.log(err) );
        }).catch( err => console.log(err) );
    }

    render () {
        const { user, cartItems } = this.props;

        const priceTotal = cartItems.reduce( (acc, item) => acc += parseFloat(item.price, 10), 0 ).toFixed(2);

        return (
            <div className="checkout-page">

                { user.username &&
                <div className="checkout-page-container">

                    <div className="total">Total: <span>${ priceTotal }</span></div>

                    {/* <div><button>Place Order</button></div> */}

                    <Checkout name={ 'Products' } 
                              description={ 'Various products' } 
                              amount={ priceTotal } 
                              customer={ user.id }
                              removeCartItems={ this.removeCartItems } />

                </div>
                }

            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        cartItems: state.cartItems
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems
}

export default connect( mapStateToProps, mapDispatchToProps )( CheckoutPage );