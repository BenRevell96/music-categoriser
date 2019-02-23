const os = require('os')
const { createAudioFileList } = require('./helpers.js')
const ffmetadata = require('ffmetadata')

const folderPath = process.argv[2] || `${os.homedir()}/Music/`

const eligibleFiles = () => {
  const files = createAudioFileList(folderPath)
  for (i = 0; i < files.length; i++) {
    const filePath = `${folderPath}/${files[i]}`.toString()

    ffmetadata.read(filePath, (err, data) => {
      console.log(`${folderPath}/${files[i]}`)

      if (err) {
        console.log('Error reading metadata', err)
      } else console.log(data)
    })
  }
}

eligibleFiles()
