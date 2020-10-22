function setupWebViewJavascriptBridge(callback) {
  if (/android/.test(navigator.userAgent.toLowerCase())) {
    // https://github.com/lzyzsd/JsBridge
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge);
    } else {
      document.addEventListener(
        "WebViewJavascriptBridgeReady",
        function () {
          callback(window.WebViewJavascriptBridge);
        },
        false
      );
    }
  } else if (/ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())) {
    // https://github.com/marcuswestin/WebViewJavascriptBridge
    // if (window.WebViewJavascriptBridge) {
    //   return callback(window.WebViewJavascriptBridge);
    // }
    // if (window.WVJBCallbacks) {
    //   return window.WVJBCallbacks.push(callback);
    // }
    // window.WVJBCallbacks = [callback];
    // var WVJBIframe = document.createElement("iframe");
    // WVJBIframe.style.display = "none";
    // WVJBIframe.src = "https://__bridge_loaded__";
    // document.documentElement.appendChild(WVJBIframe);
    // setTimeout(function () {
    //   document.documentElement.removeChild(WVJBIframe);
    // }, 100);

    // https://github.com/Lision/WKWebViewJavascriptBridge
    if (window.WKWebViewJavascriptBridge) {
      return callback(window.WKWebViewJavascriptBridge);
    }
    if (window.WKWVJBCallbacks) {
      return window.WKWVJBCallbacks.push(callback);
    }
    window.WKWVJBCallbacks = [callback];
    window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null);
  }
}
setupWebViewJavascriptBridge(function (bridge) {
  if (/android/.test(navigator.userAgent.toLowerCase())) {
    bridge.init(function (message, responseCallback) {
      // 'JS got a message', message
      var data = {
        "Javascript Responds": "测试中文!",
      };

      if (responseCallback) {
        // 'JS responding with', data
        responseCallback(data);
      }
    });
  }
});

// 监听手机的方法调用
function registerHandler(funName, callback) {
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.registerHandler(funName, function (data, responseCallback) {
      // data 接收的数据，responseCallback 调用回调函数
      callback && callback(data, responseCallback);
    });
  });
}

// 调用手机的方法
function callHandler(funName, dataJson, callback) {
  setupWebViewJavascriptBridge(function (bridge) {
    bridge.callHandler(funName, dataJson, function (response) {
      callback && callback(response);
    });
  });
}

export { registerHandler, callHandler };
