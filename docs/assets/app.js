(function(){'use strict';var Ce=Object.defineProperty,Ee=Object.defineProperties;var fe=Object.getOwnPropertyDescriptors;var y=Object.getOwnPropertySymbols;var X=Object.prototype.hasOwnProperty,Z=Object.prototype.propertyIsEnumerable;var T=(n,e,t)=>e in n?Ce(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,h=(n,e)=>{for(var t in e||(e={}))X.call(e,t)&&T(n,t,e[t]);if(y)for(var t of y(e))Z.call(e,t)&&T(n,t,e[t]);return n},E=(n,e)=>Ee(n,fe(e));var D=(n,e)=>{var t={};for(var r in n)X.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&y)for(var r of y(n))e.indexOf(r)<0&&Z.call(n,r)&&(t[r]=n[r]);return t};var d=(n,e)=>()=>(n&&(e=n(n=0)),e);var ge=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports);var m=(n,e,t)=>T(n,typeof e!="symbol"?e+"":e,t);var p=(n,e,t)=>new Promise((r,s)=>{var o=i=>{try{c(t.next(i));}catch(u){s(u);}},a=i=>{try{c(t.throw(i));}catch(u){s(u);}},c=i=>i.done?r(i.value):Promise.resolve(i.value).then(o,a);c((t=t.apply(n,e)).next());});var S,f,N,M,L,Y=d(()=>{S=class S extends HTMLElement{constructor({href:e,classname:t}={}){super();let r=this.attachShadow({mode:"open"});r.adoptedStyleSheets=[S.styles];let s=this.createAnchorElement(e,t),o=this.createSlotElement();s.appendChild(o),r.appendChild(s);}createAnchorElement(e,t){let r=document.createElement("a");return r.setAttribute("class",["icon",...t||this.classList].join(" ")),r.setAttribute("href",e||this.getAttribute("href")||"#"),r}createSlotElement(){return document.createElement("slot")}createSvgElement({viewBox:e,children:t=[]}){let r=document.createElementNS("http://www.w3.org/2000/svg","svg");r.setAttribute("viewBox",e),r.setAttribute("width","1em"),r.setAttribute("height","1em");for(let s of t)r.appendChild(this.createSvgChildElement(s));return r}createSvgChildElement(r){var s=r,{tag:e}=s,t=D(s,["tag"]);let o=document.createElementNS("http://www.w3.org/2000/svg",e);t.fill||(t.fill="currentColor");for(let a in t)o.setAttribute(a,t[a]);return o}};m(S,"styles",new CSSStyleSheet),S.styles.replaceSync(`
            :host {
                display: inline-flex;
                font-size: var(--navbar-icon-font-size, 1rem);
                color: var(--anchor-link-color, currentColor);
                text-decoration: none;
                outline: none;
                cursor: pointer;
            }
            :host(:hover) {
                color: var(--anchor-link-hover-color, currentColor);
            }
            a {
                display: inline-flex;
                align-items: center;
                flex-direction: row;
                color: inherit;
                text-decoration: none;
                outline: none;
                transition: var(--transition-duration) var(--transition-bezier);
            }
            .icon { font-size: var(--navbar-icon-font-size); }
            .icon.icon-npm:hover { color: #cd3f45; }
            .icon.icon-github:hover { color: #000; }
            .icon.icon-switch { font-size: 2rem; }
            .icon.icon-switch:hover { color: #6600eb; }
            .user-selected-none {
                user-select: none;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
            }
        `);f=S,N=class extends f{constructor(){super({classname:["icon-github"]}),this.appendChild(this.createSvgElement({viewBox:"0 0 24 24",children:[{tag:"path",d:"M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"}]}));}},M=class extends f{constructor(){super({classname:["icon-npm"]}),this.appendChild(this.createSvgElement({viewBox:"0 0 27.23 27.23",children:[{tag:"rect",width:"27.23",height:"27.23",rx:"2"},{tag:"polygon",fill:"#fff",points:"5.8 21.75 13.66 21.75 13.67 9.98 17.59 9.98 17.58 21.76 21.51 21.76 21.52 6.06 5.82 6.04 5.8 21.75"}]}));}},L=class extends f{constructor(){super({classname:["icon-switch"]}),this.appendChild(this.createSvgElement({viewBox:"0 0 1024 1024",children:[{tag:"path",d:"M677.888 335.872l-176.128 0c-2.048 0-2.048 0-2.048-2.048 0-2.048 0-2.048 0-2.048l43.008-43.008c8.192-8.192 8.192-20.48 0-28.672-8.192-8.192-20.48-8.192-28.672 0l-81.92 81.92c-6.144 6.144-8.192 14.336-4.096 22.528 4.096 8.192 10.24 12.288 18.432 12.288l233.472 0c57.344 0 106.496 47.104 108.544 102.4 2.048 53.248-36.864 100.352-90.112 108.544-10.24 2.048-18.432 10.24-18.432 20.48 0 6.144 2.048 12.288 8.192 16.384 4.096 4.096 8.192 4.096 14.336 4.096 0 0 2.048 0 2.048 0 73.728-10.24 126.976-75.776 124.928-149.504C827.392 401.408 759.808 335.872 677.888 335.872z"},{tag:"path",d:"M598.016 598.016 364.544 598.016c-57.344 0-106.496-47.104-108.544-102.4-2.048-53.248 36.864-100.352 90.112-108.544 10.24-2.048 18.432-10.24 18.432-20.48 0-6.144-2.048-12.288-8.192-16.384-4.096-4.096-10.24-6.144-16.384-4.096-73.728 10.24-126.976 75.776-124.928 149.504 2.048 79.872 69.632 143.36 149.504 143.36l176.128 0c2.048 0 2.048 0 2.048 2.048 0 2.048 0 2.048 0 2.048l-43.008 43.008c-4.096 4.096-6.144 8.192-6.144 14.336 0 6.144 2.048 10.24 6.144 14.336 4.096 4.096 10.24 6.144 14.336 6.144 6.144 0 10.24-2.048 14.336-6.144l81.92-81.92c6.144-6.144 8.192-14.336 4.096-22.528C614.4 602.112 606.208 598.016 598.016 598.016z"}]}));}};customElements.define("base-icon",f);customElements.define("github-icon",N);customElements.define("npm-icon",M);customElements.define("switch-icon",L);});var A,w,W=d(()=>{A=class A extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"});e.adoptedStyleSheets=[A.styles];let t=this.createContainerElement();if(this.getAttribute("label")){let s=this.createLabelElement();t.appendChild(s);}this.input=this.createInputElement(),t.appendChild(this.input);let r=this.createErrorMessageElement();t.appendChild(r),e.appendChild(t);}connectedCallback(){this.setValue("0.00");}createContainerElement(){let e=document.createElement("div");return e.setAttribute("class","field-input-container"),e}createLabelElement(){let e=document.createElement("label");return e.setAttribute("class","field-input-label"),e.setAttribute("for","input"),e.textContent=this.getAttribute("label")||"Field Label",e}createInputElement(){let e=document.createElement("input");return e.setAttribute("class","field-input-inner"),e.setAttribute("type","text"),e.setAttribute("placeholder",this.getAttribute("placeholder")||"Enter text"),e.addEventListener("input",()=>this.handleInput()),e}createErrorMessageElement(){let e=document.createElement("div");return e.setAttribute("class","error-message"),e.textContent="Please enter Arabic numerals",e}handleInput(){let e=this.validateInput(this.input);this.input.setCustomValidity(e?"":"Please enter a valid input");let t=new CustomEvent("change",{detail:{value:this.input.value},bubbles:!0,composed:!0});this.dispatchEvent(t);}validateInput(e){return !Number.isNaN(Number(e.value))}setValue(e,t=!0){this.input.value=e,t&&this.handleInput(e);}};m(A,"styles",new CSSStyleSheet),A.styles.replaceSync(`
            .field-input-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
                position: relative;
            }

            label {
                font-size: 16px;
                color: #333;
                margin-bottom: 4px;
            }

            input {
                box-sizing: border-box;
                padding: 8.5px 14px;
                font-size: 16px;
                border: 2px solid var(--input-border-color);
                border-radius: 6px;
                width: 100%;
                outline: none;
                transition: var(--transition-duration) var(--transition-bezier);
            }

            input:hover {
                border-color: var(--input-hover-border-color);
            }
            
            input:focus {
                border-color: var(--input-focus-border-color);
            }

            .error-message {
                color: var(--input-invalid-border-color);
                font-size: 12px;
                visibility: hidden;
                position: absolute;
                top: 100%;
            }

            input:invalid {
                border-color: var(--input-invalid-border-color);
            }

            input:invalid + .error-message {
                visibility: visible;
            }
        `);w=A;customElements.define("number-input",w);});var q,J,$,z,O=d(()=>{q="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api",J="v1",$={AD:"EUR",AE:"AED",AF:"AFN",AG:"XCD",AI:"XCD",AL:"ALL",AM:"AMD",AO:"AOA",AR:"ARS",AS:"USD",AT:"EUR",AU:"AUD",AW:"AWG",AX:"EUR",AZ:"AZN",BA:"BAM",BB:"BBD",BD:"BDT",BE:"EUR",BF:"XOF",BG:"BGN",BH:"BHD",BI:"BIF",BJ:"XOF",BL:"EUR",BM:"BMD",BN:"BND",BO:"BOB",BQ:"USD",BR:"BRL",BS:"BSD",BT:"BTN",BV:"NOK",BW:"BWP",BY:"BYN",BZ:"BZD",CA:"CAD",CC:"AUD",CD:"CDF",CF:"XAF",CG:"XAF",CH:"CHF",CI:"XOF",CK:"NZD",CL:"CLP",CM:"XAF",CN:"CNY",CO:"COP",CR:"CRC",CU:"CUP",CV:"CVE",CW:"ANG",CX:"AUD",CY:"EUR",CZ:"CZK",DE:"EUR",DJ:"DJF",DK:"DKK",DM:"XCD",DO:"DOP",DZ:"DZD",EC:"USD",EE:"EUR",EG:"EGP",EH:"MAD",ER:"ERN",ES:"EUR",ET:"ETB",FI:"EUR",FJ:"FJD",FK:"FKP",FM:"USD",FO:"DKK",FR:"EUR",GA:"XAF",GB:"GBP",GD:"XCD",GE:"GEL",GF:"EUR",GG:"GBP",GH:"GHS",GI:"GIP",GL:"DKK",GM:"GMD",GN:"GNF",GP:"EUR",GQ:"XAF",GR:"EUR",GS:"GBP",GT:"GTQ",GU:"USD",GW:"XOF",GY:"GYD",HK:"HKD",HM:"AUD",HN:"HNL",HR:"EUR",HT:"HTG",HU:"HUF",ID:"IDR",IE:"EUR",IL:"ILS",IM:"GBP",IN:"INR",IO:"USD",IQ:"IQD",IR:"IRR",IS:"ISK",IT:"EUR",JE:"GBP",JM:"JMD",JO:"JOD",JP:"JPY",KE:"KES",KG:"KGS",KH:"KHR",KI:"AUD",KM:"KMF",KN:"XCD",KP:"KPW",KR:"KRW",KW:"KWD",KY:"KYD",KZ:"KZT",LA:"LAK",LB:"LBP",LC:"XCD",LI:"CHF",LK:"LKR",LR:"LRD",LS:"LSL",LT:"EUR",LU:"EUR",LV:"EUR",LY:"LYD",MA:"MAD",MC:"EUR",MD:"MDL",ME:"EUR",MF:"EUR",MG:"MGA",MH:"USD",MK:"MKD",ML:"XOF",MM:"MMK",MN:"MNT",MO:"MOP",MP:"USD",MQ:"EUR",MR:"MRO",MS:"XCD",MT:"EUR",MU:"MUR",MV:"MVR",MW:"MWK",MX:"MXN",MY:"MYR",MZ:"MZN",NA:"NAD",NC:"XPF",NE:"XOF",NF:"AUD",NG:"NGN",NI:"NIO",NL:"EUR",NO:"NOK",NP:"NPR",NR:"AUD",NU:"NZD",NZ:"NZD",OM:"OMR",PA:"PAB",PE:"PEN",PF:"XPF",PG:"PGK",PH:"PHP",PK:"PKR",PL:"PLN",PM:"EUR",PN:"NZD",PR:"USD",PS:"ILS",PT:"EUR",PW:"USD",PY:"PYG",QA:"QAR",RE:"EUR",RO:"RON",RS:"RSD",RU:"RUB",RW:"RWF",SA:"SAR",SB:"SBD",SC:"SCR",SD:"SDG",SE:"SEK",SG:"SGD",SH:"SHP",SI:"EUR",SJ:"NOK",SK:"EUR",SL:"SLL",SM:"EUR",SN:"XOF",SO:"SOS",SR:"SRD",ST:"STD",SV:"SVC",SX:"ANG",SY:"SYP",SZ:"SZL",TC:"USD",TD:"XAF",TF:"EUR",TG:"XOF",TH:"THB",TJ:"TJS",TK:"NZD",TL:"USD",TM:"TMT",TN:"TND",TO:"TOP",TR:"TRY",TT:"TTD",TV:"AUD",TW:"TWD",TZ:"TZS",UA:"UAH",UG:"UGX",UM:"USD",US:"USD",UY:"UYU",UZ:"UZS",VA:"EUR",VC:"XCD",VE:"VEF",VG:"USD",VI:"USD",VN:"VND",VU:"VUV",WF:"XPF",WS:"WST",YE:"YER",YT:"EUR",ZA:"ZAR",ZM:"ZMW",ZW:"ZWL"},z={BDS:"BBD",CNT:"TWD",NIS:"ILS",NTD:"TWD",STG:"GBP",RMB:"CNY"};});var g,B,P,G=d(()=>{g=class g{constructor(e={}){m(this,"timeout");m(this,"headers");this.timeout=e.timeout||g.TIMEOUT,this.headers=e.headers||g.REQUEST_HEADER;}_fetch(e){return p(this,null,function*(){var s,o,a,c;let t,r=h({},e);if(!r.signal){let i=new AbortController;r.signal=i.signal,t=setTimeout(()=>i.abort(),this.timeout);}try{let i=yield fetch(e.url,r);if(t&&clearTimeout(t),!i.ok)return this.createResponse((s=i.status)!=null?s:500,(o=i.statusText)!=null?o:"Internal Server Error");let u=i.headers.get("Content-Type"),l=u!=null&&u.includes("application/json")?yield i.json():yield i.text();return this.createResponse((a=i.status)!=null?a:200,(c=i.statusText)!=null?c:"OK",l)}catch(i){throw i instanceof DOMException&&i.name==="AbortError"?new Error("Request timeout or aborted"):i}})}createResponse(e,t,r){return {code:e,message:t,data:r}}};m(g,"TIMEOUT",5e3),m(g,"REQUEST_HEADER");B=g,P=B;});var F,I,k=d(()=>{G();F=class extends P{constructor(e={}){super(e);}get(r){return p(this,arguments,function*(e,t={}){let s=new Request(e,E(h({},t),{method:"GET",headers:h(h({},this.headers),t.headers)}));return this._fetch(s)})}},I=F;});var j=d(()=>{k();G();});var x,H,C,Q=d(()=>{O();j();x=class x extends I{constructor(t={}){let a=t,{baseCurrency:r,minified:s=x.MINIFIED}=a,o=D(a,["baseCurrency","minified"]);super(o);m(this,"options");this.options={baseCurrency:r,minified:s};}getCurrencies(){return p(this,arguments,function*(t="latest",r={}){let s=this.getApiUrl(t,"currencies"),o=yield this.get(s,r);return E(h({},o),{data:this.composeDataList(o.data,"name")})})}getRates(){return p(this,arguments,function*(t=this.options.baseCurrency,r="latest",s={}){var i;let o=this.validCurrencyCode(t).toLowerCase(),a=this.getApiUrl(r,`currencies/${o}`),c=yield this.get(a,s);return E(h({},c),{data:this.composeDataList((i=c.data)==null?void 0:i[o],"rate")})})}getRate(){return p(this,arguments,function*(t=this.options.baseCurrency,r,s="latest",o={}){var b;let a=this.validCurrencyCode(t).toLowerCase(),c=this.getApiUrl(s,`currencies/${a}`),i=yield this.get(c,o),u=(b=i.data)==null?void 0:b[a],l=this.validCurrencyCode(r,"destination").toLowerCase();return E(h({},i),{data:u==null?void 0:u[l]})})}getCode(t){return this.validCurrencyCode(t,"locale")}convert(){return p(this,arguments,function*(t=this.options.baseCurrency,r,s=0,o="latest",a={}){let l=yield this.getRate(t,r,o,a),{data:i}=l,u=D(l,["data"]);return h({data:i?Number(s)*i:void 0},u)})}composeDataList(t,r){return t?Object.entries(t).map(([s,o])=>({code:s,[r]:o})):[]}validCurrencyCode(t,r="base"){var o;if(!t)throw new Error(`Please specify the ${r} currency code.`);return (o=h(h({},$),z)[t.toUpperCase()])!=null?o:t}getApiUrl(t,r){let s=this.formatDate(t),o=`${q}@${s}/${J}`,a=this.options.minified?"min.json":"json";return `${o}/${r}.${a}`}formatDate(t){return t==="latest"||!this.isValidDate(t)?"latest":`${t.getFullYear()}-${this.paddedDate(t.getMonth()+1)}-${this.paddedDate(t.getDate())}`}isValidDate(t){return this.isDate(t)&&!Number.isNaN(t.getTime())}isDate(t){return t instanceof Date||typeof t=="object"&&Object.prototype.toString.call(t)==="[object Date]"}paddedDate(t,r=2,s="0"){return `${t}`.padStart(r,s)}};m(x,"MINIFIED",!0);H=x,C=H;});var _=d(()=>{Q();});var ee=d(()=>{});var te=d(()=>{});var ne=d(()=>{ee();te();});var U=d(()=>{O();_();ne();});function Re(){var n,e;if(!(typeof window=="undefined"||!window.navigator))return (e=(n=window.navigator.language)==null?void 0:n.split("-"))==null?void 0:e[1]}var re,se=d(()=>{re=Re;});function be(n){return `${n.getFullYear()}-${oe(n.getMonth()+1)}-${oe(n.getDate())}`}function oe(n,e=2,t="0"){return `${n}`.padStart(e,t)}var R,K=d(()=>{R=be;});function De(){return p(this,null,function*(){try{let n=new Date,e=localStorage.getItem("currencies");if(e){let{time:o,data:a}=JSON.parse(e);if(R(n)===o)return a}let s=((yield new C().getCurrencies()).data||[]).filter(o=>!!o.code).sort((o,a)=>{let c=(o.name||o.code).split(" ")[0].toLowerCase(),i=(a.name||a.code).split(" ")[0].toLowerCase();return c.localeCompare(i)});return localStorage.setItem("currencies",JSON.stringify({time:R(n),data:s})),s}catch(n){console.error("Error fetching options:",n);}})}var ie,ae=d(()=>{U();K();ie=De;});var v,V,ce=d(()=>{U();se();ae();v=class v extends HTMLElement{constructor(){super();let e=this.attachShadow({mode:"open"});e.adoptedStyleSheets=[v.styles];let t=this.createContainerElement();if(this.getAttribute("label")){let r=this.createLabelElement();t.appendChild(r);}this.select=this.createSelectElement(),t.appendChild(this.select),e.appendChild(t);}connectedCallback(){return p(this,null,function*(){let e=yield ie();for(let r of e){if(!r.code)continue;let s=document.createElement("option");s.value=r.code.toUpperCase(),s.textContent=r.name||r.code.toUpperCase(),this.select.appendChild(s);}let t=this.getAttribute("value");if(t)this.setValue(t);else {let r=new C,s=re(),o=r.getCode(s);o&&this.setValue(o);}})}createContainerElement(){let e=document.createElement("div");return e.setAttribute("class","field-select-container"),e}createLabelElement(){let e=document.createElement("label");return e.setAttribute("class","field-select-label"),e.setAttribute("for","select"),e.textContent=this.getAttribute("label")||"Select Label",e}createSelectElement(){let e=document.createElement("select");return e.setAttribute("class","field-select-inner"),e.setAttribute("name",this.getAttribute("name")||"select-field"),e.addEventListener("change",t=>this.handleChange(t.target.value)),e}handleChange(e){let t=new CustomEvent("change",{detail:{value:e},bubbles:!0,composed:!0});this.dispatchEvent(t);}setValue(e){this.select.value=e,this.handleChange(e);}};m(v,"styles",new CSSStyleSheet),v.styles.replaceSync(`
            .field-select-container {
                display: flex;
                flex-direction: column;
                gap: 8px;
                min-width: 280px;
            }

            label {
                font-size: 16px;
                color: #333;
                margin-bottom: 4px;
            }

            select {
                box-sizing: border-box;
                padding: 8.5px 14px;
                font-size: 16px;
                border: 2px solid var(--input-border-color);
                border-radius: 6px;
                width: 100%;
                outline: none;
            }

            select:hover {
                border-color: var(--input-hover-border-color);
            }
            
            select:focus {
                border-color: var(--input-focus-border-color);
            }

            select:invalid {
                border-color: var(--input-invalid-border-color);
            }
        `);V=v;customElements.define("field-select",V);});function Se(n,e,{leading:t=!1}={}){let r,s,o,a;function c(){return a!==void 0&&(r=n.call(o,...a),s=o=a=void 0),r}function i(...u){return o=this,a=u,t&&s===void 0&&(r=c()),s&&(clearTimeout(s),s=void 0),s=setTimeout(()=>{r=c();},e),r}return i.cancel=()=>{s!==void 0&&clearTimeout(s),s=o=a=void 0;},i.flush=()=>s===void 0?r:c(),i}var le,ue=d(()=>{le=Se;});function Ae(n){return p(this,null,function*(){var e;try{let t=new Date,r=localStorage.getItem(`${n}-rates`);if(r){let{time:c,data:i}=JSON.parse(r);if(R(t)===c)return i}let a=(e=(yield new C().getRates(n)).data)==null?void 0:e.filter(c=>!!c.code);return localStorage.setItem(`${n}-rates`,JSON.stringify({code:n,time:R(t),data:a})),a}catch(t){console.error("Error fetching options:",t);}})}var de,pe=d(()=>{U();K();de=Ae;});var ve=ge(me=>{Y();W();ce();ue();pe();(()=>{let n={baseCurrency:"",destCurrency:"",baseAmount:0,destAmount:0,exchangeRate:1},e=document.querySelector("#base-currency"),t=document.querySelector("#dest-currency"),r=document.querySelector("#base-amount"),s=document.querySelector("#dest-amount"),o=document.querySelector(".form-button"),a=()=>{let l=n.baseAmount*n.exchangeRate;n.destAmount=l,s.setValue(l.toFixed(2),!1);},c=()=>{let l=n.destAmount/n.exchangeRate;n.baseAmount=l,r.setValue(l.toFixed(2),!1);},i=(l=1)=>{n.exchangeRate=l,a();},u=le(()=>p(me,null,function*(){var b;if(!n.baseCurrency||!n.destCurrency)return;let l=yield de(n.baseCurrency);i((b=l.find(he=>he.code===n.destCurrency.toLowerCase()))==null?void 0:b.rate);}),80);e.addEventListener("change",l=>{n.baseCurrency=l.detail.value,u();}),t.addEventListener("change",l=>{n.destCurrency=l.detail.value,u();}),r.addEventListener("change",l=>{n.baseAmount=Number(l.detail.value),a();}),s.addEventListener("change",l=>{n.destAmount=Number(l.detail.value),c();}),o.addEventListener("click",()=>{[n.baseCurrency,n.destCurrency]=[n.destCurrency,n.baseCurrency],e.setValue(n.baseCurrency),t.setValue(n.destCurrency);});})();});var app = ve();return app;})();//# sourceMappingURL=app.js.map
//# sourceMappingURL=app.js.map