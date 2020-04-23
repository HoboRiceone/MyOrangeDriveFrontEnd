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
        <el-popover
          placement="top"
          width="400"
          v-model="newfoldershow">
          <div>
            <el-input v-model="newfoldername" style="float:left;width:85%"></el-input> 
            <el-button style="float:left;margin-left:3%" type="primary" icon="el-icon-check" circle plain @click="createfolder"></el-button>
          </div>
          <el-button slot="reference" class="toolcompent" type="primary" plain>New Folder</el-button>
        </el-popover>
      </el-header>
      <div style="margin-left:1%;">
        <p class="dirback" style="float:left;font-size:1em;color:#409EFF;" type="text" @click="backpredir">Back </p>
         <p style="float: left;font-size:1em;margin-left:0.5%;"> | {{current_dir_name}}</p>
      </div>  
      <div class="typemenu">
        <p style="text-align: left;margin:0;margin-left:2.3%;width:30%;float:left;">file name</p>
        <p style="text-align: left;margin:0;width:20%;float:left;">size</p>
        <p style="text-align: left;margin:0;width:20%;float:left;">created date</p>
      </div>
      <div style="height:2%"></div>
      <div ref="setheight" class="fileviewscroll">
        <div v-for="(item,index) in folderitems" :key="'folder'+index" style="padding: 0px;display:block;">
            <folderitem :foldername="item.getname" :folderid="item.getid" :folderpreid="item.getpreid" :createddate="item.getdate"></folderitem>
        </div>
        <div v-for="(item,index) in fileitems" :key="'file'+index">
            <fileitem :filename="item.getname" :filesize="item.getsize" :fileid="item.getid" :dirpreid="item.getpreid" :createddate="item.getdate"></fileitem>
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
      pre_dir_id: 0,
      newfoldershow: false,
      newfoldername:"",
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
      this.$api.get('/api/dirs/'+this.current_dir_id,
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {
        only_dir: false                       //'1231234'
      }, response => {
      if (response.status == 200) 
      {
        var folderslist;
        var fileslist;
        this.pre_dir_id=response.data.result_data.pre_id;
        if(response.data.result_data.pre_id == 0)
        {
          this.current_dir_name="All files"
        }
        else
        {
          this.current_dir_name=response.data.result_data.name+"/"
        }
        folderslist = response.data.result_data.dirs;
        fileslist = response.data.result_data.files;
        for (var keyfolder in folderslist)
        {
          this.folderitems.push({getname: folderslist[keyfolder].name, getid: folderslist[keyfolder].id, getpreid: this.current_dir_id, getdate: folderslist[keyfolder].create_date});
        }
        for (var keyfile in fileslist)
        {
          this.fileitems.push({getname: fileslist[keyfile].name+"."+fileslist[keyfile].suffixes, getsize: fileslist[keyfile].size, getid: fileslist[keyfile].id, getpreid: this.current_dir_id,getdate:fileslist[keyfile].create_date});
        }
        
      } 
      else if(response.status == 400)
      {
        alert(response.data.msg);
        
      }
      else
      {
        alert("Network Error");
        console.log(response);
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
      this.generatorFileMd5(file);

      //从接口获取presigned url
              //需要用put方法上传，post会报405，aws官方规定是put方法
      // axios.put(presignedUrl, file, config)
      //     .then(res1 => {
      //         if (res1.status == 200) {
      //           console.log(res1);
      //         }
      //     });
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
      const _this=this;
      fileReader.onload = function (e) {
          // console.log('read chunk nr', currentChunk + 1, 'of', chunks)
          spark.append(e.target.result)                  // Append array buffer
          currentChunk++;

          if (currentChunk < chunks) {
              loadNext();
          } else {
              // console.info('computed hash', spark.end())  // spark.end(): 文件 MD5值生成完成
              var md5code=spark.end();
              _this.$api.get('/api/upload',
              {
                'x-auth-token': _this.Common.xtoken
              }, 
              {
                fileName: file.name,
                fileSize: file.size,
                fileMD5: md5code,
                dirId: _this.current_dir_id
              }, response => {
              if (response.status == 200) 
              {
                var uploadurl;
                var uploadkey;
                uploadurl=response.data.result_data.upload_url;
                uploadkey=response.data.result_data.upload_key;
                let config = {headers: {'Content-Type': 'multipart/form-data'}};

                  //从接口获取presigned url
                          //需要用put方法上传，post会报405，aws官方规定是put方法
                  axios.put(uploadurl, file, config)
                  .then(res1 => {
                      if (res1.status == 200) {
                        console.log(file.name);
                        console.log(file.size);
                        console.log(md5code);
                        console.log(_this.current_dir_id);
                        console.log(uploadkey);
                        var jsondata=JSON.stringify({
                          "file_name": file.name,
                          "size": file.size,
                          "md5": md5code,
                          "dir_id": _this.current_dir_id,
                          "upload_key": uploadkey
                        });
                        console.log(jsondata);
                        _this.$http2.post(_this.Common.baseurl+"/api/upload", 
                        jsondata, 
                        {
                          headers: {'x-auth-token': _this.Common.xtoken, 'Content-Type': 'application/json'}
                        })
                        .then(response => {
                            if (response.status == 200) {
                              _this.$notify({title: 'Notification',message: 'Success!',duration: 3000});
                              var nextdir={dirID: _this.current_dir_id}
                              _this.flushDir(nextdir);
                            }
                        })
                        .catch(function (error) {
                          console.log(error.response);
                        });
                      }
                  });
              } 
              else
              {
                alert("Error");
                console.log(response);
              }
              });
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
    },
    createfolder()
    {
      this.$http2.put(this.Common.baseurl+"/api/dirs/", 
      {
        "name": this.newfoldername,
        "parent_id": this.current_dir_id
      }, 
      {
        headers: {'x-auth-token': this.Common.xtoken}
      })
      .then(response => {
          if (response.status == 200) {
            this.$notify({title: 'Notification',message: 'Success!',duration: 3000});
            var nextdir={dirID: this.current_dir_id}
            this.flushDir(nextdir);
          }
      })
      .catch(function (error) {
        alert("Error: "+error.response.data.msg);
      });
      this.newfoldershow=false;
    },
    backpredir()
    {
      var nextdir={dirID: this.pre_dir_id}
      if(this.pre_dir_id != 0)
      {
        this.flushDir(nextdir);
      }
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
    {                      //'johnwick123@gmail.com',
      only_dir: false                       //'1231234'
    }, response => {
    if (response.status == 200) 
    {
      var folderslist;
      var fileslist;

      this.current_dir_id=response.data.result_data.curr_id;
      this.pre_dir_id=response.data.result_data.pre_id;
      folderslist = response.data.result_data.dirs;
      fileslist = response.data.result_data.files;
      for (var keyfolder in folderslist)
      {
        this.folderitems.push({getname: folderslist[keyfolder].name, getid: folderslist[keyfolder].id, getpreid: this.current_dir_id,getdate: folderslist[keyfolder].create_date});
      }
      for (var keyfile in fileslist)
      {
        this.fileitems.push({getname: fileslist[keyfile].name+"."+fileslist[keyfile].suffixes, getsize: fileslist[keyfile].size, getid: fileslist[keyfile].id, getpreid: this.current_dir_id,getdate:fileslist[keyfile].create_date});
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
.dirback:hover
{
  text-decoration: underline;
}
</style>
