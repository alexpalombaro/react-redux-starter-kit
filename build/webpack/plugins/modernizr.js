import {build} from 'modernizr';

class ModernizerPlugin {

  constructor(options = {}) {
    this.options = options;
  }

  apply = (compiler) => {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('optimize-chunk-assets', (chunks, callback) => {
        chunks.map((chunk) => {
          if (chunk.name === 'vendor') {
            console.log(chunk.modules.length, chunk.modules[0]);
          }
        })
      })
    })
  }
}

export default ModernizerPlugin
