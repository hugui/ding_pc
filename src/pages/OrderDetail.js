import React, {PureComponent} from 'react';
import {
    Card,
    Descriptions,
    Form,
    Row,
    Col,
    Button,
    message
} from 'antd';
import StandardTable from '../components/StandardTable';
import styles from './index.less';
import {getOrderDetail, submitOrder} from '@/api/serverApi'
import {GetUrlParams} from '@/utils'

class OrderDetail extends PureComponent {
    state = {
        params: { // 请求参数
            orderNo: '123'
        },
        // orderNo: '',
        userId: '123',
        orderData: {},
        orderGoodlist: {
            list: []
        },
    };

    componentWillMount() {
        const {location} = this.props;
        const orderNo = GetUrlParams(location, 'id');
        const userId = GetUrlParams(location, 'userId');
        let data_params = {
            orderNo: orderNo
        };
        this.setState({
            params: data_params,
            userId
        }, () => this.getOrderFunc())
    }

    // 请求接口函数
    getOrderFunc = async () => {
        try {
            const {params} = this.state;  // 获取请求参数
            // alert('params=' + JSON.stringify(params));
            const {data: {data, code, msg}} = await getOrderDetail(params)
            if (code !== '1') return message.error(msg);
            let dataS = { // 拼接表格数据格式
                list: data.goodsList,
            };
            this.setState({
                orderData: data,
                orderGoodlist: dataS
            })
        } catch (error) {
            console.log('err', error)
        }
    }

    handleSumbit = async (e) => {
        e.preventDefault();

        try {
            // const {params} = this.state;  // 获取请求参数
            // alert('submit,params=' + JSON.stringify(params));
            const {userId} = this.state;
            // const {data: {code, msg}} = await submitOrder({orderNo, userId}) // userId -- 不知
            const {data: {code, msg}} = await submitOrder({userId: userId, orderNo: this.state.params.orderNo})
            if (code !== 1) {
                return message.success(msg);
            } else {
                message.success(msg);
                //跳转到上一个页面
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {orderData, orderGoodlist, orderNo} = this.state
        const columns = [
            {
                title: '物料名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
                render: text => {
                    if (text || text === 0) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '型号',
                dataIndex: 'modelNo',
                key: 'modelNo',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '规格',
                dataIndex: 'spec',
                key: 'spec',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '数量',
                dataIndex: 'amount',
                key: 'amount',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '无税单价',
                dataIndex: 'noTaxPrice',
                key: 'noTaxPrice',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '含税单价',
                dataIndex: 'withTaxPrice',
                key: 'withTaxPrice',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '价税合计',
                dataIndex: 'totalTaxPrice',
                key: 'totalTaxPrice',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '交货日期',
                dataIndex: 'deliveryDate',
                key: 'deliveryDate',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            }
        ];
        return (
            <Card
                bordered={false}
                style={{position: 'relative'}}
                title={'采购订单详情'}
                headStyle={{textAlign: 'center'}}
            >
                <Descriptions column={2}>
                    <Descriptions.Item label="订单类型">{orderData.orderCategory}</Descriptions.Item>
                    <Descriptions.Item label="订单编号">{orderData.orderNo}</Descriptions.Item>
                    <Descriptions.Item label="供应商编码" span={2}>{orderData.supplierCode}</Descriptions.Item>
                    <Descriptions.Item label="供应商名称">{orderData.supplierName}</Descriptions.Item>
                    <Descriptions.Item label="采购方名称">{orderData.purchaseName}</Descriptions.Item>
                    <Descriptions.Item label="联系地址">{orderData.supplierAddress}</Descriptions.Item>
                    <Descriptions.Item label="地址">{orderData.purchaseAddress}</Descriptions.Item>
                    <Descriptions.Item label="联系人">{orderData.supplierLinkman}</Descriptions.Item>
                    <Descriptions.Item label="采购工程师">{orderData.purchaseLinkman}</Descriptions.Item>
                    <Descriptions.Item label="联系电话">{orderData.supplierMobile}</Descriptions.Item>
                    <Descriptions.Item label="联系电话">{orderData.purchaseMobile}</Descriptions.Item>
                </Descriptions>

                <div className={styles.tableList}>
                    <StandardTable
                        data={orderGoodlist}
                        columns={columns}
                        showPagination={false}
                    />
                </div>
                <Descriptions column={3} bordered>
                    <Descriptions.Item label="订货条款" span={3}>
                        {orderData.clause}
                    </Descriptions.Item>
                    <Descriptions.Item label="采购代表">{orderData.purchaseMan}</Descriptions.Item>
                    <Descriptions.Item label="制单人">{orderData.producer}</Descriptions.Item>
                    <Descriptions.Item label="制单时间">{orderData.createDate}</Descriptions.Item>
                </Descriptions>
                <Form onSubmit={this.handleSumbit} layout="inline">
                    <Row gutter={{md: 6, lg: 24, xl: 48}} style={{margin: 20}}>
                        <Col md={20} sm={24}></Col>
                        <Col md={4} sm={24}>
                            <Button type="primary" htmlType="submit">
                                提交审批
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        );

    }
}

export default OrderDetail;
