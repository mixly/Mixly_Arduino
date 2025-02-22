/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Download screenshot.
 */
'use strict';
goog.require('Blockly');
goog.provide('Blockly.Screenshot');

/**
 * Convert an SVG datauri into a PNG datauri.
 * @param {string} data SVG datauri.
 * @param {number} width Image width.
 * @param {number} height Image height.
 * @param {!Function} callback Callback.
 */
Blockly.Screenshot.svgToPng_ = function (data, width, height, callback) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const img = new Image();
    const maxSize = Math.max(width, height);
    const pixelDensity = Math.max(Math.min(10, 15000 / maxSize), window.devicePixelRatio || 1);
    canvas.width = width * pixelDensity;
    canvas.height = height * pixelDensity;
    img.onload = function () {
        context.drawImage(
            img,
            0,
            0,
            width,
            height,
            0,
            0,
            canvas.width,
            canvas.height
        );
        try {
            const dataUri = canvas.toDataURL('image/png');
            callback(dataUri);
        } catch (err) {
            console.warn('Error converting the workspace svg to a png');
            callback('');
        }
    };
    img.src = data;
}

Blockly.Screenshot.getBase64Image_ = function(image) {
    return new Promise(resolve => {
        const img = new Image();
        img.crossOrigin = '';
        const href = image.getAttribute('xlink:href');
        if (!href) {
            resolve();
        }
        img.src = href;
        img.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx?.drawImage(img, 0, 0, img.width, img.height);
            const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
            const dataURL = canvas.toDataURL('image/' + ext);
            image.setAttribute('xlink:href', dataURL);
            resolve();
        }
    });
}

/**
 * Create an SVG of the blocks on the workspace.
 * @param {!Blockly.WorkspaceSvg} workspace The workspace.
 * @param {!Function} callback Callback.
 * @param {string=} customCss Custom CSS to append to the SVG.
 */
Blockly.Screenshot.workspaceToSvg_ = function (workspace, callback, customCss) {
    // Go through all text areas and set their value.
    const textAreas = document.getElementsByTagName('textarea');
    for (let i = 0; i < textAreas.length; i++) {
        textAreas[i].innerHTML = textAreas[i].value;
    }

    const bBox = workspace.getBlocksBoundingBox();
    const x = bBox.x || bBox.left;
    const y = bBox.y || bBox.top;
    const width = bBox.width || bBox.right - x;
    const height = bBox.height || bBox.bottom - y;

    const blockCanvas = workspace.getCanvas();
    const clone = blockCanvas.cloneNode(true);
    clone.removeAttribute('transform');
    const $images = $(clone).find('image');
    let resolveList = [];
    for (let i = 0; i < $images.length; i++) {
        resolveList.push(this.getBase64Image_($images[i]));
    }

    Promise.all(resolveList)
    .then(() => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.appendChild(clone);
        svg.setAttribute('viewBox', x + ' ' + y + ' ' + width + ' ' + height);

        svg.setAttribute(
            'class',
            'blocklySvg ' +
            (workspace.options.renderer || 'geras') +
            '-renderer ' +
            (workspace.getTheme ? workspace.getTheme().name + '-theme' : '')
        );
        svg.setAttribute('width', width);
        svg.setAttribute('height', height);
        svg.setAttribute('style', 'background-color: transparent');

        const css = [].slice
            .call(document.head.querySelectorAll('style'))
            .filter(
                (el) =>
                    /\.blocklySvg/.test(el.innerText) || el.id.indexOf('blockly-') === 0
            )
            .map((el) => el.innerText)
            .join('\n');
        const style = document.createElement('style');
        style.innerHTML = css + '\n' + customCss;
        svg.insertBefore(style, svg.firstChild);

        let svgAsXML = new XMLSerializer().serializeToString(svg);
        svgAsXML = svgAsXML.replace(/&nbsp/g, '&#160');
        const data = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);

        Blockly.Screenshot.svgToPng_(data, width, height, callback);
    });
}

/* eslint-disable no-unused-vars */
/**
 * Download a screenshot of the blocks on a Blockly workspace.
 * @param {!Blockly.WorkspaceSvg} workspace The Blockly workspace.
 */
Blockly.Screenshot.downloadScreenshot = function (workspace) {
    Blockly.Screenshot.workspaceToSvg_(workspace, function (datauri) {
        const a = document.createElement('a');
        a.download = 'screenshot.png';
        a.target = '_self';
        a.href = datauri;
        document.body.appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    });
}
/* eslint-enable */