<template>
  <div>
    <el-form :model="searchData" ref="searchData" label-width="100px">
      <el-row style="margin-top:40px">
        <el-col :span="6" >
          <el-form-item label="课程编号" prop="courseNum">
            <el-input v-model="searchData.courseNum"></el-input>
          </el-form-item>
        </el-col>  
        <el-col :span="6">
          <el-form-item label="课序号" prop="courseIndex">
            <el-input v-model="searchData.courseIndex"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="教师工号" prop="teacher">
            <el-input v-model="searchData.teacher"></el-input>
          </el-form-item>
        </el-col>   
        <el-col :span="6">
          <el-form-item label="开课学院" prop="school">
            <el-select v-model="searchData.school" placeholder="请选择">
              <el-option
                v-for="item in schools"
                :key="item.desc"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>
            <!-- <el-input   v-model="updateData.school"></el-input> -->
          </el-form-item>
        </el-col>          
      </el-row>
      <el-row> 
        <el-col :span="6">
          <el-form-item label="课程名称" prop="courseName">
            <el-input v-model="searchData.courseName"></el-input>
          </el-form-item>
        </el-col>        
        <el-col :span="6">
          <el-form-item label="上课时间" prop="dayTime">
            <el-select v-model="searchData.dayTime" placeholder="请选择">
              <el-option
                v-for="item in weeks"
                :key="item.desc"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>  
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="上课时段" prop="hourPeriod">
            <el-select v-model="searchData.hourPeriod" placeholder="请选择">
              <el-option
                v-for="item in hourPeriods"
                :key="item.desc"
                :label="item.desc"
                :value="item.code">
              </el-option>
            </el-select>  
          </el-form-item>
        </el-col>     
        <el-col :span="6">
          <el-form-item label="上课地点" prop="location">
            <el-input v-model="searchData.location"></el-input>       
          </el-form-item>
        </el-col>                            
      </el-row>
      <el-row>       
        <el-col :span="6">
          <el-form-item label="课堂状态" prop="statusValue">
            <el-select v-model="searchData.statusValue" placeholder="请选择">
              <el-option
                v-for="item in states"
                :key="item.desc"
                :label="item.desc"
                :value="item.desc">
              </el-option>
            </el-select>  
          </el-form-item>
        </el-col>
        <el-col :span="3" :offset="2">
          <el-button type="primary" icon="el-icon-s-fold" @click="clearSearchData" style="font-size: 18px">清空</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-bottom:20px">
        <el-col :span="3" :offset="1">
          <el-button type="danger" icon="el-icon-delete"  @click="batchDelete" style="font-size: 18px">批量删除</el-button>
        </el-col>      
        <el-col :span="3" :offset="1">
          <el-button type="primary" icon="el-icon-plus"  @click="add" style="font-size: 18px">新增</el-button>
        </el-col>
        <el-col :span="3" :offset="10">
          <el-button type="primary" icon="el-icon-search" @click="searchStudent(1,8)" style="font-size: 18px">查询</el-button>
        </el-col>
        <el-col :span="3" :offset="0">
          <el-button type="primary" icon="el-icon-s-fold" @click="importStudent" style="font-size: 18px">导入</el-button>
        </el-col>
      </el-row>     
    </el-form>

    <el-table
      :data="tableDatas"
      @selection-change="handleSelectionChange"
      border
      style="width: 100%;font-size: 16px">
      <el-table-column
        type="selection"
        fixed="left"
        align="center"
        prop="id"
        label="序号"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="id"
        label="序号"
        width="80">
      </el-table-column>
       <el-table-column
        align="center"
        prop="courseIndex"
        label="课序号"
        width="80">
      </el-table-column>        
      <el-table-column
        align="center"
        prop="courseNum"
        label="课程编号"
        width="150">
      </el-table-column>      
      <el-table-column
        align="center"
        prop="courseName"
        label="课程名称"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="teacherName"
        label="教师名称"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="schoolValue"
        label="开课学院"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="dayValue"
        label="上课时间（周内）"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="hourPeriodValue"
        label="上课时段"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="location"
        label="上课地点"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="capacity"
        label="课容量"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="remain"
        label="课余量"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        prop="statusValue"
        label="课堂状态"
        width="160">
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
        width="240">
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateTime"
        label="修改时间"
        width="240">
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        width="180">
          <template #default="scope">
            <el-button @click="open(scope.row)" type="text" size="small" style="font-size: 15px">删除</el-button>
            <el-button @click="Update(scope.row)"  type="text" size="small" style="font-size: 15px">编辑</el-button>
          </template>
      </el-table-column>

    </el-table>
  <!--分页组件-->
    <div style="text-align: right">
      <el-row>
        <el-col :span="24">
            <el-pagination
            style="margin: 15px 0px"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :page-size="size"
            :current-page="now"
            :page-sizes="[2, 4, 6, 8, 10]"
            @current-change="findPage"
            @size-change="findSize"
            :total="total"
            >
            </el-pagination>
        </el-col>
      </el-row>
    </div>
    <!--修改对话框-->
    <el-dialog customClass="customWidth"
      :modal="true"
      :visible="dialogVisible"
      width="60%"
      :title="Title"
      @close="closeUpdate"
    >
       <!--"修改"对话框中的表单-->
      <div style="margin-right: 20px">
        <el-form :model="updateData" :rules="rules" ref="updateData" label-width="100px">
          <el-row>
            <el-col :span="10" :offset="0">
              <el-form-item label="序号" prop="id">
                <el-input v-model="updateData.id" disabled></el-input>
              </el-form-item>
            </el-col> 
            <el-col :span="10" :offset="1">
              <el-form-item label="课序号" prop="courseIndex">
                <el-input v-model="updateData.courseIndex" disabled></el-input>
              </el-form-item>
            </el-col>              
          </el-row>  
          <el-row>
            <el-col :span="10" :offset="0">
                <el-form-item label="课程名称" prop="courseName">
                  <el-input v-model="updateData.courseName" disabled></el-input>
                </el-form-item>
            </el-col>   
            <el-col :span="10" :offset="1">
                <el-form-item label="课程编号" prop="courseNum">
                  <el-input v-model="updateData.courseNum" disabled></el-input>
                </el-form-item>
            </el-col>                                      
          </el-row>
          <el-row>
            <el-col :span="10" :offset="0">
              <el-form-item label="开课学院" prop="school">
                <el-select v-model="updateData.school" disabled placeholder="请选择">
                  <el-option
                    v-for="item in schools"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>  
            <el-col :span="10" :offset="1">
              <el-form-item label="上课时间" prop="dayTime">
                <el-select v-model="updateData.dayTime" placeholder="请选择">
                  <el-option
                    v-for="item in weeks"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>             
          </el-row>
          <el-row>
            <el-col :span="10" :offset="0">
              <el-form-item label="上课时段" prop="hourPeriod">
                <el-select v-model="updateData.hourPeriod" placeholder="请选择">
                  <el-option
                    v-for="item in hourPeriods"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="上课地点" prop="location">
                <el-input v-model="updateData.location" ></el-input>
              </el-form-item>
            </el-col>            
          </el-row>
          <el-row>
            <el-col :span="10" :offset="0">
              <el-form-item label="课容量" prop="capacity" >
                <el-input v-model="updateData.capacity"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="课堂状态" prop="status">
                <el-select v-model="updateData.status" disabled placeholder="请选择">
                  <el-option
                    v-for="item in states"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22" :offset="0">
              <el-form-item label="课堂详情" prop="info" >
                <el-input   v-model="updateData.info"></el-input>
              </el-form-item>
            </el-col>
          </el-row>          
        </el-form>
      </div>
         <!-- 底部按钮 slot="footer" -->
      <div  class="dialog-footer">
        <el-row>
          <el-col :span="6" :offset="8">
            <el-button @click="closeUpdate">取 消</el-button>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-button type="primary" @click="handlerAddOk">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>

    <!--添加对话框-->
    <el-dialog customClass="customWidth"
      :modal="true"
      :visible="addDialogVisible"
      width="60%"
      :title="Title1"
      @close="addDialogVisible = false"
    >
       <!--"添加"对话框中的表单-->
      <div style="margin-right: 20px">
        <el-form :model="addData" :rules="rules" ref="addData" label-width="100px">
          <el-row>
            <el-col :span="10" :offset="0">
              <el-form-item label="课程编号" prop="number">
                <el-input v-model="addData.number"></el-input>
              </el-form-item>
            </el-col> 
            <el-col :span="10" :offset="1">
              <el-form-item label="开课学院" prop="school">
                <el-select v-model="addData.school" placeholder="请选择">
                  <el-option
                    v-for="item in schools"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>                          
          </el-row>  
          <el-row>
            <el-col :span="10" :offset="0">
                <el-form-item label="课程名称" prop="name">
                  <el-input v-model="addData.name"></el-input>
                </el-form-item>
            </el-col>   
            <el-col :span="10" :offset="1">
                <el-form-item label="课程英文名" prop="nameEn">
                  <el-input v-model="addData.nameEn"></el-input>
                </el-form-item>
            </el-col>                                      
          </el-row>
          <el-row>
            <el-col :span="10" :offset="0">
              <el-form-item label="开课时段" prop="period">
                <el-select v-model="addData.period" placeholder="请选择">
                  <el-option
                    v-for="item in periods"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> 
            <el-col :span="10" :offset="1">
              <el-form-item label="开课年级" prop="grade">
                <el-select v-model="addData.grade" placeholder="请选择">
                  <el-option
                    v-for="item in grades"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>             
          </el-row>
          <el-row>         
            <el-col :span="10" :offset="0">
              <el-form-item label="学分" prop="credit">
                <el-input   v-model="addData.credit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" :offset="1">
              <el-form-item label="学时" prop="creditHour">
                <el-input   v-model="addData.creditHour"></el-input>
              </el-form-item>
            </el-col>            
          </el-row>
          <el-row>
            <el-col :span="10" :offset="0">
              <el-form-item label="限选说明" prop="isOnlyMajor">
                <el-select v-model="addData.isOnlyMajor" placeholder="请选择">
                  <el-option
                    v-for="item in isOnlyMajors"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>        
            <el-col :span="10" :offset="1">
              <el-form-item label="考核方式" prop="assessment" >
                <el-select v-model="addData.assessment" placeholder="请选择">
                  <el-option
                    v-for="item in assessments"
                    :key="item.desc"
                    :label="item.desc"
                    :value="item.code">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>                
          </el-row>
          <el-row>
            <el-col :span="22" :offset="0">
              <el-form-item label="课程详情" prop="info" >
                <el-input   v-model="addData.info"></el-input>
              </el-form-item>
            </el-col>
          </el-row>    
        </el-form>
      </div>
         <!-- 底部按钮 slot="footer" -->
      <div  class="dialog-footer">
        <el-row>
          <el-col :span="6" :offset="8">
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </el-col>
          <el-col :span="6" :offset="0">
            <el-button type="primary" @click="addStudent">确 定</el-button>
          </el-col>
        </el-row>

      </div>
    </el-dialog>

    <!--导入Excel对话框-->
    <el-dialog customClass="customWidth"
      :modal="true" 
      :visible="ImportdialogVisible"
      width="29%"
      :title="ImportTitle"   
      @close="ImportdialogVisible = false"
    >
      <el-form :model="form">
        <el-form-item>
          <el-upload class="upload-file"
            drag
            ref="uploadExcel"
            action="http://localhost:8902/sys/singleCourse/import"
            :with-credentials="true" 
            :limit=limitNum
            :auto-upload="false"
            accept=".xlsx"
            :before-upload="beforeUploadFile"
            :on-change="fileChange"
            :on-exceed="exceedFile"
            :on-success="handleSuccess"
            :on-error="handleError"
            :file-list="fileList"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击选择Excel文件</em></div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <div style="margin-left: 120px;">
            <el-button @click="ImportdialogVisible = false" size="small">取 消</el-button>
            <el-button size="small" type="primary" @click="submitUpload()">立即导入</el-button>
          </div>
        </el-form-item>
      </el-form> 

    </el-dialog>
  </div>

</template>


<script>
// import Vue from "vue";
import Vue from "vue";
export default {
  data() {
    return {
      total: 0,
      now: 1,
      size: 8,
      tableDatas: [],
      /* --- 以下导入Excel文件对话框绑定的数据 --- */
      ImportdialogVisible:false, //"导入"对话框是否可见
      ImportTitle:'导入Excel', //"导入"对话框的标题
      limitNum: 1,//导入文件的个数
      form: {    //"导入"表单绑定file，并初始化
          file: ''
      },
      fileList: [],//"导入"文件列表

      sexs:[{value:'男'},{value:'女'}],

      //学院
      schools: [],
      schoolValue: '',
      //周几
      weeks:[],
      dayValue:'',
      //上课时段
      hourPeriods:[],
      hourPeriodValue:'',
      //课程状态
      states:[],
      statusValue:'',

      addDialogVisible:false,
      Title1:"添加学生",
      addData:{},

      multipleSelection:[], //多选时绑定的数据

      //查询数据
      searchData:{
        current : this.now,
        size : this.size,
      },

      updateData:{}, //"修改"对话框中表单数据的初始化
      dialogVisible:false, //"修改"对话框是否可见
      Title:"修改学生", //"修改"对话框的标题
      rules:{ //表单验证
        name:[{ required:true,message:'课程名称不能为空',trigger:'blur'}],
        nameEn:[{ required:true,message:'课程英文名称不能为空',trigger:'blur'}],
        number:[{required:true,message:'课程编号不能为空',trigger:'blur'},
        { pattern:/^(C)[0-9]*$/,message:'学号输入格式错误，应为5位数字',trigger:'blur'},
        { min:6,max:6,message:'学号输入长度错误，应为5位数字',trigger:'blur'}],
        school:[{required:true,message:'开课学院不能为空',trigger:'blue'}],
        grade:[{required:true,message:'开课年级不能为空',trigger:'blue'}],
        credit:[{required:true,message:'学分不能为空',trigger:'blue'}],
        creditHour:[{required:true,message:'学时不能为空',trigger:'blue'}],
        period:[{ required:true,message:'开课时段不能为空',trigger:'blur'}],
        isOnlyMajor:[{ required:true,message:'限选说明不能为空',trigger:'blur'}],
        assessment:[{ required:true,message:'考核方式不能为空',trigger:'blur'}],
        status:[{ required:true,message:'课程状态不能为空',trigger:'blur'}],
      }
    };
  },
  methods: {
    //删除弹出框
    open(row) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.Delete(row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    //删除操作
    Delete(row) {
      console.log(row);
      this.$axios.delete('/sys/singleCourse/delete', {	
        params: {	// 请求参数拼接在url上
          id: row.id
        }
      }).then(res => {
        if(res.data.code == "0000"){
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          self.$message({
            type:"error",
            message:'删除失败!',
            offset:100,
            center:true,
          })
        }
      })      
      this.clearSearchData();
    },
    closeUpdate(){
      this.dialogVisible = false;
      this.showAllUserInfo();
    },
    // 第n页信息
    findPage(now_page) { 
      //用来处理当前页的方法,page为当前页
      this.now = now_page;
      this.showAllUserInfo(now_page, this.size);
    },
    findSize(now_size) {
      //用来处理每页条数的方法,size为当前页条数
      this.size = now_size;
      this.showAllUserInfo(this.now, now_size);
    },
    //清空查询表单
    clearSearchData(){
      this.searchData = {};
      this.selectedOptions = [];
      this.now = 1;
      this.showAllUserInfo();
    },
    //查询
    searchStudent(){
      this.showAllUserInfo();
    },
    // 展示所有的用户信息
    showAllUserInfo(current, size) {
      this.now = current
      //异步请求显示所有数据
      this.searchData.current = current ? current : this.now;
      this.searchData.size = size ? size : this.size;
      console.log("searchData",this.searchData)
      this.$axios.post('/sys/singleCourse/getSingleCourseList',this.searchData, {
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      // }).then(function (response){
      }).then(response =>{
        const _this = this;
        if (response.data.code === "0000"){
            // console.log(response.data.data);
            this.tableDatas = response.data.data;
            this.total = response.data.total;
        }
        // 这里是用户token不正确的回调
        else if (response.data.code === '1002') {
            //删除vuex中存储的用户信息
            _this.$store.dispatch('setUser', null);
            //删除session中存储的信息
            sessionStorage.clear();
            //删除cookie中存储的信息
            const cookies = Vue.$cookies.keys();
            for (let i = 0; i < cookies.length; i++) {
                Vue.$cookies.remove(cookies[i]);
            }
  
            _this.$message({
                message: response.data.msg + '！请重新登录！',
                type: 'warning',
                duration: 2000
            });
            _this.$router.push({name:"SysLogin",params:{isReload: 'true',msg: response.data.msg + '！请重新登录！'}});
          }
      })
    },
    importStudent(){ //弹出导入对话框
      let self = this;
      self.ImportdialogVisible = true;
    },
    // 文件超出个数限制时的钩子
    exceedFile(files, fileList) {
      this.$notify.warning({
        title: '警告',
        message: `只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`
      });
    },
    // 文件状态改变时的钩子
    fileChange(file, fileList) {
      console.log('change');
      console.log(file);
      this.form.file = file.raw;
      console.log(this.form.file);
      console.log(fileList);
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload');
      console.log(file);
      let extension = file.name.substring(file.name.lastIndexOf('.')+1); //获取上传文件的扩展名
      console.log("文件扩展名为:"+extension);
      let size = file.size / 1024 / 1024; //设置上传文件的大小
      const isXLSX = file.name.split(".")[1] === 'xlsx'; //获取上传文件的扩展名
      if(!isXLSX){
        this.$notify.warning({
          title: '警告',
          message: '只能上传Excel2017（即后缀是.xlsx）的文件'
        });
      }
      if(size > 10) {
        this.$notify.warning({
          title: '警告',
          message: '文件大小不得超过10M'
        });
      } 
    },
    // 文件上传成功时的钩子
    handleSuccess() { //res, file, fileList
      let self = this;
      this.$notify.success({
        title: '成功',
        message: '文件导入成功'
      });
      this.showAllUserInfo();
      self.ImportdialogVisible = false;  
    },
      // 文件上传失败时的钩子
    handleError() { //err, file, fileList
      this.$notify.error({
        title: '错误',
        message: '文件导入失败'
      });
    },
    //获取所有学院
    getSelections(){
      this.$axios.get('/sys/course/getSelections', {
      // params:{            
      // },
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      withCredentials: true
      // }).then(function (response){
      }).then(response =>{
        console.log(response);
        this.schools = response.data.data.schools;
        this.weeks = response.data.data.weeks;
        this.hourPeriods = response.data.data.hourPeriods;
        this.states = response.data.data.states;
      })
    },
    submitUpload(){
      let self = this;
      if(self.form.file == ''){
        this.$notify.error({
          title: '错误',
          message: '请选择要导入的文件'
        });
        return;
      }
      self.$refs.uploadExcel.submit();
    },
    Update(row){ //点击"修改"按钮弹出修改对话框
      let self = this;
      console.log("row",row);
      self.dialogVisible = true;
      self.updateData = row;
      self.schoolValue = row.schoolValue;
    },
    handlerAddOk(){ //修改对话框上的"确定"按钮
      let self = this;
      this.$refs["updateData"].validate(valid =>{
        if (valid){
          this.$axios.put('/sys/singleCourse/update', self.updateData, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
            console.log("response",response)
            if(response.data.code == "0000"){
              self.$message({
                type:"success",
                message:"操作成功",
                offset:100,
                center:true,
              })
            }else{
              self.$message({
                type:"error",
                message:response.data.msg,
                offset:100,
                center:true,
              })
            }
            self.dialogVisible = false;
          });
          this.clearSearchData();
        }
      })
    },
    add(){ //点击"修改"按钮弹出修改对话框
      this.addDialogVisible = true;
      this.addData = {};
      this.selectedOptions=[];
      // this.form.nation = '';
      this.photoUrl = '';
      console.log("addData",this.addData);
    },
    addStudent(){ //修改对话框上的"确定"按钮
      console.log("addData",this.addData);
      this.$refs["addData"].validate(valid =>{
        if(valid){
          let self = this;
          this.$axios.post('/sys/course/add', self.addData, {
            headers: {
              "Content-Type": "application/json;charset=utf-8"
            },
            withCredentials: true
          }).then(function (response) {
            console.log("response",response)
            if(response.data.code == "0000"){
              self.$message({
                type:"success",
                message:"操作成功",
                offset:100,
                center:true,
              })
            }else{
              // self.showAllUserInfo();
              self.$message({
                type:"error",
                message:response.data.msg,
                offset:100,
                center:true,
              })
            }
            self.addDialogVisible = false;
          });        
        }   
        this.now = 1;
        this.showAllUserInfo();
        this.selectedOptions = [];
      })
    },
    //批量删除
     batchDelete(){ //"批量删除"按钮绑定的函数
      let self = this;
      let sid = '';
      if(self.multipleSelection.length!=0){
        self.$confirm("确定删除吗？","操作提示",{
          confirmButtonText:"确定",
          cancelButtonText:"取消",
          type:"warning"
        }).then(()=>{ //当用户点击"确定"时，获取用户选择的行的id，并将id拼接成字符串提交给后台
          for(let i=0;i<self.multipleSelection.length;i++){
            sid = sid+self.multipleSelection[i].id;
            sid = sid+",";
          }
          sid = sid.substring(0,sid.length-1);
          console.log(sid);
          this.$axios.delete('/sys/singleCourse/batchDelete', {	
            params: {	// 请求参数拼接在url上
              sid: sid
            }
          }).then(res => {
            if(res.data.code == "0000"){
              console.log(res)
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            this.clearSearchData();
            }else{
              self.$message({
                type:"error",
                message:'删除失败!',
                offset:100,
                center:true,
              })
            }
          })                
        }).catch(()=>{  

        })
      }else{
        self.$message({
          type:"error",
          message:"请选择要删除的数据",
          offset:100,
          center:true,
        })
      }
    },
    handleSelectionChange(rows){ //用户在表格上选择行时绑定的函数
      let self = this;
      self.multipleSelection = rows;
    },
  },
  created() {
    if(!this.$store.state.isLogin) {
      this.$router.push({name: 'SysLogin', params: {isReload: 'true'}});
    }

    this.showAllUserInfo();
    this.getSelections();
  },
};
</script>

<style scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>