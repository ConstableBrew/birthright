import {connect} from 'react-redux';
import {actions} from '../../reducers/map-transform';

export default connect(mapStateToProps, mapDispatchToProps)

function mapStateToProps(state/*, ownProps*/) {
    const mapTransform = state.mapTransform || {};
    return {
        rotation: mapTransform.rotation || 0,
        scale: mapTransform.scale || 0,
        posX: mapTransform.posX || 0,
        posY: mapTransform.posY || 0,
        startRotation: mapTransform.startRotation || 0,
        startScale: mapTransform.startScale || 0,
        startX: mapTransform.startX || 0,
        startY: mapTransform.startY || 0,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addTransform: (vector) => dispatch(actions.addTransform(vector)),
        setTransform: (vector) => dispatch(actions.setTransform(vector)),
        startGesture: (vector) => dispatch(actions.startGesture(vector)),
    };
}
