import React, {Component, Fragment} from "react";
import {connect} from "dva";
import {Card, Badge, Table, Divider,Button} from "antd";
import PageHeaderWrapper from "@/components/PageHeaderWrapper";
import styles from "./Goods.less";

const Columns = [
    {
        title: "职位",
        dataIndex: "type",
        key: "type"
    },
    {
        title: "共计人数",
        dataIndex: "totalUser",
        key: "totalUser"
    },
    {
        title: "分配物资种类",
        dataIndex: "goodsName",
        key: "goodsName"
    },
    {
        title: "共需物资数",
        dataIndex: "totalGoods",
        key: "totalGoods"
    }
];

@connect(({goods, loading}) => ({
    goods,
    loading: loading.effects["goods/fetch"]
}))
class goodsService extends Component {
    componentDidMount() {
        // this.timer = setInterval(
        //   function() {
        const {dispatch} = this.props;
        dispatch({
            type: "goods/fetch"
            //   payload:localStorageStorage.getItem("antd-pro-authority")
        });
        //   }.bind(this),
        //   5000
        // );
    }

    render() {
        const {goods, loading} = this.props;
        const {ServiceData,port} = goods;

        return (
            <PageHeaderWrapper title="物资分配">
                <Card bordered={false}>
                    <Fragment>
                        当前服务调用{" "}
                        <a style={{ fontWeight: 600 }}>{port}</a>{" "}
                        端口的 用户管理 服务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Button type="primary" onClick={() => this.componentDidMount()}>
                            刷新
                        </Button>
                    </Fragment>
                    <Divider dashed />
                    <Table
                        style={{marginBottom: 16}}
                        pagination={false}
                        loading={loading}
                        dataSource={ServiceData}
                        columns={Columns}
                    />
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default goodsService;
