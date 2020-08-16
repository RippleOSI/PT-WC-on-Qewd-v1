
export function load() {

    let componentName = 'ptwq-summary-element';

    class ptwq_summary_element extends HTMLElement {
        constructor() {
            super();

            const html = `
<div class="row">
    <div class="ptwq-summary-element"></div>

   
</div>
      `;

            this.html = `${html}`;
        }

        setState(state) {
            if (state.name) {
                this.name = state.name;
            }
            if (state.cls) {
                let _this = this;
                state.cls.split(' ').forEach(function(cls) {
                    _this.rootElement.classList.add(cls);
                });
            }
        }

        onLoaded() {
            this.readyEvent = new Event('SReady');
            let _this = this;
            let prefix = '';
            if (this.context.ptwqResourcePath) prefix = this.context.ptwqResourcePath;

            if (this.context.paths && this.context.paths.ptwq) {
                prefix = this.context.paths.ptwq;
                if (prefix[0] === '.') prefix = prefix.slice(1);
            }
            if (prefix !== '' && prefix.slice(-1) !== '/') prefix = prefix + '/';

        }

        onReady(fn) {
            document.addEventListener('SReady', fn);
            this.removeOnReady = function() {
                document.removeEventListener('SReady', fn);
            }
        }

        isReady() {
            if (this.readyEvent) {
                document.dispatchEvent(this.readyEvent);
            }
            this.ready = true;
        }

        connectedCallback() {
            this.innerHTML = this.html;
            this.rootElement = this.getElementsByTagName('div')[0];


            this.childrenTarget = this.rootElement;
        }


        render(data){

        }


        disconnectedCallback() {
            console.log('*** custom breakcumps component was removed!');
            if (this.onUnload) this.onUnload();
        }
    }

    customElements.define(componentName, ptwq_jitsu);

}
