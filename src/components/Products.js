import React, { Component } from 'react'
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: null,
        };
    }
    openModal = (product) => {
        this.setState({product});
    };
    closeModal = () => {
        this.setState({product:null});
    };
    render() {
        const {product}=this.state;
        return (
            <div>
                <Fade cascade>
                    <ul className="products">
                        <div className="box-container">
                        {this.props.products.map(product=>(
                            <li className="box" key={product._id}>
                                <div className="product">
                                    <a 
                                        href={"#"+product._id} 
                                        onClick={()=>this.openModal(product)}>
                                            <img src={product.imagen} alt={product.descripcion}></img>
                                            <p>{product.producto}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>{formatCurrency(product.precio)}</div>
                                    </div>
                                    <div className="quantity">
                                        <span>Cantidad : </span>
                                        <input type="number" min="1" max={product.stock} defaultValue="1"></input>
                                    </div>
                                    <button onClick={()=>this.props.addToCart(product)} className="button primary">Agregar al Carrito</button>
                                </div>
                            </li>
                        ))}
                        </div>
                    </ul>
                </Fade>
                { product && (
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom clear>
                                <button className="close-modal" onClick={this.closeModal}>x</button>
                                <div className="product-details">
                                    <img src={product.imagen} alt={product.title}></img>
                                    <div className="product-details-description">
                                        <p>
                                            <strong>{product.producto}</strong>
                                        </p>
                                        <p>
                                            {product.descripcion}
                                        </p>
                                        <div className="product-price">
                                            {formatCurrency(product.precio)}
                                            <button className="button primary" onClick={()=>{
                                                this.props.addToCart(product);
                                                this.closeModal();
                                            }}> Agregar al Carrito
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Zoom>
                        </Modal>
                    )
                }
            </div>
        )
    }
}
