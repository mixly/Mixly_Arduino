import STATUS_BAR_IMAGE_TEMPLATE from '../templates/html/statusbar-image.html';
import {
    PageBase,
    HTMLTemplate,
    StatusBarsManager,
    Workspace
} from 'mixly';
import $ from 'jquery';

class StatusBarImage extends PageBase {
    static {
        HTMLTemplate.add(
            'html/statusbar/statusbar-image.html',
            new HTMLTemplate(STATUS_BAR_IMAGE_TEMPLATE)
        );

        this.init = function () {
            StatusBarsManager.typesRegistry.register(['images'], StatusBarImage);
            const mainWorkspace = Workspace.getMain();
            const statusBarsManager = mainWorkspace.getStatusBarsManager();
            statusBarsManager.add('images', 'images', '图像');
            statusBarsManager.changeTo('output');
        }
    }

    constructor() {
        super();
        const $content = $(HTMLTemplate.get('html/statusbar/statusbar-image.html').render());
        this.setContent($content);
    }

    init() {
        super.init();
        this.hideCloseBtn();
    }

    clean() {
        this.getContent().empty();
    }

    display(data) {
        const $content = this.getContent();
        const autoFit = function (node) {
            node.style.width = 'auto';
            node.style.height = 'auto';
            node.style.maxWidth = '100%';
            node.style.maxHeight = '100%';
        };
        this.clean();
        let root = data.content;
        let canvas = null;
        let iframe = null;
        switch (data.display_type) {
        case 'p5':
            root.style.width = '100%';
            root.style.height = '100%';
            root.style.display = 'flex';
            root.style.justifyContent = 'center';
            root.style.alignItems = 'center';

            // some canvas nodes can be added later so we observe...
            new MutationObserver(function (mutationsList) {
                mutationsList.forEach((mutation) =>
                    mutation.addedNodes.forEach((node) => {
                        const elem = node;
                        if (
                            elem.tagName != null &&
                                ['canvas', 'video'].includes(elem.tagName.toLowerCase())
                        )
                            autoFit(elem);
                    })
                );
            }).observe(root, { childList: true });

            root.querySelectorAll('canvas,video').forEach(autoFit);
            $content.append(root);
            break;
        case 'matplotlib':
            canvas = root.querySelector('canvas');
            if (canvas) root = canvas;
            root.style.width = '';
            root.style.height = '';
            root.style.maxWidth = '100%';
            root.style.maxHeight = '100%';
            $content.append(root);
            break;
        case 'ocaml-canvas':
            root.style.width = '';
            root.style.height = '';
            root.style.maxWidth = '100%';
            root.style.maxHeight = '100%';
            $content.append(root);
            break;
        case 'turtle':
            // Turtle result
            root.setAttribute('width', '100%');
            root.setAttribute('height', '100%');
            $content.append(root.outerHTML);
            break;
        case 'sympy':
            $content.append(data.content);
            if (typeof window.MathJax === 'undefined') {
                // dynamically loading MathJax
                console.log('Loading MathJax (Sympy expression needs it).');
                (function () {
                    let script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.src =
                            'https://cdn.jsdelivr.net/npm/mathjax@3.0.5/es5/tex-mml-chtml.js';
                    document.getElementsByTagName('head')[0].appendChild(script);
                })();
            } else {
                // otherwise, render it
                window.MathJax.typeset();
            }
            break;
        case 'multiple':
            /* typically dispached by display() */
            for (let mime of [
                'image/svg+xml',
                'image/png',
                'text/html',
                'text/plain',
            ]) {
                if (mime in data.content) {
                    let content = data.content[mime];
                    if (mime === 'image/png') {
                        content =
                                '<img src="data:image/png;base64,' +
                                content +
                                '" style="max-width: 100%; max-height: 100%;">';
                    }
                    $content.append(content);
                    break;
                }
            }
            break;
        case 'tutor':
            // hacky but iframe.document.body.style require to wait for
            // iframe loading
            $content.append($(data.content.replace('overflow-y%3A%20hidden%3B', '')));
            iframe = this.getContent()[0].getElementsByTagName('iframe')[0];
            if (iframe == null) return;
            // trick to avoid taking height update into account
            iframe.style.maxHeight = iframe.style.minHeight = '100%';

            // force rendering when visible,
            // otherwise, strange things happends
            // since PythonTutor check for visibility at some point
            new IntersectionObserver((entries, observer) => {
                const entry = entries[0];
                if (entry && !entry.isIntersecting) return;
                iframe.contentWindow?.postMessage({ type: 'redraw' }, '*');
                observer.disconnect();
            }).observe(iframe);

            break;
        default:
            console.error(
                `Not supported node type '${data.display_type}' in eval.display result processing.`
            );
        }
    }
}

export default StatusBarImage;