"use strict";
/* BLAZOR.POLYFILL Version 0.3.1 */
Object.defineProperty(exports, "__esModule", { value: true });
require("whatwg-fetch");
require("../src/template.js");
require("../src/navigator.sendbeacon.js");
(function () {
    function IsIE() {
        if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
            return true;
        }
        return false;
    }
    function blazorPolyfill() {
        // IE11 has somme issue about setter with deep recursion
        // with Symbol polyfill. We need to use the useSimple
        // option from core-js
        if (IsIE()) {
            Symbol.useSimple();
        }
        //Adding document.baseURI for IE and maybe other browser that would not have it
        if (document.baseURI == null || document.baseURI == undefined) {
            try {
                document.baseURI = document.getElementsByTagName("base")[0].href;
            }
            catch (e) {
                //This should not happen as <base> tag must be present at page loading
                var port = "";
                if (window.location.port != undefined && window.location.port != null && window.location.port != "")
                    port = ":" + location.port;
                var path = window.location.pathname;
                if (path === undefined || path === null || path === "") {
                    path = "/";
                }
                document.baseURI = window.location.protocol + "//" + window.location.hostname + port + "/";
            }
        }
        if (IsIE()) {
            //IE doesn't auto start blazor.server.js. Forcing it after Blazor loaded in the DOM
            forceBlazorLoadOnIE(0);
        }
    }
    function BlazorObjectIsFound() {
        try {
            if (Blazor !== undefined && Blazor !== null && Blazor.start !== undefined && Blazor.start !== null) {
                return true;
            }
        }
        catch (e) {
        }
        return false;
    }
    function forceBlazorLoadOnIE(counter) {
        if (BlazorObjectIsFound()) {
            Blazor.start();
        }
        else if (counter <= 200) {
            window.setTimeout(function () {
                forceBlazorLoadOnIE(++counter);
            }, 50);
        }
    }
    blazorPolyfill();
})();
//# sourceMappingURL=Boot.js.map