import React, { Component } from 'react'
import formatCurrency from "../util";

export default class Products extends Component {
    render() {
        return (
            <div>
                <ul className="products">
                    <div className="box-container">
                    {this.props.products.map(product=>(
                        <li className="box" key={product._id}>
                            <div className="product">
                                <a href={"#"+product._id}>
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
            </div>
        )
    }
}
