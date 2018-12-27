import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import mapSvg from './map.svg';
import connect from './selectors';
import './map.css';

class Map extends Component {
    constructor(props) {
        console.log('constructor')
        super(props);
        this.ref = React.createRef();
        this.prepareSvg();
        this.wheelEventHandler = this.wheelEventHandler.bind(this);
    }

    componentDidMount() {
        console.log('componentDidMount')
        this.renderSvg();
    }

    componentDidUpdate(prevProps) {
        console.log('componentDidUpdate')
        this.renderSvg();
    }

    render() {
        console.log('render')
        return (
            <div
              className="Map"
              ref={this.ref}
            ></div>
        );
    }

    transformSvg() {
        const {posX, posY, scale} = this.props;
        const transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        console.log('transformSvg', transform, !!this.svg)
        if (this.svg) {
            this.svg.style.transform = transform;
        }
    }

    prepareSvg() {
        console.log('prepareSvg')
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = ReactDOMServer.renderToStaticMarkup(
            <object
                className="Map"
                data={mapSvg}
                type="image/svg+xml"
                aria-label="map display"
            ></object>
        );
        this.svgWrapper = tempDiv.firstChild;
        this.svgWrapper.addEventListener('load', () => {
            console.log('svg loaded', !this.contentDocument)
            if (!this.contentDocument) {
                this.contentDocument = this.svgWrapper.contentDocument;
                this.svg = this.contentDocument.querySelector('svg');

                this.contentDocument.addEventListener('wheel', this.wheelEventHandler);
                this.svg.addEventListener('wheel', this.wheelEventHandler);
            }
        })
    }

    renderSvg() {
        console.log('renderSvg')
        if (this.ref.current) {
            this.ref.current.appendChild(this.svgWrapper);
        }
        this.transformSvg();
    }

    wheelEventHandler(event) {
        console.log('wheelEventHandler')
        event.preventDefault();
        if (event.ctrlKey) {
            // Pinch gestures on trackpad
            this.props.addTransform({
                scale: -event.deltaY * 0.01,
            });
        } else {
            // Real mouse wheel or trackpad swipping
            this.props.addTransform({
                posX: -Math.sign(event.deltaX) * 50,
                posY: -Math.sign(event.deltaY) * 50,
            });
        }
    }
}

export default connect(Map);
