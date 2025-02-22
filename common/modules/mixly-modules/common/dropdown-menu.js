goog.loadJs('common', () => {

goog.require('tippy');
goog.require('Mixly.ContextMenu');
goog.provide('Mixly.DropdownMenu');

const { ContextMenu } = Mixly;


class DropdownMenu extends ContextMenu {
    #contextMenu_ = null;
    #layer_ = null;
    #shown_ = false;
    constructor(selector) {
        super(selector, {
            trigger: 'none',
            position: (opt) => {
                opt.$menu.css({
                    top: 0,
                    left: 0,
                    position: 'relative',
                    margin: 0
                });
            },
            events: {
                show: (opt) => {
                    opt.$menu.detach();
                    $('body > .mixly-drapdown-menu > .tippy-box > .tippy-content').empty().append(opt.$menu);
                    this.#layer_.setProps({});
                    this.#shown_ = true;
                },
                hide: (opt) => {
                    this.#shown_ = false;
                    if (this.#layer_.state.isShown) {
                        this.#layer_.hide();
                    }
                }
            }
        });

        this.#layer_ = tippy($(selector)[0], {
            allowHTML: true,
            content: '',
            trigger: 'click',
            interactive: true,
            maxWidth: 'none',
            offset: [ 0, 0 ],
            appendTo: document.body,
            arrow: false,
            placement: 'bottom-start',
            delay: 0,
            duration: [ 0, 0 ],
            onCreate: (instance) => {
                $(instance.popper).addClass('mixly-drapdown-menu');
            },
            onMount: (instance) => {
                this.show();
            },
            onHide: () => {
                this.#shown_ && this.hide();
            }
        });
    }

    dispose() {
        super.dispose();
        this.#layer_.destroy();
    }
}

Mixly.DropdownMenu = DropdownMenu;

});