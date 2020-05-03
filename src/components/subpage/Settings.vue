<template>
  <div class="settings">
    <div style="height:5%;"></div>
    <div class="inputblock">
      Birthday: <br/>
      <el-date-picker
        v-model="datevalue"
        type="date"
        placeholder="Choose a date">
      </el-date-picker>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      First name: 
      <el-input v-model="firstnameinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Last name: 
      <el-input v-model="lastnameinput" class="inputbox"></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Gender: <br/>
      <el-select v-model="genderinput" placeholder="choose">
        <el-option
          v-for="item in genderlist"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      Password: 
      <el-input v-model="passwordinput" class="inputbox" show-password></el-input>
    </div>
    <div style="height:5%;"></div>
    <div class="inputblock">
      <el-button type="primary" @click="save">Save</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data ()
  {
    return{
      id: 0,
      birthdayinput: "",
      firstnameinput: "",
      lastnameinput: "",
      passwordinput: "",
      genderlist: [{
          value: "M",
          label: "gentleman"
        }, {
          value: "F",
          label: "lady"
        }],
      genderinput: "",
      datevalue: ""
    };
  },
  created: function () 
  {
    this.$api.get('/api/profile', 
      {
        'x-auth-token': this.Common.xtoken
      },
      {}, response => {
      if (response.status == 200) 
      {
        this.id=response.data.result_data.id;
        if(response.data.result_data.birthday == "")
        {
          this.datevalue=this.datevalue=new Date("2000-01-02");
        }
        else
        {
          this.datevalue=new Date(response.data.result_data.birthday);
          this.datevalue.setDate(this.datevalue.getDate()+1);
        }
        this.firstnameinput=response.data.result_data.first_name;
        this.lastnameinput=response.data.result_data.last_name;
        this.genderinput=response.data.result_data.gender;

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
  methods:
  {
    save()
    {
      this.dateparse();
      this.$http2.post(this.Common.baseurl+"/api/profile/", 
      {
        "birthday": this.birthdayinput,
        "first_name": this.firstnameinput,
        "last_name": this.lastnameinput,
        "gender": this.genderinput,
        "password": this.passwordinput
      }
      , 
      {
        headers: {'x-auth-token': this.Common.xtoken}
      })
      .then(response => {
          if (response.status == 200) {
            this.$notify({title: 'Notification',message: 'Success!',duration: 3000});
          }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    },
    dateparse()
    {
      var y,m,d;
      y=this.datevalue.getFullYear();
      m=this.datevalue.getMonth()+1;
      if(m < 10)
      {
        m="0"+m;
      }
      d=this.datevalue.getDate();
      if(d<10)
      {
        d="0"+d;
      }
      this.birthdayinput=y+"-"+m+"-"+d;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.settings
{
  background-color:white;
  height:100%;
}
.inputblock
{
  margin-left:3%;
  text-align:left;
  width:30%;
}
.inputbox
{
  width:100%;
}
</style>
