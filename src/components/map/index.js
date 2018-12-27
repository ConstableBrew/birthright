import React, { Component } from 'react';
import mapSvg from './map.svg';
import connect from './selectors';
import './map.css';

class Map extends Component {
    constructor(props) {
        super(props);
        this.setMapSvg = this.setMapSvg.bind(this);
    }

    render() {
        return (
            <object
              className="Map"
              ref={this.setMapSvg}
              data={mapSvg}
              type="image/svg+xml"
              aria-label="map display"
            ></object>
        );
    }

    transformSvg() {
        const {posX, posY, scale} = this.props;
        this.mapSvg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    }

    setMapSvg(element) {
        this.mapSvg = element.contentDocument.querySelector('svg');
    }
}

export default connect(Map);
