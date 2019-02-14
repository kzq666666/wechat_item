<template>
  <div class="main">
    <div class="info">商品库存信息</div>
    <div class="detail">
      <div class="item" v-for="(item,index) in data" :key="index">
        <div>
          <span class="itemL">abiid</span>
          <span class="itemR">{{item.abiid}}</span>
        </div>
        <div>
          <span class="itemL">name</span>
          <span class="itemR mainname">{{item.mainname}}</span>
        </div>
        <div>
          <span class="itemL">stock</span>
          <span class="itemR">{{item.stock}}</span>
        </div>
        <div>
          <span class="itemL">num</span>
          <span class="itemR num">{{item.num}}</span>
        </div>
        <div>
          <span class="itemL">更新时间</span>
          <span class="itemR">{{new Date(item.update_time*1000).toLocaleString()}}</span>
        </div>
        <div @click="checkHistory(item.abiid,item.mainname)" class="historyDiv">
          <span class="itemL">历史库存</span>
          <a class="itemR check" :ref="item.abiid">展开</a>
        </div>
        <div :id="item.abiid" class="chart"></div>
        <i class="el-icon-close icon" @click="deleteItem(item.abiid,index)"></i>
      </div>
    </div>
    <el-dialog
      :title="tableShowName"
      :visible.sync="dialogVisible"
      width="90%"
      top="16vh"
      :modal-append-to-body="false"
      id="el-dialog"
      :show-close="false"
    >
      <div class="tableWrap">
        <table border="1">
          <thead>
            <th>Time</th>
            <th>Stock</th>
          </thead>
          <tbody>
            <tr v-for="(piece,index) in history" :key="index">
              <td>{{new Date(piece.update_time*1000).toLocaleString()}}</td>
              <td>{{piece.num}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      data: null,
      dialogVisible: false,
      history: null,
      tableShowName: null,
      keyList: {}
    };
  },
  methods: {
    checkHistory(abiid, name) {
      var dom = document.getElementById(abiid);
      if (!dom.offsetHeight) {
        this.$refs[abiid][0].innerText = "收起";

        dom.style.height = "300px";
        dom.addEventListener(
          "webkitTransitionEnd",
          e => {
            e.preventDefault();
            if (dom.offsetHeight) {
              var itemChart = echarts.init(dom);
              itemChart.showLoading();
              this.keyList[abiid] = false;
              this.$http
                .get(this.$http.url + "/api/commodity/history/" + abiid)
                .then(res => {
                  let historyNum = [];
                  let historyTime = [];
                  if (JSON.stringify(res.data.data) !== "{}") {
                    res.data.data.histories.forEach(element => {
                      historyNum.push(element.num);
                      historyTime.push(
                        new Date(element.update_time * 1000)
                          .toLocaleDateString()
                          .replace(/\/2019/g, "")
                      );
                    });
                    itemChart.setOption({
                      title: {
                        text: ""
                      },
                      tooltip: {},
                      toolbox: {
                        feature: {
                          dataView: {}
                        },
                        right: "20px"
                      },
                      legend: {},
                      dataZoom: [
                        {
                          // 这个dataZoom组件，默认控制x轴。
                          type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
                          start: 10, // 左边在 10% 的位置。
                          end: 100 // 右边在 60% 的位置。
                        }
                      ],
                      xAxis: {
                        data: historyTime.reverse()
                      },
                      yAxis: {
                        type: "value",
                        axisLabel: {
                          formatter: this.format
                        }
                      },
                      series: [
                        {
                          type: "line",
                          smooth: "true",
                          data: historyNum.reverse()
                        }
                      ]
                    });
                  }else{
                    itemChart.setOption({
                      title:{
                        text:'暂无数据',
                        textStyle:{
                          color:'red',
                          align:'center'
                        },
                      }
                    })
                  }

                  itemChart.hideLoading();
                  this.keyList[abiid] = true;
                });
            } else {
              echarts.getInstanceByDom(dom).clear();
            }
          },
          false
        );
      } else {
        if (this.keyList[abiid]) {
          this.$refs[abiid][0].innerText = "展开";
          dom.style.height = "0";
          echarts.getInstanceByDom(dom).clear();
        }
      }
      // this.dialogVisible = true;
      // this.tableShowName = name;
    },
    deleteItem(abiid, index) {
      if (confirm("是否删除该商品")) {
        this.$http
          .delete(this.$http.url + "/api/commodity/info", {
            data: { abiid: abiid }
          })
          .then(res => {
            if (res.data.code == 0) {
              this.data.splice(index, 1);
              alert("删除成功");
            } else {
              alert("删除失败");
            }
          });
      }
    },
    format(params) {
      return params >= 1000 ? params / 1000 + "k" : params;
    }
  },
  created() {
    this.$http.get(this.$http.url + "/api/commodity/info").then(res => {
      this.data = res.data.data;
    });
  }
};
</script>

<style>
.main {
  width: 100%;
  height: 100%;
  background: #fbfbfb;
}

.info {
  padding-left: 3rem;
  height: 4rem;
  line-height: 4rem;
  font-size: 1.1rem;
  color: #fff;
  font-weight: bold;
  background: #4ecf59;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
}
.detail {
  width: 100%;
  height: calc(100% - 5rem);
  overflow: scroll;
}

/*方案二*/
.item {
  position: relative;
  width: 97%;
  box-sizing: border-box;
  margin: 0 auto;
  background: #fff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.24);
  padding: 1rem;
  /* height: 2re; */
  margin-bottom: 1rem;
}
.item div {
  border-bottom: 1px solid #ddd;
  margin-bottom: 0.2rem;
}
.item div .itemL {
  display: inline-block;
  width: 30%;
  height: 100%;
}
.item div .itemR {
  display: inline-block;
  width: 70%;
}
.num {
  color: red;
}
.check {
  color: #409eff;
}
.icon {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  font-size: 1.3rem;
}

#el-dialog > div {
  height: 70%;
}
#el-dialog .el-dialog__header {
  padding: 20px 30px 20px 20px;
}
#el-dialog .el-dialog__body {
  height: 75%;
  padding: 0 20px 20px 20px;
}
.tableWrap {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
  box-shadow: 1px 1px 10px grey;
}
table tbody tr {
  background: #fff;
}
table tbody tr:nth-child(odd) {
  background: rgba(144, 144, 144, 0.15);
}
th,
td {
  height: 2rem;
}

.mainname {
  color: #f40;
}

.detail .item .chart {
  /* display: none; */
  width: 100%;
  height: 0;
  transition: height 1s ease;
  border: none;
}
.historyDiv {
  height: 1.6rem;
  line-height: 2rem;
}
</style>