const path = require('path');
const fs = require('fs');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 递归删除
function rmdir(dirname, callback) {
  // 判断当前文件状态
  fs.stat(dirname, (err, statObj) => {
    if (err) {
      return console.log(err);
    }
    // 判断传入名称判断是否是一个文件夹
    if (statObj.isDirectory()) {
      // 如果是，读取文件夹，返回父级下的子节点
      fs.readdir(dirname, (err, dirs) => {
        // 如果子节点为空 则直接删除文件夹 并触发回调
        if (dirs.length === 0) {
          return fs.rmdir(dirname, callback);
        }
        // 拿到子节点文件名与 父节点拼接成路径
        dirs = dirs.map(d => path.join(dirname, d));

        let index = 0;
        let done = () => { // 成功后调用一下done方法，进行计数，子目录都删除成功后 ，删除自己即可
          index++;
          if (index == dirs.length) {
            fs.rmdir(dirname, callback);
          }
        }
        dirs.forEach(dir => {
          setTimeout(() => {
            rmdir(dir, done)
          }, 2000); // 2000毫秒延时为了看清步骤
        })
      })
    } else {
      // 如果不是文件夹则是文件，异步删除文件
      fs.unlink(dirname, callback)
    }
  })
}

// 处理copy逻辑
function handleCopy(src, dst, excludeNameList) {
  // 读取目录中的所有文件/目录
  fs.readdir(src, function (err, paths) {
    if (err) {
      throw err;
    }

    paths.forEach(function (path) {
      if (!excludeNameList.includes(path)) {
        var _src = src + '/' + path,
          _dst = dst + '/' + path,
          readable, writable;

        fs.stat(_src, function (err, st) {
          if (err) {
            throw err;
          }

          // 判断是否为文件
          if (st.isFile()) {
            // 创建读取流
            readable = fs.createReadStream(_src);
            // 创建写入流
            writable = fs.createWriteStream(_dst);
            // 通过管道来传输流
            readable.pipe(writable);
          }
          // 如果是目录则递归调用自身
          else if (st.isDirectory()) {
            exists(_src, _dst, copy);
          }
        });
      }
    });
  });
};

// 处理dist文件夹
function handleDist(dst, callback) {
  fs.exists(dst, function (exists) {
    // 已存在先递归删除掉
    if (exists) {
      rmdir(dst, function () {
        callback();
      })
    } else {
      callback();
    }
  });
};


function copy(src, dst, excludeNameList) {
  // 处理dist，有则先删除
  handleDist(dst, function () {
    fs.mkdir(dst, function () {
      handleCopy(src, dst, excludeNameList);
    });
  });
}

// 开始copydist，排除echarts.js
copy('src', 'dist', ['echarts.js'])

// 压缩一下echarts
module.exports = {
  entry: {
    echarts: './src/echarts.js',
  },                                          // 配置入口文件的地址
  output: {
    path: path.resolve(__dirname, 'dist'),    // 配置出口文件的目录
    filename: '[name].min.js'                     // 配置出口文件的名称
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      })
    ]
  }
}

