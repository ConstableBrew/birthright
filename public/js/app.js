
/////////////////////////////////////////
// PLAN OF ACTION
    // getBBox()
    // Transform BBox to map getScreenCTM
    // Transform to <use> element's getScreenCTM



/*

    Notes on scaling with google maps zoom levels

    HiRes map 27417 × 18023 ---> 0.999088157% --> 27392 x 18,006.56

    Cerilia continent width ~1400 miles = 2253082 meters
    Earth radius 6378137 m, Circumference 40075016 m
    meters per mile = 1609.34
    Hex scales we want:
        1 mile (detail) --- 1609.34 (zoom 16)
        6 mile (township) --- 9656.04 (zoom 14)
        36 mile (province) --- 57936.24 (zoom 11)
        216 mile (kingdom) --- 347617.44 (zoom 9)
        1296 mile (continent) --- 2085704.64 (zoom 6)
        7776 mile (world) --- 12514227.84 (zoom 3)
      // An array holds values for meters_per_pixel based on the zoom 
    Start with single 256px tile to contain the entire world
    Then double the number of tiles each zoom level
    meters per pixel
    zoom 0: 156543.03392; - tiles <-- entire earth fits into 256 px
    zoom 1: 78271.51696; - tiles
    zoom 2: 39135.75848; - tiles
    zoom 3: 19567.87924; - tiles <-- world (comfortable 900 px)
    zoom 4: 9783.93962; 1 tiles <-- entire continent fits into 256 px
    zoom 5: 4891.96981; 2 tiles
    zoom 6: 2445.98490; 4 tiles <-- continent
    zoom 7: 1222.99245; 8 tiles
    zoom 8: 611.49622; 16 tiles
    zoom 9: 305.74811; 32 tiles <-- kingdom
    zoom 10: 152.87405; 64 tiles ~~~Province
    zoom 11: 76.43702; 128 tiles <-- province
    zoom 12: 38.21851; 256 tiles
    zoom 13: 19.10925; 512 tiles
    zoom 14: 9.55462; 1024 tiles <-- township
    zoom 15: 4.77731; 2048 tiles
    zoom 16: 2.38865; 4106 tiles <-- detail
    zoom 17: 1.19432; 
    zoom 18: 0.59716; 
    zoom 19: 0.29858;
    zoom 20: 0.149298;
    zoom 21: 0.074645; <-- battlemap

*/

window.onload = () => {

    const gesture = {
        rotation: 0,
        scale: 1,
        posX: 0,
        posY: 0,
        startRotation: 0,
        startScale: 1,
        startX: 0,
        startY: 0,
    };
    const swatches = [
        [
            '#8dd3c7',
            '#bebada',
            '#fb8072',
            '#80b1d3',
            '#fdb462',
            '#b3de69',
            '#fccde5',
            '#ffffb3',
            '#d9d9d9',
            '#bc80bd',
            '#ccebc5',
            '#ffed6f',
        ],
        [ // blues
            '#08519c',
            '#2171b5',
            '#4292c6',
            '#6baed6',
            '#9ecae1',
            '#c6dbef',
            '#deebf7',
            '#f7fbff',
        ],
        [ // oranges
            '#993404',
            '#cc4c02',
            '#ec7014',
            '#fe9929',
            '#fec44f',
            '#fee391',
            '#fff7bc',
            '#ffffe5',
        ],
    ];
    const mapContainer = document.getElementById('map');
    const map = mapContainer.contentDocument.querySelector('svg');
    const basePoint = map.createSVGPoint();

    const centerScreen = {x: window.innerWidth / 2, y: window.innerHeight / 2};
    const mapCenter = {x: map.clientWidth / 2, y: map.clientWidth / 2};
    const mapOffset = {x: (centerScreen.x - mapCenter.x) / 2, y: (centerScreen.y - mapCenter.y) / 2};

    let pendingRender = null;
    let selectedDomain = {name: null, regent: null, provinces: []};
    let selectedProvinces = [];
    let hoveredProvinces = [];
    const hiddenProvinces = [];
    const allProvinces = map.querySelectorAll('#Anuire use, #Rjurik use, #Brecht use, #Kinasi use, #Voosgard use');

    setup();
    render();

    function render() {
        // Constrain map size
        gesture.scale = Math.min(Math.max(gesture.scale, 0.0625), 16); // 16x scale factor max
        // width="3090.132px" height="2403.564px"
        gesture.posX = constrain(gesture.posX, -map.clientWidth * gesture.scale / 4, map.clientWidth * gesture.scale / 4);
        gesture.posY = constrain(gesture.posY, -map.clientHeight * gesture.scale / 2, map.clientHeight * gesture.scale / 2);

        pendingRender && window.cancelAnimationFrame(pendingRender);
        pendingRender = window.requestAnimationFrame(() => {
            const transform = `translate(${gesture.posX}px, ${gesture.posY}px) scale(${gesture.scale})`;
            map.style.transform = transform;
            clipHiddenElements(allProvinces);
            pendingRender = null;
        });
    }

    function setup() {
        const textContainer = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        textContainer.setAttribute('id', 'text_container');
        map.appendChild(textContainer);

        addLabels(allProvinces);

        selectedDomain.name = 'Nilsvaar';
        selectedDomain.domain = window.domains.domains[selectedDomain.name];
        selectedDomain.regent = window.domains.regents[selectedDomain.domain.regent];

        allProvinces.forEach((symbol) => {
            const id = symbol.href.animVal;
            const province = window.domains.provinces[id.substr(1)];
            const domain = province && window.domains.domains[province.domain];
            const regent = domain && window.domains.regents[domain.regent];
            const lord = regent && regent.lord;
            if (regent && regent.name === selectedDomain.regent.name) {
                const color = swatches[0][0];
                selectedDomain.provinces.push({id, color});
            }
            else if (lord === selectedDomain.regent.name) {
                const index = selectedDomain.regent.vassals.findIndex((vassal) => vassal === regent.key);
                const color = swatches[0][index + 1];
                selectedDomain.provinces.push({id, color});
            }
            else {
                return;
            }

            selectedDomain.provinces.forEach((province) => {
                const id = province.id;
                const color = province.color;
                map.querySelectorAll(`${id} polygon`)
                    .forEach((polygon) => polygon.attributes.fill.value = color);
            });

        });
    }

    /**
     * Updates polygon path points to the current transformed position
     **/
    function getTransformedPolygonPoints(polygon, ctm) {
        const pointsList = polygon.points;
        const length = pointsList.numberOfItems;
        const transformedPoints = [];
        for(let m = 0; m < length; ++m) {
            const point = map.createSVGPoint();
            point.x = pointsList.getItem(m).x;
            point.y = pointsList.getItem(m).y;
            let transformedPoint = point.matrixTransform(ctm);
            transformedPoints.push(transformedPoint);
        }
        return transformedPoints;
    }

    function isPointInsidePolygon(polygon, point) {
        let result = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            if (
                (
                    polygon[i].y <= point.y && point.y < polygon[j].y
                    || polygon[j].y <= point.y && point.y < polygon[i].y
                )
                && point.x < (polygon[j].x - polygon[i].x) * (point.y - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x
            ) {
                result = !result;
            }
        }
        return result;
    }

    function isPointInsideBBox(bbox, point) {
        return bbox.x <= point.x
            && bbox.x + bbox.width >= point.x
            && bbox.y <= point.y
            && bbox.y + bbox.height >= point.y;
    }

    function getSymbolsAtPoint(symbols, point) {
        const foundSymbols = [];
        symbols.forEach((symbol) => {
            const bbox = symbol.getBoundingClientRect();
            if (isPointInsideBBox(bbox, point)) {
                const ctm = symbol.getScreenCTM();
                const id = symbol.href.animVal;
                const polygons = map.querySelectorAll(`${id} polygon`);
                polygons.forEach((polygon) => {
                    const transformedPolygon = getTransformedPolygonPoints(polygon, ctm);
                    if (isPointInsidePolygon(transformedPolygon, point)) {
                        foundSymbols.push(symbol);
                    }
                });
            }
        });
        return foundSymbols;
    }

    function clipHiddenElements(symbols) {
        symbols.forEach((symbol) => {
            const bbox = symbol.getBoundingClientRect();
            if (bbox.x + bbox.width >= 0
                && bbox.x <= window.innerWidth
                && bbox.y + bbox.height >= 0
                && bbox.y <= window.innerHeight
            ) {
                symbol.style.display = '';
                delete symbol.style.display;
            }
            else {
                symbol.style.display = 'none';
            }
        });
    }

    function addLabels(symbols) {
        const textContainer = map.querySelector('#text_container');
        symbols.forEach((symbol) => {
            if (!symbol.style.display) {
                const id = symbol.href.animVal;
                const province = window.domains.provinces[id.substr(1)];
                if (province) {
                    const bbox = symbol.getBoundingClientRect();
                    if (!map.querySelector(`${id.substr(1)}_text_ref`)) {
                        /*
                            <symbol id="Kolinau" viewBox="-29.917 -48.177 59.833 96.352">
                                <g>
                        */
                        const transform = symbol.transform.baseVal;

                        const provinceText = `${province.name || id.substr(1)}\n(${province.level}/${province.sourcePotential})`;
                        const textNode = document.createTextNode(provinceText);

                        const text = map.querySelector(`${id.substr(1)}_text`) || document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        text.setAttribute('id', `${id.substr(1)}_text`);
                        // text.setAttribute('x', '0');
                        // text.setAttribute('y', '0');
                        // text.setAttribute('width', bbox.width);
                        // text.setAttribute('height', bbox.height);
                        // text.setAttribute('alignment-baseline', 'middle');
                        // text.setAttribute('text-anchor', 'middle');
                        text.setAttribute('font-size', `${bbox.height / 5}`);
                        text.setAttribute('stroke', 'black');
                        text.setAttribute('stroke-width', '0.75');
                        // text.setAttribute('transform', 'scale(+1,-1)');
                        text.appendChild(textNode);

                        const group = map.querySelector(`${id.substr(1)}_text_group`) || document.createElementNS('http://www.w3.org/2000/svg', 'g');
                        group.setAttribute('id', `${id.substr(1)}_text_group`);
                        group.appendChild(text);

                        const symbolRoot = map.querySelector(id);
                        const wrapper = map.querySelector(`${id.substr(1)}_text_wrapper`) || document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
                        const vBox = symbolRoot.viewBox.baseVal;
                        wrapper.setAttribute('id', `${id.substr(1)}_text_wrapper`);
                        wrapper.setAttribute('viewBox', `${vBox.x} ${vBox.y} ${vBox.width} ${vBox.height}`);
                        wrapper.setAttribute('width', vBox.width);
                        wrapper.setAttribute('height', vBox.height);
                        wrapper.appendChild(group);
                        map.appendChild(wrapper);

                        const textRef = map.querySelector(`${id.substr(1)}_text_ref`) || document.createElementNS('http://www.w3.org/2000/svg', 'use');
                        textRef.setAttribute('id', `${id.substr(1)}_text_ref`);
                        textRef.setAttribute('xlink:href', `${id}_text_wrapper`);
                        ['width', 'height', 'x', 'y'].forEach((attribute) => {
                            symbol[attribute] && textRef.setAttribute(attribute, symbol[attribute].baseVal.value);
                        });
                        textRef.setAttribute('overflow', 'visible');
                        textRef.setAttribute('transform', `matrix(${transform[0].matrix.a} ${transform[0].matrix.b} ${transform[0].matrix.c} ${transform[0].matrix.d} ${transform[0].matrix.e} ${transform[0].matrix.f})`);
                        textContainer.appendChild(textRef);


                        // const g = map.querySelector(`${id} g`) || document.createElementNS('http://www.w3.org/2000/svg', 'g');
                        // map.querySelectorAll(`${id} polygon`)
                        //     .forEach((polygon) => g.appendChild(polygon));
                        // const text = map.querySelector(`${id} text`) || document.createElementNS('http://www.w3.org/2000/svg', 'text');
                        // // text.setAttribute('x', bbox.x);
                        // // text.setAttribute('y', bbox.y);
                        // // text.setAttribute('width', bbox.width);
                        // // text.setAttribute('height', bbox.height);
                        // text.setAttribute('alignment-baseline', 'middle');
                        // text.setAttribute('text-anchor', 'middle');
                        // text.setAttribute('font-size', `${bbox.height / 5}`);
                        // text.setAttribute('stroke', 'black');
                        // text.setAttribute('stroke-width', '1.0');
                        // text.setAttribute('transform', 'scale(+1,-1)');

                        // const provinceText = `${province.name || id.substr(1)}\n(${province.level}/${province.sourcePotential})`;
                        // const textNode = document.createTextNode(provinceText);
                        // text.appendChild(textNode);
                        // g.appendChild(text);

                        // symbolRoot.appendChild(g);
                        // console.log(symbolRoot);
                    }
                }
            }
        });
        map.appendChild(textContainer);
    }

    function getBaseColor(id, base = '#449900') {
        let color = base;
        selectedDomain.provinces.some((province) => {
            if (province.id === id) {
                // Use original highlighted color from domain selection
                color = province.color;
                return true;
            }
        });
        return color;
    }

    function constrain(val, min, max) {
        return Math.min(Math.max(val, min), max);
    }

    /**
     * Lighten or darken a color by a given amount closer to white/black
     * https://stackoverflow.com/a/13542669
     * @param {string} color - 7 digit hex color
     * @param {float} amount - ranges -1.0 to 1.0
     */
    function shadeColor(color, amount) {
        var f=parseInt(color.substr(1),16),t=amount<0?0:255,p=amount<0?amount*-1:amount,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
        return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).substr(1);
    }

    /**
     * Blend two colors, 0 for all c0, 1 for all c1, 0.5 for halfway between the two
     * https://stackoverflow.com/a/13542669
     * @param {string} c0 - 7 digit hex color
     * @param {string} c1 - 7 digit hex color
     * @param {float} p - ranges 0 to 1.0
     */
    function blendColors(c0, c1, p) {
        var f=parseInt(c0.substr(1),16),t=parseInt(c1.substr(1),16),R1=f>>16,G1=f>>8&0x00FF,B1=f&0x0000FF,R2=t>>16,G2=t>>8&0x00FF,B2=t&0x0000FF;
        return "#"+(0x1000000+(Math.round((R2-R1)*p)+R1)*0x10000+(Math.round((G2-G1)*p)+G1)*0x100+(Math.round((B2-B1)*p)+B1)).toString(16).substr(1);
    }

    const keydownEventListener = (event) => {
        switch (event.key) {
            case '+':
            case '=':
                gesture.scale += 0.5 * Math.log(gesture.scale * 2 + 1)/0.6931471806;
                event.preventDefault();
                break;
            case '-':
            case '_':
                gesture.sale -= 0.5 * Math.log(gesture.scale * 2 + 1)/0.6931471806;
                event.preventDefault();
                break;
            case 'ArrowUp':
                gesture.posY += 50 * Math.log(gesture.scale * 2 + 1)/0.6931471806;
                event.preventDefault();
                break;
            case 'ArrowDown':
                gesture.posY -= 50 * Math.log(gesture.scale * 2 + 1)/0.6931471806;
                event.preventDefault();
                break;
            case 'ArrowLeft':
                gesture.posX += 50 * Math.log(gesture.scale * 2 + 1)/0.6931471806;
                event.preventDefault();
                break;
            case 'ArrowRight':
                gesture.posX -= 50 * Math.log(gesture.scale * 2 + 1)/0.6931471806;
                event.preventDefault();
                break;
        }
        render();
    }
    window.addEventListener('keydown', (event) => console.log('window event', 'keydownEventListener') || keydownEventListener(event));

    /**
     * Zoom on wheel events. Trackpad pinch is a mouse wheel event with ctrl key pressed.
     **/
    const wheelEventListener = (event) => {
        event.preventDefault();

        if (event.ctrlKey) {
            gesture.scale -= event.deltaY * 0.01 * Math.log(gesture.scale * 2 + 1)/0.6931471806;
        } else {
            gesture.posX -= event.deltaX * 2;
            gesture.posY -= event.deltaY * 2;
        }

        render();
    };
    mapContainer.contentDocument.addEventListener('wheel', (event) => console.log('mapContainer event', 'wheelEventListener') || wheelEventListener(event));

    /**
     * Start monitoring gesture start position to identify amount of X-Y panning and rotation
     **/
    const gesturestartEventListener = (event) => {
        event.preventDefault();
        gesture.startX = event.pageX - gesture.posX;
        gesture.startY = event.pageY - gesture.posY;
        gesture.startRotation = gesture.rotation;
        gesture.startScale = gesture.scale;
    };
    mapContainer.contentDocument.addEventListener('gesturestart', (event) => console.log('mapContainer event', 'gesturestartEventListener') || gesturestartEventListener(event));

    /**
     * Update gesture position dif from start to identify X-Y panning and rotation.
     **/
    const gesturechangeEventListener = (event) => {
        event.preventDefault();

        gesture.rotation = gesture.startRotation + event.rotation;
        gesture.scale = gesture.startScale * event.scale;

        gesture.posX = event.pageX - gesture.startX;
        gesture.posY = event.pageY - gesture.startY;

        render();
    };
    mapContainer.contentDocument.addEventListener('gesturechange', (event) => console.log('mapContainer event', 'gesturechangeEventListener') || gesturechangeEventListener(event));

    /**
     * Prevent default gesture actions (like page scroll or navigation)
     **/
    const gestureendEventListener = (event) => {
        event.preventDefault();
    };
    mapContainer.contentDocument.addEventListener('gestureend', (event) => console.log('mapContainer event', 'gestureendEventListener') || gestureendEventListener(event));

    /**
     * Identify the polygon under the mouse and highlight it
     **/
    const clickEventListener = (event) => {
        event.preventDefault();

        // Clear current selectedProvinces highlight and then clear the list
        while (selectedProvinces.length) {
            const id = selectedProvinces.pop();
            let color = getBaseColor(id, 'none');
            map.querySelectorAll(`${id} polygon`)
                .forEach((polygon) => polygon.attributes.fill.value = color);
        }

        const mousePoint = {
            x: event.clientX,
            y: event.clientY,
        };

        getSymbolsAtPoint(allProvinces, mousePoint)
            .forEach((symbol) => {
                const id = symbol.href.animVal;
                selectedProvinces.push(id);
                const index = hoveredProvinces.findIndex((hoveredId) => hoveredId === id);
                if (index !== -1) {
                    // Prevent hover from updating color again
                    hoveredProvinces.splice(index);
                }
                map.querySelectorAll(`${id} polygon`)
                    .forEach((polygon) => {
                        let color = getBaseColor(id);
                        polygon.attributes.fill.value = shadeColor(color, 0.75);
                    });
            });
    };
    mapContainer.contentDocument.addEventListener('mousedown', (event) => console.log('mapContainer event', 'clickEventListener') || clickEventListener(event));

    const mousemoveEventListener = (event) => {
        event.preventDefault();

       // Clear current hoveredProvinces highlight and then clear the list
        while (hoveredProvinces.length) {
            const id = hoveredProvinces.pop();
            let color = getBaseColor(id, 'none');
            map.querySelectorAll(`${id} polygon`)
                .forEach((polygon) => polygon.attributes.fill.value = color);
        }

        const mousePoint = {
            x: event.clientX,
            y: event.clientY,
        };

        getSymbolsAtPoint(allProvinces, mousePoint)
            .forEach((symbol) => {
                const id = symbol.href.animVal;
                if (!selectedProvinces.some((selectedId) => selectedId === id)) {
                    hoveredProvinces.push(id);
                    map.querySelectorAll(`${id} polygon`)
                        .forEach((polygon) => {
                            let color = getBaseColor(id);
                            polygon.attributes.fill.value = shadeColor(color, 0.25);
                        });
                }
            });
    };
    mapContainer.contentDocument.addEventListener('mousemove', (event) => console.log('mapContainer event', 'mousemoveEventListener') || mousemoveEventListener(event));
};
