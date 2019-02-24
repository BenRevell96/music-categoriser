const os = require('os')

const fileTypes = ['.mp3', '.m4a', '.flac']
const folderPath = process.argv[2] || `${os.homedir()}/Music/`

module.exports = {
  fileTypes,
  folderPath
}
