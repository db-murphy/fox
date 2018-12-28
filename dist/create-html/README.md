## Installation

```sh
npm install configdata-to-html
```

## API

```js
var dom = new CreateHtml(JSON.parse(jsonString), width);

$('#id').append(dom.init());

参数说明:
width: 解析宽度
jsonString: 后台返回的json字符串
```