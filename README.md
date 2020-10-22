# React-JsBridge
React jsBridge used on Android &amp; iOS

# React use
```javascript
import { callHandler, registerHandler } from "./jsbridge";

class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    registerHandler("callJavaScriptMethod", (data, responseCallback) => {
      console.log("from native to js " + data);
      this.setState({
        ipvalue: data,
      });
      responseCallback("js callback to java");
    });
  }
  onClick = () => {
    callHandler("callNativeMethod", "hello", function (resp) {
      console.log("from js to native " + resp);
    });
  };
  render() {
    return (
      <div className="app">
        <p>来自手机输入【 {this.state.value} 】</p>
        <Button onClick={this.onClick}>调用手机端的方法</Button>
      </div>
    );
  }
}

export default TestComponent;
```

# Android use
https://github.com/lzyzsd/JsBridge

# iOS use
https://github.com/Lision/WKWebViewJavascriptBridge
