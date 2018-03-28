import React, { Component } from 'react';
import './ProductPage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { updateCartItems } from '../../redux/ducks/reducer';
// Components
import Header from '../Header/Header';

class ProductPage extends Component {
    constructor () {
        super();
        this.state = {
            product: {}
        }
    }

    componentDidMount () {
        console.log( 'Props match ->', this.props.match );
        console.log( 'Props history ->', this.props.history );
        const { match, history } = this.props;
        
        const category = match.params.category;
        const name = match.params.name;
        const id = history.location.search.slice(4, history.location.search.length);

        console.log({ category, name, id });

        // Should later search by subcategory as well ( author, platform, creator, etc. )
        axios.get(`/api/product?category=${ category }&product_id=${ id }&name=${ name }`)
        .then( product => {
           console.log( 'Product ->', product.data );
        //    this.setState({ product: product.data });
        }).catch(err => console.log(err));
    }

    addItem  = () => {
        const { productInfo } = this.props;
        axios.post('/api/cart/add', {
            product_id: productInfo.id,
            name: productInfo.name,
            price: productInfo.price,
            product_category_id: productInfo.product_category_id,
            quantity: 1,
            image_url: productInfo.image_url
        }).then( () => {
            axios.get('/api/cart').then( cart => {

                this.props.updateCartItems( cart.data );

            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    render () {
        const { user, productInfo } = this.props;

        return (
            <div className="product-page">
                <Header match={this.props.match} history={this.props.history} />
                <div className="container panel">

                { productInfo ? (
                    <div className="product">
                        <div className="product-img">
                            <img src={ productInfo.image_url } alt="Product pic"/>
                        </div>
                        <div className="info-container">
                            <h3>{ productInfo.name }</h3>
                            <div>${ productInfo.price }</div>
                            { user.username
                            ? <button className="add-btn red-btn-2" onClick={ this.addItem }>Add To Cart</button>
                            : <Link to="/login" style={{alignSelf: 'center'}}><button className="add-btn red-btn-2">Add To Cart</button></Link> 
                            }
                            <div className="description">
                                <h4>Description</h4>
                                { productInfo.description }
                            </div>
                        </div>
                    </div>
                ) : ( 
                    <h4 style={{margin: '20px 0', fontSize: '18px', color: '#91405475'}}>
                        Item not found<br/>( Try searching again )
                    </h4>
                ) }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        cartItems: state.cartItems,
        productInfo: state.productInfo
    };
};

const mapDispatchToProps = {
    updateCartItems: updateCartItems,
}

export default connect( mapStateToProps, mapDispatchToProps )( ProductPage );