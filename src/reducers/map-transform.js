const constants = {
    ADD_TRANSFORM: 'map-transform.ADD_TRANSFORM',
    SET_TRANSFORM: 'map-transform.SET_TRANSFORM',
    START_GESTURE: 'map-transform.START_GESTURE',
};

const actions = {
    addTransform({posX = 0, posY = 0, rotation = 0, scale = 0}) {
        return {
            type: constants.ADD_TRANSFORM,
            posX,
            posY,
            rotation,
            scale,
        };
    },

    setTransform({posX = null, posY = null, rotation = null, scale = null}) {
        return {
            type: constants.SET_TRANSFORM,
            posX,
            posY,
            rotation,
            scale,
        };
    },

    startGesture({startX = 0, startY = 0, startRotation = 0, startScale = 0}) {
        return {
            type: constants.START_GESTURE,
            startX,
            startY,
            startRotation,
            startScale,
        };
    },
};

const defaultState = {
    rotation: 0,
    scale: 1,
    posX: 0,
    posY: 0,
    startRotation: 0,
    startScale: 1,
    startX: 0,
    startY: 0,
};

function mapTransform(state = {...defaultState}, action) {
    console.log('mapTransform', action, state)
    switch (action.type) {
        case constants.ADD_TRANSFORM:
            return {
                ...state,
                posX: state.posX + +action.posX,
                posY: state.posY + +action.posY,
                rotation: state.rotation + +action.rotation,
                scale: state.scale + +action.scale,
            };
        case constants.SET_TRANSFORM:
            return {
                ...state,
                posX: +(action.posX !== null ? action.posX : state.posX),
                posY: +(action.posY !== null ? action.posY : state.posY),
                rotation: +(action.rotation !== null ? action.rotation : state.rotation),
                scale: +(action.scale !== null ? action.scale : state.scale),
            };
        case constants.START_GESTURE:
            return {
                ...state,
                startX: +action.startX,
                startY: +action.startY,
                startRotation: +action.startRotation,
                startScale: +action.startScale,
            };
        default:
            return state;
    }
}

export {
    constants,
    actions,
    mapTransform,
}
