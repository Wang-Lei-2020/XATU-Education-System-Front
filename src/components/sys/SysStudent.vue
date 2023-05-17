<template>
  <div>
    <el-row style="margin-top:40px;margin-bottom:20px">
      <el-col :span="3" offset="18">
        <el-button type="primary" icon="el-icon-plus" style="font-size: 18px">新增</el-button>
      </el-col>
      <el-col :span="2" offset="0">
        <!-- <el-upload
          class="upload-demo"
          multiple=""
          method="post"
          action="api/excel/updown"
          style="margin-left: 10px"
          accept=".xlsx,.xls"
          :show-file-list="false"
          :on-success="success"
          name="files"
        > -->
          <el-button type="primary" icon="el-icon-s-fold" @click="importBook" style="font-size: 18px">导入</el-button>
        <!-- </el-upload> -->
      </el-col>
    </el-row>


    <el-table
      :data="tableDatas"
      border
      style="width: 100%;font-size: 18px">
      <el-table-column
      type="selection"
        fixed="left"
        align="center"
        prop="id"
        label="序号"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="姓名"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        prop="number"
        label="学号"
        width="160">
      </el-table-column>
      <el-table-column
        align="center"
        prop="school"
        label="学院"
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="enrollmentTime"
        label="入学时间"
        width="160">
      </el-table-column>
      <el-table-column
        align="center"
        prop="age"
        label="年龄"
        width="160">
      </el-table-column>
      <el-table-column
        align="center"
        prop="household"
        label="籍贯"
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
          <el-button @click="handleClick(scope)" type="text" size="small" style="font-size: 15px">查看</el-button>
          <el-button type="text" size="small" style="font-size: 15px">编辑</el-button>
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
    <!--导入Excel对话框-->
    <el-dialog customClass="customWidth"
      :modal="true" 
      :visible="ImportdialogVisible"
      width="29%"
      :title="ImportTitle"    
    >
      <el-form :model="form">
        <el-form-item>
          <el-upload class="upload-file"
            drag
            ref="uploadExcel"
            action="http://localhost:8902/sys/stu/import"
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
          <!-- <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div> -->
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
// import { read, utils } from "xlsx";
export default {
  data() {
    return {
      total: 0,
      now: 1,
      size: 8,
      input2: "",
      tableDatas: [],
      /* --- 以下导入Excel文件对话框绑定的数据 --- */
      ImportdialogVisible:false, //"导入"对话框是否可见
      ImportTitle:'导入Excel', //"导入"对话框的标题
      limitNum: 1,//导入文件的个数
      form: {    //"导入"表单绑定file，并初始化
          file: ''
      },
      fileList: [],//"导入"文件列表
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
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

    // 展示所有的用户信息
    showAllUserInfo(current, size) {
      //异步请求显示所有数据
      current = current ? current : this.now;
      size = size ? size : this.size;
      console.log("current",current)
      // let formData = new FormData();
      // formData.append('current', current);
      // formData.append('size', size);
      // console.log("formData",formData.get('current'))
      // this.$axios.get('/sys/stu/getStudentList', formData, {
      this.$axios.get('/sys/stu/getStudentList', {
        params:{            
          current:current ,  //参数，键值对，key值：value值
          size:size
        },
        headers: {
          "Content-Type": "application/json;charset=utf-8"
        },
        withCredentials: true
      // }).then(function (response){
      }).then(response =>{
        console.log(response.data.data);
        this.tableDatas = response.data.data;
        this.total = response.data.total;
      })
    },
    importBook(){ //弹出导入对话框
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
      console.log('change')
      console.log(file)
      this.form.file = file.raw
      console.log(this.form.file)
      console.log(fileList)
    },
    // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
    beforeUploadFile(file) {
      console.log('before upload')
      console.log(file)
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
  },
  created() {
    this.showAllUserInfo();
  },
};
</script>
