<template>
  <div id="app">

    <div class="container-selectfile">
      <a-upload
        accept=".mkv,.avi,.mp4,.vlc,.mpeg,.srt,.jpeg,.jpg,.png"
        name="file"
        :multiple="true"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :remove="handleRemove"
      >
        <div class="block-btn">
          <a-button> <a-icon type="upload" /> Seleccionar Archivos Para Subir</a-button>
        </div>
        
      </a-upload>

      <a-button
        type="primary"
        :disabled="disabled"
        :loading="uploading"
        style="margin-top: 16px"
        @click="handleUpload"
      >
        {{ uploading ? 'Subiendo archivos' : 'Empezar a Subir' }}
      </a-button>
      
    </div> 

    <div class="container-uploader-dragger">
      
      <ul>
        <li>Tamaño Maximo del video: 5000MB</li>
        <li>Almenos tiene que tener un video para poder subir</li>
        <li>Solo esta permitido archivos de tipo: video, imagenes, srt </li>
      </ul>

      <div class="block-alert">
        <a-alert message="Recuerde que se creara una nueva carpeta por cada subida que uds haga" type="info" show-icon />
      </div>
    </div>


    <div id="container-files">
      <a-list bordered :data-source="files">
        <a-list-item slot="renderItem" slot-scope="item, index">
        <div>
          <a-dropdown :trigger="['contextmenu']">
            <template v-if="item.type=='directory'">
              <div class="file"  @click="openfolder({folder: item.item})">
                <a-icon :type="typeicon(item)" theme="twoTone" :two-tone-color=" item.type == 'directory' ? '#1890ff' : '#eb2f96' "  />  {{ item.item }}
              </div>
            </template>
            <template v-else>
              <div class="file">
                <a-icon :type="typeicon(item)" theme="twoTone" :two-tone-color=" item.type == 'directory' ? '#1890ff' : '#eb2f96' "  />  {{ item.item }}
              </div>
            </template>
            
            <a-menu slot="overlay">
              
              <a-menu-item key="1" @click="openfolder({folder: item.item})" v-if="item.type == 'directory' " >
               <a-icon type="folder-open" theme="twoTone" />Ver Folder
              </a-menu-item>
              <a-menu-item key="2" @click="maketask(item)" v-if="item.type == 'directory' ">
                <a-icon type="code" theme="twoTone" two-tone-color="#52c41a" />Subir Carpeta
              </a-menu-item>
              <a-menu-item key="3" @click="actionremove(item)">
                <a-icon type="delete" theme="twoTone" two-tone-color="#eb2f96" />Eliminar
              </a-menu-item>
              <a-menu-item key="4" v-if="item.type == 'directory' ">
                 <a-icon type="control" theme="twoTone" />Configurar
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </div>
        
        </a-list-item>
        <div slot="header">
          <a-breadcrumb>
            <a-breadcrumb-item href="javascript:void(0)">
              <a-icon type="home" />
            </a-breadcrumb-item>
            <a-breadcrumb-item href="">
              <span @click="e => openfolder({folder: ''})">
                <a-icon type="folder" theme="twoTone" />
                <span> Pelisfull.tv</span>
              </span>
              
            </a-breadcrumb-item>
            <template v-if="subfolder">
              <a-breadcrumb-item>
                <a-icon type="folder-open"  />
                <span>{{subfolder}}</span>
              </a-breadcrumb-item>
            </template>
            
          </a-breadcrumb>

        </div>
        <div slot="footer">
          Lista de Archivos
        </div>
      </a-list>
    </div>
    
  </div>
</template>

<script>

import http from './helpers/http'
import {isObjectNoEmpty} from './helpers/utils'
import {message} from 'ant-design-vue'

export default {
  name: 'App',
  data() {
    return {
      files: [],
      fileList: [],
      subfolder: '',
      uploading: false,
      disabled: true,
      namefolder: 'default'
    }
  },
  mounted() {
    http.get(`/files/root`).then(res => {
       console.log('data', res.data) 
      this.files = res.data
    }).catch(err => console.log(err))
  },
  methods: {
    handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList

      this.disabled = true
      const type = ['video/mp4', 'video/avi', 'video/x-matroska']
      for(const f of this.fileList) {
        console.log(f)
        if(type.includes(f.type)) {
          this.namefolder = f.name
          this.disabled = false
        }
      }


    },
    beforeUpload(file, fileList) {
      this.disabled = true
      const type = ['video/mp4', 'video/avi', 'video/x-matroska']
      for(const f of fileList) {
        console.log(f)
        if(type.includes(f.type)) {
          this.namefolder = f.name
          this.disabled = false
        }
      }
      
      this.fileList = [...this.fileList, file]
      return false
    },
    handleUpload() {
      const { fileList, namefolder } = this
      const formData = new FormData()
      
      formData.append('namefolder', namefolder)
      fileList.forEach(file => {
        formData.append('files', file)
      })

      
      this.uploading = true

      // You can use any AJAX library you like
      http.post(`/uploadfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(res => {
        this.fileList = []
        this.uploading = false
        message.success('upload successfully.')
        this.openfolder({folder: ''})

      })
      .catch(err => {
        console.log(err)
        this.uploading = false
        message.error('upload failed.')

      })

    },
    openfolder(root = {}) {
      //console.log(item)
     
      this.subfolder = root.folder
      
      http.get(`/files/root/${this.subfolder}`).then(res => {
        console.log('data', res.data) 
        this.files = res.data
      }).catch(err => console.log(err))
      

    },
    actionremove(item) {
      console.log(item)
      http.get(`/files/root/remove/${item.pathfile}`).then(res => {
        if(res.data.success) {
           http.get(`/files/root/${this.subfolder}`).then(res => {
            //console.log('data', res.data) 
            this.files = res.data
          })
        } else {
          message.error('no se pudo eliminar')
        }

      }).catch(err => console.log(err))
    },
    maketask(item) {
      http.get(`/task/${item.pathfile}`).then(res => {
        console.log(res.data)
      }).catch(err => console.log(err))
    },
    typeicon(item) {
      //console.log(item)
      let exts = {
        'video-camera' : ['mkv', 'avi', 'flv', 'mp4'],
        'file-image' : ['jpg', 'jpeg', 'png', 'bmp'],
        'gift' : ['rar', 'zip'],
        'sound' : ['mp3'],
      }

      if(item.type == 'directory') {
        return 'folder'
      } else {
        //console.log(item.extension)
        if(item.extension) {
          for(const t in exts) {
            //console.log(exts[t])
            if(exts[t].includes(item.extension)) {
              return t
            }
          }

          return 'file'

        } 

      }

    }

  },
}
</script>

<style lang="scss">
  #app {
    max-width: 800px;
    margin: 0 auto;
  }

  .container-selectfile { 
    border: 1px solid #e8e8e8;
    padding: 30px;
    margin: 50px;

    .block-btn {
      width: 100%;
      text-align: center;
    }
    
  }


  #container-files {
    .file {
      cursor: pointer;
    }
  }

  .block-alert {
    max-width: 500px;
    margin: 0 auto;
  }

</style>
