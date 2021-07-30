import React from "react";
import data from "./data.json";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      products:data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")):[],
      family:"",
      sort:"",
    };
  }

  //Pedido

  createOrder = (order) => {
    alert ("Guardar orden de " + order.name);
  };

  //Pedido

  //remover del carrito

  removeFromCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems:cartItems.filter((x)=>x._id !== product._id),
    });
    localStorage.setItem("cartItems",JSON.stringify(cartItems.filter((x)=>x._id !== product._id)));
  };

  //remover del carrito

  //agregar al carrito
  
  addToCart=(product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item)=>{
      if (item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if (!alreadyInCart){
      cartItems.push({...product, count:1});
    }
    this.setState({cartItems}); 
    localStorage.setItem("cartItems",JSON.stringify(cartItems));
  };

  //agregar al carrito

  sortProducts = (event) => {
    //Filtro por  Ordenar
    const sort=event.target.value;
    console.log(event.target.value);
    this.setState((state)=> ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a,b)=>
        sort === "lowest"
          ? a.precio > b.precio
            ? 1
            :-1
          : sort === "highest"
          ? a.precio < b.precio
            ? 1
            : -1
          : a.familia > b.familia
          ? 1
          : -1
      ),
    }));
  };
    //Filtro por Categorias
  filterProducts = (event) => {
    console.log(event.target.value);
    if(event.target.value === ""){
      this.setState({family: event.target.value, products:data.products});
    } else{
      this.setState({
        family: event.target.value,
        products: data.products.filter((product)=>product.categorias.indexOf(event.target.value) >=0 ),
      });
    }
  };

  //agregar al carrito

//Principal

  render(){
    return (
    <div className="grid-container">
      <header>
        <a href="/">Market Maribel</a>
      </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
                count={this.state.products.length}
                family={this.state.family}
                sort={this.state.sort}
                filterProducts={this.filterProducts}
                sortProducts={this.sortProducts}
              ></Filter>
              <Products 
                products={this.state.products} 
                addToCart={this.addToCart}>
              </Products>
            </div>
            <div className="sidebar">
              <Cart 
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
                createOrder={this.createOrder}>
              </Cart>
            </div>
          </div>
        </main>
        <footer>
          Azure Design
        </footer>
    </div>
    );
  }
}

//Principal

export default App;
