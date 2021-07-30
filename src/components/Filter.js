import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="filter">
                <div className="filter-result">Contamos con {this.props.count} productos</div>
                <div className="filter-category">Ordenar por:{" "}
                    <select value={this.props.sort} onChange={this.props.sortProducts}>
                        <option value="new">Más Nuevo</option>
                        <option value="highest">Mayor Precio</option>
                        <option value="lowest">Menor Precio</option>
                    </select>
                </div>
                <div className="filter-family">Categorias:{" "}
                    <select value={this.props.family} onChange={this.props.filterProducts}>
                        <option value="">Todos</option>
                        <option value="Abarrotes">Abarrotes</option>
                        <option value="Carnes y Lacteos">Carnes y Lacteos</option>
                        <option value="Frutas y Verduras">Frutas y Verduras</option>
                        <option value="Limpieza y Aseo">Limpieza y Aseo</option>
                    </select>
                </div>
            </div>
        )
    }
}
