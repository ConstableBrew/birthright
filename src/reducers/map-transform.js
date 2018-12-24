export const actions = {
    ADD_TRANSFORM: 'map-transform.ADD_TRANSFORM',
    addTransform({posX = 0, posY = 0, rotation = 0, scale = 0}) {
        return {
            type: actions.TRANSLATE,
            posX,
            posY,
            rotation,
            scale,
        };
    },

    SET_TRANSFORM: 'map-transform.SET_TRANSFORM',
    setTransform({posX = null, posY = null, rotation = null, scale = null}) {
        return {
            type: actions.SET_TRANSFORM,
            posX,
            posY,
            rotation,
            scale,
        };
    },

    START_GESTURE: 'map-transform.START_GESTURE',
    startGesture({startX = 0, startY = 0, startRotation = 0, startScale = 0}) {
        return {
            type: actions.START_GESTURE,
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

export function mapTransform(state = {...defaultState}, action) {
    switch (action.type) {
        case actions.ADD_TRANSFORM:
            return {
                ...state,
                posX: state.posX + +action.posX,
                posY: state.posY + +action.posY,
                rotation: state.rotation + +action.rotation,
                scale: state.scale + +action.scale,
            };
        case actions.SET_TRANSFORM:
            return {
                ...state,
                posX: +(action.posX !== null ? action.posX : state.posX),
                posY: +(action.posY !== null ? action.posY : state.posY),
                rotation: +(action.rotation !== null ? action.rotation : state.rotation),
                scale: +(action.scale !== null ? action.scale : state.scale),
            };
        case actions.START_GESTURE:
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
