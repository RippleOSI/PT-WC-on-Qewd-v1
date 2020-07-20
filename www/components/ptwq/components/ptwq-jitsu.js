
export function load() {

    let componentName = 'ptwq-jitsu';

    class ptwq_jitsu extends HTMLElement {
        constructor() {
            super();

            const html = `
<div class="row">
    <div id="jitsu-meet-window"></div>

   
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
            this.readyEvent = new Event('jitsuReady');
            let _this = this;
            let prefix = '';
            if (this.context.ptwqResourcePath) prefix = this.context.ptwqResourcePath;

            if (this.context.paths && this.context.paths.ptwq) {
                prefix = this.context.paths.ptwq;
                if (prefix[0] === '.') prefix = prefix.slice(1);
            }
            if (prefix !== '' && prefix.slice(-1) !== '/') prefix = prefix + '/';

            this.loadJSFile(prefix + 'js/external_api.js', function() {
                _this.meetJitsu = JitsiMeetExternalAPI;
                _this.isReady();
            });
        }
        renderJitsu(events, callback) {
            let _this = this;
            let fn = function() {

                if (callback) callback.call(_this);
            }
            if (this.ready) {
                fn();
            }
            else {
                this.onReady(fn);
            }
        }

        renderJitsuPromise(jitsuData) {
            let _this = this;
            return new Promise((resolve) => {
                _this.renderJitsu(jitsuData, function() {
                    resolve(_this);
                });
            });
        }
        async renderJitsuMeet(jitsuData) {
            return await this.renderJitsuPromise(jitsuData);
        }


        onReady(fn) {
            document.addEventListener('jitsuReady', fn);
            this.removeOnReady = function() {
                document.removeEventListener('jitsuReady', fn);
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

            this.configureButton = this.querySelector('#jitsu-meet-configure');
            this.loginButton = this.querySelector('#jitsu-meet-start');
            this.windowBlock = this.querySelector('#jitsu-meet-window');

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
