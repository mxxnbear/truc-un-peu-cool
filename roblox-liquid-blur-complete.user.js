// ==UserScript==
// @name         Roblox Liquid Blur Theme - Complete
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Complete Roblox Liquid Blur theme with SVG filters injection
// @author       You
// @match        https://*.roblox.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';

    // ===== INJECT SVG FILTERS =====
    function injectLiquidFilters() {
        // Vérifier si déjà injecté
        if (document.getElementById('liquid-blur-svg-filters')) {
            console.log('✓ Liquid Blur filters already injected');
            return;
        }

        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('id', 'liquid-blur-svg-filters');
        svg.setAttribute('style', 'position: absolute; width: 0; height: 0; pointer-events: none;');
        svg.setAttribute('aria-hidden', 'true');

        const defs = document.createElementNS(svgNS, 'defs');

        // FILTRE PRINCIPAL
        const filter = document.createElementNS(svgNS, 'filter');
        filter.setAttribute('id', 'liquid-distortion');
        filter.setAttribute('x', '-50%');
        filter.setAttribute('y', '-50%');
        filter.setAttribute('width', '200%');
        filter.setAttribute('height', '200%');

        const turbulence = document.createElementNS(svgNS, 'feTurbulence');
        turbulence.setAttribute('type', 'fractalNoise');
        turbulence.setAttribute('baseFrequency', '0.01 0.02');
        turbulence.setAttribute('numOctaves', '3');
        turbulence.setAttribute('seed', '2');
        turbulence.setAttribute('result', 'turbulence');

        const animate = document.createElementNS(svgNS, 'animate');
        animate.setAttribute('attributeName', 'baseFrequency');
        animate.setAttribute('dur', '20s');
        animate.setAttribute('values', '0.01 0.02;0.015 0.025;0.02 0.01;0.015 0.025;0.01 0.02');
        animate.setAttribute('repeatCount', 'indefinite');
        animate.setAttribute('calcMode', 'spline');
        animate.setAttribute('keySplines', '0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1');
        turbulence.appendChild(animate);

        const displacementMap = document.createElementNS(svgNS, 'feDisplacementMap');
        displacementMap.setAttribute('in', 'SourceGraphic');
        displacementMap.setAttribute('in2', 'turbulence');
        displacementMap.setAttribute('scale', '3');
        displacementMap.setAttribute('xChannelSelector', 'R');
        displacementMap.setAttribute('yChannelSelector', 'G');
        displacementMap.setAttribute('result', 'displaced');

        const gaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur');
        gaussianBlur.setAttribute('in', 'displaced');
        gaussianBlur.setAttribute('stdDeviation', '1');
        gaussianBlur.setAttribute('result', 'blurred');

        const colorMatrix = document.createElementNS(svgNS, 'feColorMatrix');
        colorMatrix.setAttribute('in', 'blurred');
        colorMatrix.setAttribute('type', 'saturate');
        colorMatrix.setAttribute('values', '1.2');
        colorMatrix.setAttribute('result', 'saturated');

        const componentTransfer = document.createElementNS(svgNS, 'feComponentTransfer');
        componentTransfer.setAttribute('in', 'saturated');
        componentTransfer.setAttribute('result', 'adjusted');

        const funcR = document.createElementNS(svgNS, 'feFuncR');
        funcR.setAttribute('type', 'linear');
        funcR.setAttribute('slope', '1.05');
        funcR.setAttribute('intercept', '0.02');

        const funcG = document.createElementNS(svgNS, 'feFuncG');
        funcG.setAttribute('type', 'linear');
        funcG.setAttribute('slope', '1.05');
        funcG.setAttribute('intercept', '0.02');

        const funcB = document.createElementNS(svgNS, 'feFuncB');
        funcB.setAttribute('type', 'linear');
        funcB.setAttribute('slope', '1.05');
        funcB.setAttribute('intercept', '0.02');

        componentTransfer.appendChild(funcR);
        componentTransfer.appendChild(funcG);
        componentTransfer.appendChild(funcB);

        filter.appendChild(turbulence);
        filter.appendChild(displacementMap);
        filter.appendChild(gaussianBlur);
        filter.appendChild(colorMatrix);
        filter.appendChild(componentTransfer);

        // FILTRE HOVER
        const filterHover = document.createElementNS(svgNS, 'filter');
        filterHover.setAttribute('id', 'liquid-distortion-hover');
        filterHover.setAttribute('x', '-50%');
        filterHover.setAttribute('y', '-50%');
        filterHover.setAttribute('width', '200%');
        filterHover.setAttribute('height', '200%');

        const turbulenceHover = document.createElementNS(svgNS, 'feTurbulence');
        turbulenceHover.setAttribute('type', 'fractalNoise');
        turbulenceHover.setAttribute('baseFrequency', '0.015 0.025');
        turbulenceHover.setAttribute('numOctaves', '2');
        turbulenceHover.setAttribute('result', 'turbulence');

        const animateHover = document.createElementNS(svgNS, 'animate');
        animateHover.setAttribute('attributeName', 'baseFrequency');
        animateHover.setAttribute('dur', '15s');
        animateHover.setAttribute('values', '0.015 0.025;0.025 0.015;0.015 0.025');
        animateHover.setAttribute('repeatCount', 'indefinite');
        turbulenceHover.appendChild(animateHover);

        const displacementMapHover = document.createElementNS(svgNS, 'feDisplacementMap');
        displacementMapHover.setAttribute('in', 'SourceGraphic');
        displacementMapHover.setAttribute('in2', 'turbulence');
        displacementMapHover.setAttribute('scale', '5');
        displacementMapHover.setAttribute('xChannelSelector', 'R');
        displacementMapHover.setAttribute('yChannelSelector', 'G');

        const gaussianBlurHover = document.createElementNS(svgNS, 'feGaussianBlur');
        gaussianBlurHover.setAttribute('stdDeviation', '1.5');

        filterHover.appendChild(turbulenceHover);
        filterHover.appendChild(displacementMapHover);
        filterHover.appendChild(gaussianBlurHover);

        defs.appendChild(filter);
        defs.appendChild(filterHover);
        svg.appendChild(defs);

        // Injecter dans le body
        if (document.body) {
            document.body.insertBefore(svg, document.body.firstChild);
            console.log('🌊 Liquid Blur SVG filters injected!');
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                document.body.insertBefore(svg, document.body.firstChild);
                console.log('🌊 Liquid Blur SVG filters injected (DOMContentLoaded)!');
            });
        }
    }

    // Injecter dès que possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectLiquidFilters);
    } else {
        injectLiquidFilters();
    }

    // Réinjecter si la page change (SPA)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(injectLiquidFilters, 500);
        }
    }).observe(document, { subtree: true, childList: true });

    console.log('🎨 Roblox Liquid Blur Theme loaded! Apply your CSS via Stylus.');
})();
