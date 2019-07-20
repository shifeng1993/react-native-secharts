const index = () => {
  return `
  <!DOCTYPE html>
    <html>

    <head>
      <title>echarts</title>
      <meta http-equiv="content-type" content="text/html; charset=utf-8">
      <!-- webView ios适配 start -->
      <meta name="viewport" content="initial-scale=1, maximum-scale=3, minimum-scale=1, user-scalable=no">
      <!-- webView ios适配 end -->
      <style type="text/css">
        html,
        body {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
          background-color: rgba(0, 0, 0, 0);
        }

        #main {
          height: 100%;
          background-color: rgba(0, 0, 0, 0);
        }

      </style>
      <script type="text/javascript" src="https://cdn.bootcss.com/echarts/4.2.1/echarts.min.js"></script>
    </head>

    <body>
      <div id="main"></div>
    </body>

  </html>
  `
}

export {
  index
};