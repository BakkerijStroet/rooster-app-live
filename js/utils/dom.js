(function attachDomUtils(global) {
  const domUtils = {
    setClassName(element, value) {
      if (!element) {
        return;
      }

      element.className = value;
    }
  };

  global.StroetDomUtils = Object.freeze(domUtils);
})(window);
