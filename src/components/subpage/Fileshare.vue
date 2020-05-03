<template>
  <div class="fileshare">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%;">
      <el-table-column
        property="id"
        label="ID"
        min-width="4%">
      </el-table-column>
      <el-table-column
        property="name"
        label="File Name"
        min-width="10">
      </el-table-column>
      <el-table-column
        property="password"
        label="Password"
        min-width="10%">
      </el-table-column>
      <el-table-column
        property="maxdownloadtimes"
        label="Max Download Times"
        min-width="10%">
      </el-table-column>
      <el-table-column
        property="downloadedtimes"
        label="Downloaded times"
        min-width="10%">
      </el-table-column>
      <el-table-column
        property="deadline"
        label="Share Deadline"
        min-width="15%">
      </el-table-column>
      <el-table-column
        property="url"
        label="Share URL"
        min-width="20%">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button style="float:left;margin-left: 3%;margin-right: 1%" @click="shareupdateprepare">Change config</el-button>
      <el-button style="float:right;margin-right: 3%" @click="deleteshare">Delete share</el-button>
    </div>

    <el-dialog
    title="Set up this share"
    :visible.sync="showdialogVisible">
      Deadline:
      <el-date-picker
        v-model="updatesharetime"
        style="margin-right:2%"
        type="datetime"
        placeholder="choose share time">
      </el-date-picker>
      Limit times:
      <el-input-number style="margin-right:2%" v-model="updatesharelimit" controls-position="right" :min="-1" :max="50"></el-input-number>
      Password:
      <el-radio-group v-model="updatehaspassword">
        <el-radio-button label="True"></el-radio-button>
        <el-radio-button label="False"></el-radio-button>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showdialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="shareupdate ">Confirm</el-button>
      </span>
    </el-dialog>
 </div>


</template>

<script>

export default {
  name: 'Fileshare',
  data() {
    return {
      tableData: [],
      currentRow: null,
      showdialogVisible: false,
      updatesharetime: "",
      updatesharelimit: 0,
      updatehaspassword: "True",
    }
  },
  mounted: function () 
  {
    this.getlist();
    
  },
  methods:{
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    deleteshare ()
    {
      if(this.currentRow != null)
      {
        this.$confirm('This operation will delete this share', 'Delete', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/api/shares/'+this.currentRow.id, 
          {
            'x-auth-token': this.Common.xtoken
          }, 
          {
          }, response => {
          if (response.status == 200) 
          {
            this.$message({type: 'success',message: 'Success!'});
            console.log(response);  
            this.tableData= [];
            this.getlist();
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
      }
    },
    getlist ()
    {
      this.$api.get('/api/shares', 
      {
        'x-auth-token': this.Common.xtoken
      },
      {                     
      }, response => {
      if (response.status == 200) 
      {
        console.log(response);
        var shareslist;

        shareslist = response.data.result_data;

        for (var key in shareslist)
        {
          this.tableData.push({id: shareslist[key].share_id, name: shareslist[key].name, password: shareslist[key].password,
                                maxdownloadtimes: shareslist[key].limit_download_times, downloadedtimes: shareslist[key].download_times,
                                deadline: shareslist[key].deadline, url:shareslist[key].share_url});
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
    shareupdateprepare()
    {
      this.updatesharetime=new Date(this.currentRow.deadline);
      this.updatesharelimit=this.currentRow.maxdownloadtimes;
      if(this.currentRow.password == "")
      {
        this.updatehaspassword="False";
      }
      else
      {
        this.updatehaspassword="True";
      }
      this.showdialogVisible = true;
    },
    shareupdate()
    {
      this.showdialogVisible = false;
      console.log(this.timeparse(this.updatesharetime));
      var updatehaspassword;
      if(this.updatehaspassword == "False")
      {
        updatehaspassword = false;
      }
      else
      {
        updatehaspassword =true;
      }
      this.$http2.post(this.Common.baseurl+"/api/shares/"+this.currentRow.id, 
      {
        "deadline": this.timeparse(this.updatesharetime), 
        "limit_download_times": this.updatesharelimit,
        "has_password": updatehaspassword
      }, 
      {
        headers: {'x-auth-token': this.Common.xtoken, 'Content-Type': 'application/json'}
      })
      .then(response => {
          if (response.status == 200) {
            this.$message({type: 'success',message: 'Success!'});
            this.tableData=[];
            this.getlist();
          }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    },
    timeparse(time)
    {
      var y,m,d,h,min,s;
      y=time.getFullYear();
      m=time.getMonth()+1;
      if(m < 10)
      {
        m="0"+m;
      }
      d=time.getDate();
      if(d<10)
      {
        d="0"+d;
      }

      return y+"-"+m+"-"+d+" "+time.toTimeString().split(" ")[0];
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.fileshare
{
  background-color:white;
  height:100%;
}
</style>
