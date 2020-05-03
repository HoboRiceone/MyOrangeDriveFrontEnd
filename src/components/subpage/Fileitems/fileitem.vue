<template>
  <div  class="fileitem" @mouseover="buttonshow" @mouseout="buttonhidden">
    <div style=" margin-left:1.8%;width:30%;float:left;">
      <div class="fileiteminside">
        <i class="el-icon-document"></i>
        {{filename}}
      </div>
    </div>

    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      {{filesize}}
    </div>
    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      {{createddate}}
    </div>
    <div style="float:left;font-size:1.2em;text-align: left;">
      <el-button :style="buttonstyle" icon="el-icon-edit" circle @click="rename"></el-button>
      <el-button :style="buttonstyle" icon="el-icon-shopping-cart-full" circle @click="moveprepare"></el-button>
      <el-button :style="buttonstyle" icon="el-icon-download" circle @click="download"></el-button>
      <el-button :style="buttonstyle" icon="el-icon-link" circle @click="showdialogVisible = true"></el-button>
      <el-button :style="buttonstyle" icon="el-icon-delete" circle @click="deletefile"></el-button>
    </div>

    <el-dialog
      title="Set up this share"
      :visible.sync="showdialogVisible">
      Deadline:
      <el-date-picker
        v-model="sharetime"
        style="margin-right:2%"
        type="datetime"
        placeholder="choose share time">
      </el-date-picker>
      Limit times:
      <el-input-number style="margin-right:2%" v-model="sharelimit" controls-position="right" :min="-1" :max="50"></el-input-number>
      Password:
      <el-radio-group v-model="haspassword">
        <el-radio-button label="True"></el-radio-button>
        <el-radio-button label="False"></el-radio-button>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showdialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="share">Confirm</el-button>
      </span>
    </el-dialog>

    <el-dialog width="20%" title="Move this file to..." :visible.sync="dialogmoveVisible">
      <el-table
        :data="movetableData"
        @row-click="rowclick"
        style="width: 100%">
        <el-table-column
          v-bind:label="movecurrentdirname" >
          <template slot-scope="scope">
            <i class="el-icon-folder"></i>
            <span style="margin-left: 10px">{{ scope.row.movedirname }}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogmoveVisible = false">Cancel</el-button>
        <el-button type="primary" @click="move">Move</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'fileitem',
  props:['filename','filesize','fileid','dirpreid','createddate'],
  data () {
    return {
      operationshow: 'none',
      buttonstyle: "visibility:hidden",
      showdialogVisible: false,
      sharetime: "",
      sharelimit: 1,
      haspassword: "True",
      sharetimeinput: "",
      dialogmoveVisible: false,
      movetableData: [],
      movecurrentdirname: "All files",
      movefolderlist:[],
      movecurrentid: 0
    };
  },
  methods:{
    buttonshow()
    {
      this.buttonstyle="visibility:visible";
    },
    buttonhidden()
    {
      this.buttonstyle="visibility:hidden";
    },
    download()
    {
      console.log(this.fileid);
      this.$api.get('/api/d/'+this.fileid,
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {
      }, response => {
      if (response.status == 200) 
      {
        var link = document.createElement('a');
        link.download="";
        link.href = response.data.result_data.download_url;
        link.click();
      } 
      else
      {
        alert("Error:"+response.data.msg);
        console.log(response);
      }
      });
    },
    deletefile()
    {
      this.$confirm('This operation will delete this file:'+this.filename, 'Delete', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/api/files/'+this.fileid, 
          {
            'x-auth-token': this.Common.xtoken
          }, 
          {
          }, response => {
          if (response.status == 200) 
          {
            this.$message({type: 'success',message: 'Success!'});
            this.$bus.emit('updateDirID',{dirID: this.dirpreid});
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
        }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Canceled'
        });          
      });
    },
    rename() 
    {
        this.$prompt('Please enter a new name', 'Rename', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          inputPlaceholder: "New Name",
        }).then(({ value }) => {
          this.$http2.post(this.Common.baseurl+"/api/files/"+this.fileid, 
          {"name":value}, 
          {
            headers: {'x-auth-token': this.Common.xtoken, 'Content-Type': 'application/json'}
          })
          .then(response => {
              if (response.status == 200) {
                this.$message({type: 'success',message: 'Success!'});
                this.$bus.emit('updateDirID',{dirID: this.dirpreid});
              }
          })
          .catch(function (error) {
            console.log(error.response);
          });
        }).catch(() => {     
        });
    },
    share()
    {
      this.showdialogVisible = false;
      this.timeparse();
      var hpassword;
      if(this.haspassword == "False")
      {
        hpassword = false;
      }
      else
      {
        hpassword =true;
      }
      this.$http2.put(this.Common.baseurl+"/api/shares", 
      {
        "file_id": this.fileid,
        "deadline": this.sharetimeinput,
        "limit_download_times": this.sharelimit,
        "has_password": hpassword,
      }
      , 
      {
        headers: {'x-auth-token': this.Common.xtoken}
      })
      .then(response => {
          if (response.status == 200) {
            var shareinfo="Share URL: "+response.data.result_data.share_url+" \n "+"Password: "+response.data.result_data.password
            this.$alert(shareinfo, 'Share info', {
            confirmButtonText: 'Cancel'
            })
          }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    },
    timeparse()
    {
      var y,m,d,h,min,s;
      y=this.sharetime.getFullYear();
      m=this.sharetime.getMonth()+1;
      if(m < 10)
      {
        m="0"+m;
      }
      d=this.sharetime.getDate();
      if(d<10)
      {
        d="0"+d;
      }

      this.sharetimeinput=y+"-"+m+"-"+d+" "+this.sharetime.toTimeString().split(" ")[0];
    },
    rowclick(row)
    {
      if(row.movedirid != 0)
      {
        this.movetableData= [];
        this.getlist(row.movedirid);
      }
    },
    moveprepare()
    {
      this.dialogmoveVisible = true;
      this.movetableData= [];
      this.getlist(this.dirpreid);

    },
    move()
    {
      this.dialogmoveVisible = false;
      this.$http2.post(this.Common.baseurl+"/api/files", 
      {
        "from_file_id": [this.fileid],
        "to_id": this.movecurrentid
      }, 
      {
        headers: {'x-auth-token': this.Common.xtoken, 'Content-Type': 'application/json'}
      })
      .then(response => {
          if (response.status == 200) {
            this.$message({type: 'success',message: 'Success!'});
            this.$bus.emit('updateDirID',{dirID: this.dirpreid});
          }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    },
    getlist(id)
    {
      this.$api.get('/api/dirs/'+id,
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {
        only_dir: true                       //'1231234'
      }, response => {
      if (response.status == 200) 
      {
        this.movecurrentdirname="/"+response.data.result_data.name;
        this.movecurrentid=response.data.result_data.curr_id;
        this.movetableData.push({movedirname: "..", movedirid: response.data.result_data.pre_id});
        var folderslist = response.data.result_data.dirs;

        for (var keyfolder in folderslist)
        {
          this.movetableData.push({movedirname: folderslist[keyfolder].name, movedirid: folderslist[keyfolder].id});
        }
      } 
      else
      {
        alert("Error");
        console.log(response);
      }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fileitem
{
  padding:0.5%;
  width:100%;
  display:inline-block;
  margin: 0px;

}
.fileitem:hover
{
  background-color:#F5F7FA;
}
.fileiteminside
{
  font-size:1.2em;
  display:inline-block;
  float:left;
}
</style>
