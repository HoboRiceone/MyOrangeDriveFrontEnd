<template>
  <div ref="getheight" class="filemanagement">
    <el-container style="width:99%; margin: 0px; padding: 0px;  border:0px;">
      <el-header class="toolview">
      <el-upload
        style="float:left;margin-right:1%"
          action="123"
          :http-request="upload"
          :with-credentials="true"
          :show-file-list="false">
          <el-button type="primary" style="width:120px;">Upload</el-button>
        </el-upload>
        <el-button class="toolcompent" type="primary" @click="filedownload" plain>Download</el-button>
      </el-header>
      <div>
        <h4 style="text-align: left;height:0.5%;margin: 0;margin-left:0.7%">Back</h4>
         <h4 style="text-align: left;height:0.5%;margin: 0;margin-left:0.7%">{{current_dir_name}}</h4>
      </div>  
      <div class="typemenu">
        <p style="text-align: left;margin:0;margin-left:2.3%;width:30%;float:left;">file name</p>
        <p style="text-align: left;margin:0;width:20%;float:left;">size</p>
      </div>
      <div style="height:2%"></div>
      <div ref="setheight" class="fileviewscroll">
        <div v-for="(item,index) in folderitems" :key="'folder'+index" style="padding: 0px;display:block;">
            <folderitem :foldername="item.getname" :folderid="item.getid"></folderitem>
        </div>
        <div v-for="(item,index) in fileitems" :key="'file'+index">
            <fileitem :filename="item.getname"></fileitem>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5';
import axios from 'axios';
import folderitem from "./Fileitems/folderitem";
import fileitem from "./Fileitems/fileitem";
export default {
  name: 'Filemanagement',
  data ()
  {
    return{
      fileList:[{}],
      folderitems: [],
      fileitems: [],
      current_dir_id: -1,
      current_dir_name: 'All files',
    };
  },
  components:
  {
    folderitem,
    fileitem
  },
  methods:
  {
    flushDir(newDir)
    {
      this.current_dir_id = newDir.dirID;
      this.folderitems = [];
      this.fileitems = [];
      this.$api.get('/api/dirstest',
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {
        id: this.current_dir_id,                        //'johnwick123@gmail.com',
        only_dir: false                       //'1231234'
      }, response => {
      if (response.status == 200) 
      {
        var folderslist;
        var fileslist;

        this.current_dir_name=response.data.result_data.name+"/"
        folderslist = response.data.result_data.dirs;
        fileslist = response.data.result_data.files;
        for (var keyfolder in folderslist)
        {
          this.folderitems.push({getname: folderslist[keyfolder].name, getid: folderslist[keyfolder].id});
        }
        for (var keyfile in fileslist)
        {
          this.fileitems.push({getname: fileslist[keyfile].name});
        }
        
      } 
      else if(response.status == 400)
      {
        alert(response.data.msg);
        
      }
      else
      {
        alert("Network Error");
      }
      });
    },

    upload(res)
    {
        let file = res.file;  //注意：直接上传file文件，不要用FormData对象的形式传
        let config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        //从接口获取presigned url
        var presignedUrl='https://my-bucket-glai-01.s3.us-east-2.amazonaws.com/fd1?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200418T151733Z&X-Amz-SignedHeaders=host&X-Amz-Expires=25199&X-Amz-Credential=AKIAUIHAYCXRZ3RDTMT3%2F20200418%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=396c0f30aae3feeeb18c5fc23c7699ecf42bb9b5a2cac38e150ca68793e0ae20';
                //需要用put方法上传，post会报405，aws官方规定是put方法
        // axios.put(presignedUrl, file, config)
        //     .then(res1 => {
        //         if (res1.status == 200) {
        //           console.log(res1);
        //         }
        //     });
        this.generatorFileMd5(file);
    },
    filedownload()
    {
      var link = document.createElement('a');
      link.download='text';
      link.href = "https://my-bucket-glai-01.s3.us-east-2.amazonaws.com/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA_3456324?response-content-disposition=attachment%3Bfilename%3Dhello-kitty.pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200418T145706Z&X-Amz-SignedHeaders=host&X-Amz-Expires=604799&X-Amz-Credential=AKIAUIHAYCXRZ3RDTMT3%2F20200418%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Signature=fe1c73a27f6de9340e05fe1982e16241d56c68065a807dfda9882976fdffbdef";
      link.click();
    },
    generatorFileMd5(file) {
      /**
        * 生成MD5
        */
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
        // file = this.files[0],
      let chunkSize = 2097152                           // Read in chunks of 2MB
      let chunks = Math.ceil(file.size / chunkSize)
      let currentChunk = 0
      let spark = new SparkMD5.ArrayBuffer()
      let fileReader = new FileReader()
      fileReader.onload = function (e) {
          // console.log('read chunk nr', currentChunk + 1, 'of', chunks)
          spark.append(e.target.result)                  // Append array buffer
          currentChunk++;

          if (currentChunk < chunks) {
              loadNext();
          } else {
              // console.info('computed hash', spark.end())  // spark.end(): 文件 MD5值生成完成
              console.log(spark.end())
          }
      };

      fileReader.onerror = function () {
          console.warn('fileReader.onerror is error')
      };

      function loadNext() {
          var start = currentChunk * chunkSize,
              end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
      }

      loadNext()
    }

  },
  created: function () 
  {
    this.$bus.on('updateDirID', this.flushDir);
  },
  mounted: function () 
  {
    this.$refs.setheight.style.height = ((this.$refs.getheight.offsetHeight)*0.84)+'px';
    this.$api.get('/api/dirs', 
    {
      'x-auth-token': this.Common.xtoken
    },
    {
      id: -1,                        //'johnwick123@gmail.com',
      only_dir: false                       //'1231234'
    }, response => {
    if (response.status == 200) 
    {
      var folderslist;
      var fileslist;

      folderslist = response.data.result_data.dirs;
      fileslist = response.data.result_data.files;
      for (var keyfolder in folderslist)
      {
        this.folderitems.push({getname: folderslist[keyfolder].name, getid: folderslist[keyfolder].id});
      }
      for (var keyfile in fileslist)
      {
        this.fileitems.push({getname: fileslist[keyfile].name});
      }
      
    } 
    else if(response.status == 400)
    {
      alert(response.data.msg);
      
    }
    else
    {
      alert("Network Error");
    }
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filemanagement
{
  background-color:white;
  margin: 0px;
  padding: 0px;
  height:100%;
  width:100%;
}
.fileview
{
  text-align: left;
}
.toolview
{
  padding:0.5%;
}
.toolcompent
{
  float:left;
  width:120px;
}
.fileviewscroll
{
  overflow-x:hidden; 
  border-top:1px solid #F2F6FD;
}
.typemenu
{

  width:100%;
}
</style>
