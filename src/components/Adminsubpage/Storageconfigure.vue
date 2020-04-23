<template>
  <div class="storageconfigure">
    <el-table
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%;">
      <el-table-column
        property="id"
        label="ID"
        min-width="7%">
      </el-table-column>
      <el-table-column
        property="name"
        label="Name"
        min-width="15">
      </el-table-column>
      <el-table-column
        property="type"
        label="Type"
        min-width="15%">
      </el-table-column>
      <el-table-column
        property="createdtime"
        label="Created Time "
        min-width="15%">
      </el-table-column>
      <el-table-column
        property="modifytime"
        label="Modify Time"
        min-width="15%">
      </el-table-column>
      <el-table-column
        property="currentuse"
        label="Current Use"
        min-width="15%">
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button style="float:left;margin-left: 3%; display:none;" @click="addconfig">Add a new config</el-button>
      <el-button style="float:left;margin-right: 1%" @click="changeconfig">Change config</el-button>
      <el-popover
        ref="moreinfo"
        placement="bottom"
        title="More Information"
        width="400"
        trigger="manual"
        v-model="visible">
        <p>{{moreinfoshow1}}</p>
        <p>{{moreinfoshow2}}</p>
        <p>{{moreinfoshow3}}</p>
        <p>{{moreinfoshow4}}</p>
        <el-button style="float:left" slot="reference" @click="moreinfo">More Information</el-button>
      </el-popover>

      <el-button style="float:right;margin-right: 3%" @click="deleteconfig">Delete config</el-button>
    </div>

 </div>


</template>

<script>

export default {
  name: 'Storageconfigure',
  data() {
    return {
      tableData: [],
      currentRow: null,
      storageconfigurelist: [],
      visible: false,
      moreinfoshow1: "",
      moreinfoshow2: "",
      moreinfoshow3: "",
      moreinfoshow4: "",
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
    addconfig () 
    {
      this.$router.push({name:"AWSadd"})
    },
    changeconfig () 
    {
      if(this.currentRow != null)
      {
        if(this.currentRow.type == "AWS")
        {
          this.$router.push({name:"AWSchange",params: {changeitem: this.storageconfigurelist[this.currentRow.id-1]}});
        }
        else if(this.currentRow.type == "AZURE")
        {
          this.$router.push({name:"Azurechange",params: {changeitem: this.storageconfigurelist[this.currentRow.id-1]}});
        }
        else if(this.currentRow.type == "LOCAL")
        {
          this.$router.push({name:"Localchange",params: {changeitem: this.storageconfigurelist[this.currentRow.id-1]}});
        }
      }
    },
    moreinfo ()
    {
      if(this.currentRow != null)
      {
        if(this.currentRow.type == "AWS")
        {
          var a=this.storageconfigurelist[this.currentRow.id-1].aws_configuration;
          this.moreinfoshow1="AWS Access Key ID:  "+a.aws_access_key_id;
          this.moreinfoshow2="AWS Secret Access Key:  "+a.aws_secret_access_key;
          this.moreinfoshow3="AWS Region:  "+a.aws_region;
          this.moreinfoshow4="AWS Bucket Name:  "+a.aws_bucket_name;
          this.visible=!this.visible;
        }
        else if(this.currentRow.type == "AZURE")
        {
          var b=this.storageconfigurelist[this.currentRow.id-1].azure_configuration;
          this.moreinfoshow1="Azure Token:  "+b.azure_token;
          this.moreinfoshow2="";
          this.moreinfoshow3="";
          this.moreinfoshow4="";
          this.visible=!this.visible;
        }
        else if(this.currentRow.type == "LOCAL")
        {
          var c=this.storageconfigurelist[this.currentRow.id-1].local_configuration;
          this.moreinfoshow1="Local Path: :  "+c.local_path;
          this.moreinfoshow2="";
          this.moreinfoshow3="";
          this.moreinfoshow4="";
          this.visible=!this.visible;
        }
      }
    },
    deleteconfig ()
    {
      if(this.currentRow != null)
      {
        this.$confirm('This operation will delete this config:'+this.currentRow.name, 'Delete', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$api.delete('/admin/config/storage/'+this.currentRow.id, 
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
      this.$api.get('/admin/config/storage', 
      {
        'x-auth-token': this.Common.xtoken
      }, 
      {

      },
      response => {
      if (response.status == 200) 
      {
        
        var storageconfiglist;

        storageconfiglist = response.data.result_data;
        for (var key in storageconfiglist)
        {
          this.tableData.push({id: storageconfiglist[key].id,name: storageconfiglist[key].name,type: storageconfiglist[key].type,createdtime: storageconfiglist[key].created_time,
                              modifytime: storageconfiglist[key].modify_time,currentuse: storageconfiglist[key].current_use.toString()});
        }
        this.storageconfigurelist=storageconfiglist;
        
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
.storageconfigure
{
  background-color:white;
  height:100%;
}
</style>
