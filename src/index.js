const os = require('os')

const { createAudioFileList, readAudioFile } = require('./helpers.js')

const folderPath = process.argv[2] || `${os.homedir()}/Music/`

const eligibleFiles = async () => {
  const files = await createAudioFileList(folderPath)

  for (i = 0; i < files.length; i++) {
    readAudioFile(folderPath, files[i])
  }
}

eligibleFiles()
