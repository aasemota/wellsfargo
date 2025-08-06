(function() {
  var qualtricsSrc = "https://znxxxxxxxxxxxxxxx-wellsfargocxsandbox.siteintercept.qualtrics.com/SIE/?Q_ZID=ZN_XXXXXXXXXXXXXXX";
  var script;
  var interceptLoaded = false;

  function loadIntercept() {
    if (interceptLoaded) return; // prevent double-loading

    // Initialize QSI config
    window.QSI = window.QSI || {};
    window.QSI.config = window.QSI.config || {};
    window.QSI.global = window.QSI.global || {};

    window.QSI.config.enableSecureVariables = true;
    window.QSI.global.enableJSSanitization = true;

    // Create script element to load intercept
    script = document.createElement("script");
    script.type = "text/javascript";
    script.src = qualtricsSrc;

    if (document.body) {
      document.body.appendChild(script);
    } else {
      window.addEventListener("load", function() {
        document.body.appendChild(script);
      });
    }

    interceptLoaded = true;
    console.log("Qualtrics intercept loaded");
  }

  function unloadIntercept() {
    if (!interceptLoaded) return;

    if (window.QSI && window.QSI.API && typeof QSI.API.unload === "function") {
      QSI.API.unload();
      console.log("Qualtrics intercept unloaded");
    }

    interceptLoaded = false;

    // Optional: remove the script tag to fully clean up
    if (script && script.parentNode) {
      script.parentNode.removeChild(script);
      script = null;
    }
  }

  function isHome() {
    var titleHasHome = document.title && document.title.toLowerCase().includes("home");
    var el = document.querySelector("#page-title");
    var elementHasHome = el && el.textContent.trim().toLowerCase() === "home";
    // Adjust to your needs: Use either title or element or both
    return titleHasHome || elementHasHome;
  }

  function evaluateIntercept() {
    if (isHome()) {
      loadIntercept();
    } else {
      unloadIntercept();
    }
  }

  // Initial check
  evaluateIntercept();

  // Monitor DOM changes (for SPA dynamic content)
  var observer = new MutationObserver(evaluateIntercept);
  observer.observe(document.body, { childList: true, subtree: true });
})();