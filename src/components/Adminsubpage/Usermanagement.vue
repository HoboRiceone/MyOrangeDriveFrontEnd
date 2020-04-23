<template>
  <div class="usermanagement">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%;">
      <el-table-column
        property="id"
        label="ID"
        min-width="5%">
      </el-table-column>
      <el-table-column
        property="email"
        label="E-mail"
        min-width="14%">
      </el-table-column>
      <el-table-column
        property="totalstorage"
        label="Total Storage"
        min-width="14%">
      </el-table-column>
      <el-table-column
        property="usedstorage"
        label="Used Storage"
        min-width="14%">
      </el-table-column>
      <el-table-column
        property="blockedstatus"
        label="Blocked Status"
        min-width="10%">
      </el-table-column>
      <el-table-column
        property="uploadaccess"
        label="Upload Access"
        min-width="10%">
      </el-table-column>
      <el-table-column
        property="downloadaccess"
        label="Download Access"
        min-width="10%">
      </el-table-column>
      <el-table-column
        property="sourcetype"
        label="Source Type"
        min-width="14%">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button style="float:left;margin-left: 3%" @click="adduser">Add a new user</el-button>
      <el-button style="float:left" @click="changeuser">Change user config</el-button>
      <el-button style="float:right;margin-right: 3%" @click="deleteuser">Delete a user</el-button>
    </div>
  </div>

</template>

<script>

export default {
  name: 'Usermanagement',
  data() {
    return {
      tableData: [],
      currentRow: null
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
    adduser () 
    {
      this.$router.push({name:"Useradd"})
    },
    changeuser () 
    {
      if(this.currentRow != null)
      {
        this.$router.push({name:"Userchange",params: {changeitem: this.currentRow}})
      }
    },
    deleteuser ()
    {
      if(this.currentRow != null)
      {
        this.$confirm('This operation will delete this user:'+this.currentRow.email, 'Delete', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/admin/users/'+this.currentRow.id, 
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
    getlist()
    {
      this.$api.get('/admin/users', 
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {
      }, response => {
      if (response.status == 200) 
      {
        var userslist;

        userslist = response.data.result_data.users;
        for (var key in userslist)
        {
          this.tableData.push({id: userslist[key].id,email: userslist[key].email,totalstorage: userslist[key].total_storage,usedstorage: userslist[key].used_storage,
                              blockedstatus: userslist[key].blocked_status.toString(),uploadaccess: userslist[key].upload_access.toString(),
                              downloadaccess: userslist[key].download_access.toString(),sourcetype: userslist[key].source_type});
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.usermanagement
{
  background-color:white;
  height:100%;
}
</style>
