
export function load() {

    let componentName = 'ptwq-summary-element';

    class ptwq_summary_element extends HTMLElement {
        constructor() {
            super();

            const html = `
              <div >
        <div class="summary-card-item">
            <div class="card">
                <div class="card-header">
                    <div class="summary-card-item__heading">
                        <div class="icon">
                            <icon class="fa fa-notes-medical">

                            </icon>
                        </div>
                        <div class="text">
                            
                        </div>
                    </div>
                </div>
                <ul class="list-group list-group-flush summary-card-item__items">
                    <li class="list-group-item">No records present</li>
                
                </ul>
            </div>
        </div>
    </div >
      `;

            this.html = `${html}`;
            this.options = {};
        }

        setState(state) {
            this.options = {
                ...this.options,
                ...state
            };
            if (state.name) {
                this.name = state.name;
            }
            if (state.cls) {
                let _this = this;
                state.cls.split(' ').forEach(function(cls) {
                    _this.rootElement.classList.add(cls);
                });
            }

            if(state.icon){
                this.setIcon(state.icon);
            }

            if(state.title){
                this.setTitle(state.title);
            }
            if(state.items){
                this.resetList();
                state.items.forEach((el)=>{
                    this.putListElement(el);
                })
            }
            if(state.page){
                this.pageSelect = function() {
                    console.log('switch to page ' + state.page);
                    var root = document.getElementsByTagName('ptwq-root')[0];
                    root.switchToPage(state.page);
                };
                this.rootElement.addEventListener('click', this.pageSelect);
            }
        }

        setIcon(icon){
            let iE = this.iconElement;
            iE.innerHTML = '';
            let iconEl;

            iconEl = document.createElement('icon');
            iconEl.classList.add('fa');
            iconEl.classList.add('fa-'+icon);
            iE.appendChild(iconEl);
        }
        setTitle(title){
            let tE = this.titleElement;
            tE.textContent = title;
        }

        resetList() {
            let lE = this.listElement;
            lE.innerHTML = '';
            return lE;
        }

        putListElement(content){
            let lE = this.listElement;
            let listElement;
            listElement= document.createElement('li');
            listElement.classList.add('list-group-item');
            listElement.textContent = content;
            lE.appendChild(listElement);
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

            this.iconElement = this.rootElement.querySelector('.icon');
            this.titleElement = this.rootElement.querySelector('.text');
            this.listElement = this.rootElement.querySelector('.summary-card-item__items');

            this.childrenTarget = this.rootElement;
        }



        render(data){

        }


        disconnectedCallback() {
            console.log('*** custom breakcumps component was removed!');
            if (this.onUnload) this.onUnload();
        }
    }

    customElements.define(componentName, ptwq_summary_element);

}
