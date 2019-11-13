const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
//获取年
for (let i = 2018; i <= date.getFullYear() + 5; i++) {
  years.push("" + i);
}
//获取月份
for (let i = 1; i <= 12; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
for (let i = 1; i <= 31; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}

// pages/home/home.js
Page({
  data: {
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 9, 16, 10, 17],
    choose_year: '',
    impDeptList: [
      {
      dorder: 21, dtype: "DEPT", dpid: 145, dname: "生产-印后", did: 94
      },{        dorder: 22, dtype: "DEPT", dpid: 145, dname: "物料", did: 95
      },{
        dorder: 23, dtype: "DEPT", dpid: 145, dname: "行政", did: 96
      
    }],
    ischecked_input_n:false,
    ischecked_input_j: false,
    ischecked_input_p: false,
    ischecked_input_d: false,
    ischecked_input_ds: false,
    impEtypeList:[{
      dorder: 1, dtype: "ETYPE", dpid: 0, dname: "品质提升", did: 144
    }, {
        dorder: 2, dtype: "ETYPE", dpid: 0, dname: "效率提升", did: 145
      }, {
        dorder: 3, dtype: "ETYPE", dpid: 0, dname: "方法改善", did: 146
    }],
    impAreaList:[{
      dorder: 1, dtype: "AREA", dpid: 141, dname: "老厂A栋", did: 136
    }, {
        dorder: 2, dtype: "AREA", dpid: 141, dname: "老厂B栋", did: 137
      }, {
        dorder: 3, dtype: "AREA", dpid: 141, dname: "老厂C栋", did: 138
    }],
    picSrc1:'',
    picSrc2: ''
  },

  onLoad: function () {
    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })

    var d_type = 'DEPT';
    var d_pid = 142;
    this.getdeptData(d_type, d_pid);

    d_type = 'ETYPE';
    this.getEtypeData(d_type);
    
    d_type = 'AREA';
    d_pid = 141;
    this.getAreaData(d_type, d_pid);
  },

  /**获取部门数据 */
  getdeptData: function (d_type, d_pid) {
    console.log('getdeptData');
    var that = this;
    wx.request({
      url: 'http://localhost/impDict/impdict/deptListByCb',
      header: {
        "Content-Type": "applciation/json"
      },
      data:{
        'd_type': d_type,
        'd_pid': d_pid
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          impDeptList: res.data.impDeptList

        })
      },fail:function(){

      }
    })
  },

/**获取事件类型数据 */
  getEtypeData: function (d_type){
    console.log('getEtypeData');
    var that = this;
    wx.request({
      url: 'http://localhost/impDict/impdict/etypeList',
      header: {
        "Content-Type": "applciation/json"
      },
      data: {
        'd_type': d_type
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          impEtypeList: res.data.etypeList

        })
      },fail: function () {

      }
    })
  },

  /**获取区域数据 */
  getAreaData: function (d_type, d_pid) {
    console.log('getAreaData');
    var that = this;
    wx.request({
      url: 'http://localhost/impDict/impdict/areaList',
      header: {
        "Content-Type": "applciation/json"
      },
      data: {
        'd_type': d_type,
        'd_pid': d_pid
      },
      method: 'GET',
      success: function (res) {
        console.log(res);
        that.setData({
          impAreaList: res.data.areaList

        })
      },fail: function () {

      }
    })
  },

  // importPic:function(){
  //   var _this = this;
  //   wx.chooseImage({
  //     count: 1, // 最多可以选择的图片张数，默认9
  //     sizeType: ['original', 'compressed'],// original 原图，compressed 压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
  //     success: function(res) {
  //       console.log("importPic:"+res);
  //       _this.setData({
  //         impsrc:res.tempFilePaths
  //       })
  //     },
  //   })
  // }, 

  importPic: function (e) {
    var that = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            that.chooseWxImageShop(e,'album')
          } else if (res.tapIndex == 1) {
            that.chooseWxImageShop(e,'camera')
          }
        }
      }
    })
  },
  chooseWxImageShop: function (e,type) {
    console.log(type)
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res.tempFilePaths[0])
        that.setData({
          picSrc1: res.tempFilePaths[0]

        })
        /*上传单张
            that.data.orderDetail.shopImage = res.tempFilePaths[0],
            that.upload_file(API_URL + 'shop/shopIcon', res.tempFilePaths[0])
        */
        /*上传多张（遍历数组，一次传一张）
           for (var index in res.tempFilePaths) {
              that.upload_file(API_URL + 'shop/shopImage', res.tempFilePaths[index])
           }
       */
       
        // that.upload_file('http:localhost:80/', res.tempFilePaths[0])
      }
    })
  },

  upload_file: function (url, filePath) {
    var that = this;
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: 'uploadFile',
      header: {
        'content-type': 'multipart/form-data'
      }, // 设置请求的 header
      // formData: { 'shopId': wx.getStorageSync('shopId') }, // HTTP 请求中其他额外的 form data
      success: function (res) {
        wx.showToast({
          title: "提交成功",
          icon: 'success',
          duration: 700
        })
      },
      fail: function (res) {
      }
    })
  },

/**form 提交 */
  formSubmit: function (e) {
    console.log('formlog:', e.detail.value)
    wx.showModal({
      title: '提示',
      content: '提交失败,请重新提交!',
    })
  },

  /**元素点击更换样式 */
  clickEleChangeClass_n:function(){
    this.setData({
      ischecked_input_n:true,
      ischecked_input_j: false,
      ischecked_input_p: false,
      ischecked_input_d: false,
      ischecked_input_ds: false,
    })
  },
  clickEleChangeClass_j: function () {
    this.setData({
      ischecked_input_j: true,
      ischecked_input_n: false,
      ischecked_input_p: false,
      ischecked_input_d: false,
      ischecked_input_ds: false,
    })
  },
  clickEleChangeClass_p: function () {
    this.setData({
      ischecked_input_p: true,
      ischecked_input_n: false,
      ischecked_input_j: false,
      ischecked_input_d: false,
      ischecked_input_ds: false,
    })
  },
  clickEleChangeClass_d: function () {
    this.setData({
      ischecked_input_n: false,
      ischecked_input_j: false,
      ischecked_input_p: false,
      ischecked_input_d: true,
      ischecked_input_ds: false,
    })
  },
  clickEleChangeClass_ds: function () {
    this.setData({
      ischecked_input_n: false,
      ischecked_input_j: false,
      ischecked_input_p: false,
      ischecked_input_d: false,
      ischecked_input_ds: true,
    })
  },
  //获取时间日期
  bindMultiPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    this.setData({
      time: year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    })
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function (e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
})