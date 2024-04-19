import React, { Component } from 'react';

class WikipediaSearch extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            busqueda: "",
            nombreCurado: ""
        }
    }

    componentDidMount() {
        this.updateStateBasedOnProps();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.steps.seleccion.value !== this.props.steps.seleccion.value ||
            prevProps.steps.seleccionFront.value !== this.props.steps.seleccionFront.value ||
            prevProps.steps.seleccionBack.value !== this.props.steps.seleccionBack.value) {
            this.updateStateBasedOnProps();
        }
    }

    updateStateBasedOnProps() {
        const { seleccion, seleccionFront, seleccionBack } = this.props.steps;
        if (seleccion.value === "f") {
            this.updateBusqueda(seleccionFront.value);
        } else if (seleccion.value === "b") {
            this.updateBusqueda(seleccionBack.value);
        }
    }

    updateBusqueda(value) {
        let nombreCurado = value.includes("_") ? value.substring(0, value.indexOf("_")) : value;
        this.setState({
            busqueda: value,
            nombreCurado: nombreCurado
        });
    }

    render() {
        return (
            <div>
                <p>Here's a link to the Wikipedia page of {this.state.nombreCurado}: </p>
                <a href={"https://es.wikipedia.org/wiki/" + this.state.busqueda} target="_blank">{this.state.nombreCurado}</a>
            </div>
        );
    }
}

export default WikipediaSearch;
