var fs = require('fs')
var path = require('path')

module.exports = {
  /**
   * 读取文件内容
   * @param file 文件路径
   */
  read: function(file) {
    file = path.resolve(file);

    fs.readFile(file, 'utf-8', function(err, data) {
      if (err) {

      } else {

      }
    })
  }
}
