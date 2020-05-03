<template>
  <div  class="folderitem" @mouseover="buttonshow" @mouseout="buttonhidden">
    <div style=" margin-left:1.8%;width:30%;float:left;">
      <div style="font-size:1.2em;float:left;">
        <i class="el-icon-folder"></i> 
      </div>
      <div class="intofolder" style="font-size:1.2em;float:left;margin-left:0.6%;" @click="getinto">
        {{foldername}}
      </div>
    </div>
    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      -
    </div>
    <div style="width:20%;float:left;font-size:1.2em;text-align: left;">
      {{createddate}}
    </div>
    <div style="float:left;font-size:1.2em;text-align: left;">
      <el-button :style="buttonstyle" icon="el-icon-edit" circle @click="rename"></el-button>
      <el-button :style="buttonstyle" icon="el-icon-shopping-cart-full" circle @click="moveprepare"></el-button>
      <el-button :style="buttonstyle" icon="el-icon-delete" circle @click="deletefolder"></el-button>
      <!-- <el-button icon="el-icon-link" circle></el-button> -->
    </div>

    <el-dialog width="20%" title="Move this folder to..." :visible.sync="dialogmoveVisible">
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
  name: 'folderitem',
  props:['foldername','folderid','folderpreid','createddate'],
  data () {
    return {
      buttonstyle: "visibility:hidden",
      dialogmoveVisible: false,
      movetableData: [],
      movecurrentdirname: "All files",
      movefolderlist:[],
      movecurrentid: 0
    };
  },
  mounted: function () 
  {
  },
  methods:
  {
    rowclick(row)
    {
      if(row.movedirid != 0)
      {
        this.movetableData= [];
        this.getlist(row.movedirid);
      }
    },
    buttonshow()
    {
      this.buttonstyle="visibility:visible";
    },
    buttonhidden()
    {
      this.buttonstyle="visibility:hidden";
    },
    getinto()
    {
      this.$bus.emit('updateDirID',{dirID: this.folderid});
    },
    deletefolder()
    {
      this.$confirm('This operation will delete this folder:'+this.foldername, 'Delete', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/api/dirs/'+this.folderid, 
          {
            'x-auth-token': this.Common.xtoken
          }, 
          {
          }, response => {
          if (response.status == 200) 
          {
            this.$message({type: 'success',message: 'Success!'});
            this.$bus.emit('updateDirID',{dirID: this.folderpreid});
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
          this.$http2.post(this.Common.baseurl+"/api/dirs/"+this.folderid, 
          {"name":value}, 
          {
            headers: {'x-auth-token': this.Common.xtoken, 'Content-Type': 'application/json'}
          })
          .then(response => {
              if (response.status == 200) {
                this.$message({type: 'success',message: 'Success!'});
                this.$bus.emit('updateDirID',{dirID: this.folderpreid});
              }
          })
          .catch(function (error) {
            console.log(error.response);
          });
        }).catch(() => {     
        });
    },
    moveprepare()
    {
      this.dialogmoveVisible = true;
      this.movetableData= [];
      this.getlist(this.folderpreid);

    },
    move()
    {
      this.dialogmoveVisible = false;
      this.$http2.post(this.Common.baseurl+"/api/dirs", 
      {
        "from_dir_id": this.folderid,
        "to_id": this.movecurrentid
      }, 
      {
        headers: {'x-auth-token': this.Common.xtoken, 'Content-Type': 'application/json'}
      })
      .then(response => {
          if (response.status == 200) {
            this.$message({type: 'success',message: 'Success!'});
            this.$bus.emit('updateDirID',{dirID: this.folderpreid});
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
.folderitem
{
  padding:0.5%;
  width:100%;
  display:inline-block;
  margin: 0;

}
.folderitem:hover
{
  background-color:#F5F7FA;
}
.intofolder:hover
{
  color:#409EFF;
}
.dirback:hover
{
  text-decoration: underline;
}
</style>
