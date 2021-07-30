import React, { Component } from 'react'
import formatCurrency from '../util';

export default class Cart extends Component {
    constructor(props){
    super(props);
    this.state = {
        name:"",
        email:"",
        address:"",
        showCheckout: false};
    }
    handleInput = (e) => {
        this.setState({[e.target.name]:e.target.value});
    };
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
        };
        this.props.createOrder(order);
    };
    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
                <div className="cart cart-header">
                    <img src="/imagenes/base/Cart.png" width="30"></img>
                </div>
                ) : (
                <div className="cart cart-header">
                    <img src="/imagenes/base/Cart.png" width="30"></img>
                    <button className="count" type="button" style={{ fontSize: 12, background: '#d42a2a', border: 'none',color: '#fff', position:'relative'}}>{cartItems.length}</button>
                </div>
                )}
                <div>
                    <div className="cart">
                        <ul className="cart-items">
                            {cartItems.map(item =>(
                                <li key={item._id}>
                                    <div>
                                        <img src={item.imagen} alt={item.producto}></img>
                                    </div>
                                    <div>
                                        <div>{item.producto}</div>
                                        <div className="rigth">
                                            {formatCurrency(item.precio)} x {item.count}{" "}
                                            <button className="button" onClick={()=>this.props.removeFromCart(item)}>Eliminar</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {cartItems.length!==0 && (
                    <div>    
                        <div className="cart">
                            <div className="total">
                                <div>
                                    Total: {" "}
                                    {formatCurrency (cartItems.reduce((a,c)=>a+c.precio*c.count,0))}
                                </div>
                                <button 
                                    onClick={()=>{
                                        this.setState({showCheckout:true});
                                        }}
                                        className="button primary">
                                        Proceder a Pago</button>
                            </div>
                        </div>
                        {this.state.showCheckout && (
                            <div className="cart">
                                <form onSubmit={this.createOrder}>
                                    <ul className="form-container" >
                                        <li>
                                            <label>Nombre</label>
                                            <input name="name" type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Correo</label>
                                            <input name="email" type="email" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <label>Direccion</label>
                                            <input name="address" type="text" required onChange={this.handleInput}></input>
                                        </li>
                                        <li>
                                            <button className="button primary" type="submit">Proceder a pago</button>
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        )}
                    </div>
                    )}
                </div>
            </div>
        );
    }
}
