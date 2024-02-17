import React from 'react'
import { WebView } from 'react-native-webview-alternative';
function Upload() {
  return (
    <WebView
	source={{ html: '<h1>Hello World</h1>' }}
	style={{ width: 300, height: 300 }}
/>
  )
}

export default Upload
