// const app = getApp()
// // const util = require("../../../utils/util.js")
// var i;
// var image_belong;
// var only_num;
// var form_data;
// var psw_vaule = [];
// Page({
//   data: {
//     tempFilePaths: [],
//     percent: 0,
//     in_percent: false
//   },
//   img_item: function (e) {
//     var that = this;
//     wx.chooseImage({
//       count: 1,
//       sizeType: ['original', 'compressed'],
//       sourceType: ['album', 'camera'],
//       success: function (res) {
//         that.setData({
//           ['tempFilePaths[' + e.target.id + ']']: res.tempFilePaths[0]
//         })
//         console.log(res)
//       }
//     })
//   },
//   //POST
//   formSubmit: function (e) {
//     var that = this;
//     form_data = e.detail.value;
//     if (psw_vaule[0] === psw_vaule[1]) {
//       if (e.detail.value.name != '' && e.detail.value.account != '' && e.detail.value.psw != '' && e.detail.value.linktel != '' && e.detail.value.car_num != '') {
//         var num = 0;
//         for (var a = 0; a < that.data.tempFilePaths.length; a++) {
//           if (that.data.tempFilePaths[a] === null) {
//             wx.showToast({
//               title: '请填写完整···',
//             })
//           } else {
//             num++
//             if (num === 5) {
//               that.btn_up()
//             }
//           }
//         }
//       } else {
//         wx.showToast({
//           title: '请填写完整···',
//         })
//       }
//     } else {
//       wx.showToast({
//         title: '密码重复···',
//       })

//     }
//   },
//   btn_up: function (e) {
//     var that = this;
//     switch (i) {
//       case 0:
//         image_belong = 'headimage'
//         break;
//       case 1:
//         image_belong = 'idcard_positive'
//         break;
//       case 2:
//         image_belong = 'idcars_reverse'
//         break;
//       case 3:
//         image_belong = 'driver_license'
//         break;
//       case 4:
//         image_belong = 'driving_this'
//         break;
//     }
//     var data = form_data
//     data.openid = app._openid
//     data.program_id = app.jtappid
//     data.state = 1
//     data.only_num = only_num
//     data.image_belong = image_belong
//     wx.uploadFile({
//       url: '/register_1',
//       filePath: that.data.tempFilePaths[i],
//       name: 'image',
//       formData: data,
//       success: function (res) {
//         console.log(image_belong)
//         i++
//         that.setData({
//           percent: that.data.percent + 20,
//           in_percent: true
//         })
//         if (i == that.data.tempFilePaths.length) {
//           util.request('/temp_info', 'get', { 'only_num': only_num }, '正在加载数据', function (res) {
//             console.log(2)
//             if (res.data.state == 1) {
//               wx.showModal({
//                 title: '提示',
//                 content: '提交成功!',
//                 success: function (res) {
//                   that.setData({
//                     in_percent: false
//                   })
//                   that.onLoad()
//                   wx.navigateBack({
//                     delta: 2
//                   })
//                 }
//               })
//             } else {
//               wx.showModal({
//                 title: '提示',
//                 content: '提交失败,请重新提交!',
//               })
//             }
//           })
//         } else if (i < that.data.tempFilePaths.length) {//若图片还没有传完，则继续调用函数
//           that.btn_up()
//         }
//       }
//     })
//   },
//   onLoad: function (options) {

//   },
//   onShow: function () {
//     only_num = 'jt' + Math.round(new Date() / 1000);
//     i = 0
//   },
//   onReachBottom: function (e) {
//     console.log(e)
//   },
//   onShareAppMessage: function () {

//   },
//   psw_1: function (e) {
//     psw_vaule[0] = e.detail.value
//   },
//   psw_2: function (e) {
//     psw_vaule[1] = e.detail.value
//   }
// })