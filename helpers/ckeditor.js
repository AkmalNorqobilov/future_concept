export const  ckeditor= {
    components: {
      'ckeditor-nuxt': () => { if (process.client) { return import('@blowstack/ckeditor-nuxt') } },
    },
    data() {
      return {
        editorConfig: {
          simpleUpload: {
            uploadUrl: 'http://localhost:8080/',
            headers: {
              'Authorization': ''
            }
          }
        },
        contentHolder: ""
      }
    }
  }