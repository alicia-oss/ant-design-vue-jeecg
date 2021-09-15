<template>
  <a-card :bordered="false">
    <a-tabs defaultActiveKey="1">

      <!-- 饼图 -->
      <a-tab-pane tab="记录条数统计" key="1">
        <div class="main">
          <div>
            <div class="list_title">
              <span class="title">各部门</span>
              <span class="descInfo pcbox">
					<span>
						记录总条数：
						<i>30</i>
						条
					</span>
				</span>
            </div>
            <div class="msgInfo">
              <div class="el_row" style="margin-left: -5px; margin-right: -5px;">
                <div class="item_col el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-md-6 el-col-lg-6" style="padding-left: 5px; padding-right: 5px; margin-bottom: 10px;">
                  <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header">
                      <div class="clearfix">
                        <div class="before"></div>
                        <span title="部门1" class="namelist">2021</span>
                        <div class="after"></div>
                      </div>
                    </div>
                    <div class="el-card__body">
                      <div class="text item">
                        记录条数:
                        <i>12</i> 条
                      </div>
                    </div>
                  </div>
                </div>


                <div class="item_col el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-md-6 el-col-lg-6" style="padding-left: 5px; padding-right: 5px; margin-bottom: 10px;">
                  <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header">
                      <div class="clearfix">
                        <div class="before"></div>
                        <span title="部门2" class="namelist">2020</span>
                        <div class="after"></div>
                      </div>
                    </div>
                    <div class="el-card__body">
                      <div class="text item">
                        记录条数:
                        <i>8</i> 条
                      </div>
                    </div>
                  </div>
                </div>

                <div class="item_col el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-md-6 el-col-lg-6" style="padding-left: 5px; padding-right: 5px; margin-bottom: 10px;">
                  <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header">
                      <div class="clearfix">
                        <div class="before"></div>
                        <span title="部门3" class="namelist">2019</span>
                        <div class="after"></div>
                      </div>
                    </div>
                    <div class="el-card__body">
                      <div class="text item">
                        记录条数:
                        <i>5</i> 条
                      </div>
                    </div>
                  </div>
                </div>

                <div class="item_col el-col el-col-24 el-col-xs-12 el-col-sm-12 el-col-md-6 el-col-lg-6" style="padding-left: 5px; padding-right: 5px; margin-bottom: 10px;">
                  <div class="el-card box-card is-always-shadow">
                    <div class="el-card__header">
                      <div class="clearfix">
                        <div class="before"></div>
                        <span title="部门4" class="namelist">2018</span>
                        <div class="after"></div>
                      </div>
                    </div>
                    <div class="el-card__body">
                      <div class="text item">
                        记录条数:
                        <i>5</i> 条
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

      </a-tab-pane>
      <a-tab-pane tab="可视化分析" key="2">
        <a-form layout="inline" @keyup.enter.native="searchQuery">
          <a-row :gutter="24">
            <a-col :md="12" :sm="24">
                <bar title="记录分析" :height="height"/>
            </a-col>

            <a-col :md="12" :sm="24">
                <pie title="" :height="height"/>
            </a-col>
          </a-row>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>

<script>
import Pie from './modules/Pie'
import Bar from './modules/Bar'

export default {
  name: 'complaint_analysis',
  components: {
    Pie,
    Bar
  },
  data() {
    return {
      height: 420,
    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style scoped>
.main{
  width: 1200px;
  margin: 0 auto;
  font-family: 微软雅黑;
  padding: 0;
  text-decoration: none;
  box-sizing: border-box;
}
.title{
  font-size: 16px;
  font-weight: 700;
}
.descInfo{
  font-size: 15px;
}
.descInfo span{
  margin-right: 20px;
}
.msgInfo {
  min-height: 520px;
}
.msgInfo {
  margin: 10px 0 50px;
}
el-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-col-pull-0, .el-col-pull-1, .el-col-pull-2, .el-col-pull-3, .el-col-pull-4, .el-col-pull-5, .el-col-pull-6, .el-col-pull-7, .el-col-pull-8, .el-col-pull-9, .el-col-pull-10, .el-col-pull-11, .el-col-pull-13, .el-col-pull-14, .el-col-pull-15, .el-col-pull-16, .el-col-pull-17, .el-col-pull-18, .el-col-pull-19, .el-col-pull-20, .el-col-pull-21, .el-col-pull-22, .el-col-pull-23, .el-col-pull-24, .el-col-push-0, .el-col-push-1, .el-col-push-2, .el-col-push-3, .el-col-push-4, .el-col-push-5, .el-col-push-6, .el-col-push-7, .el-col-push-8, .el-col-push-9, .el-col-push-10, .el-col-push-11, .el-col-push-12, .el-col-push-13, .el-col-push-14, .el-col-push-15, .el-col-push-16, .el-col-push-17, .el-col-push-18, .el-col-push-19, .el-col-push-20, .el-col-push-21, .el-col-push-22, .el-col-push-23, .el-col-push-24, .el-row {
  position: relative;
}
.el-col-lg-6 {
  width: 25%;
}
[class*=el-col-] {
  float: left;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.el-card {
  border: 1px solid #ebeef5;
  background-color: #fff;
  color: #303133;
  -webkit-transition: .3s;
  transition: .3s;
}

.box-card {
  width: 95%;
  margin-bottom: 10px;
}
.el-card, .el-message {
  border-radius: 4px;
  overflow: hidden;
}
.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
  -webkit-box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
.msgInfo .el-card__header {
  background: #fbfbfb;
  cursor: pointer;
}
.el-card__header {
  padding: 18px 20px;
  border-bottom: 1px solid #ebeef5;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.fivelist .el-card__header div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-card__body {
  padding: 20px;
}

.before .after{
  display: table;
  content: "";
}
.namelist{
  font-size: 16px;
  font-weight: 700;
}
.item{
  margin-bottom: 8px;
}
.text{
  font-size: 15px;
}
i{
  font-style: normal;
  color: #c80007;
  font-size: 13px;
}

</style>
