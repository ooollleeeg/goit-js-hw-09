!function(){var t={body:document.querySelector("body"),startButton:document.querySelector("button[data-start]"),stopButton:document.querySelector("button[data-stop]")},o=null;t.startButton.addEventListener("click",(function(){o=setInterval((function(){t.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),t.startButton.disabled=!0,t.stopButton.disabled=!1})),t.stopButton.addEventListener("click",(function(){clearInterval(o),t.startButton.disabled=!1,t.stopButton.disabled=!0})),t.stopButton.disabled=!0}();
//# sourceMappingURL=01-color-switcher.dfc9151f.js.map