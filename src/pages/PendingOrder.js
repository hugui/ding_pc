import React, {PureComponent, Fragment} from 'react';
import {
    Card,
    message
} from 'antd';
import * as dd from 'dingtalk-jsapi';
import StandardTable from '../components/StandardTable';
import styles from './index.less';
import {getOrderList} from '@/api/serverApi'
import {userInfo} from '@/api/serverApi'

const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');

class PendingOrder extends PureComponent {
    state = {
        corpId: 'dingde1e7be2ecdfb9d135c2f4657eb6378f',
        params: { // 请求参数
            mobile: '123'
        },
        userId: '345',
        access_code: {//免登陆授权码
            code: ''
        },
        PendingOrderList: {
            list: [],
            pagination: {
                current: 1,
                pageSize: 10,
                total: 0,
                totalPage: 0,
            }
        }
    };

    //  表格内容改变的方法
    handleStandardTableChange = (pagination, filtersArg, sorter) => {

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = {...obj};
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            currentPage: pagination.current,
            pageSize: pagination.pageSizes,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
        this.setState({
            params,
        }, () => this.getOrderListFunc());
    };

    async componentWillMount() {
        await this.getAccessCodeFunc();
        // this.getUserInfoFunc();
        // this.getOrderListFunc();
    }

    // 获取免登陆code
    getAccessCodeFunc = async () => {
        const _this = this;
        const corpId = this.state.corpId;
        //钉钉sdk 初始化 dd.ready参数为回调函数，在环境准备就绪时触发，jsapi的调用需要保证在该回调函数触发后调用，否则无效。
        dd.ready(function () {
            //解析url中包含的corpId
            //使用SDK 获取免登授权码
            dd.runtime.permission.requestAuthCode({
                corpId: corpId,
                onSuccess: function (result) {
                    let dataS = {
                        code: result.code
                    };
                    _this.setState({access_code: dataS}, async () => {
                        const {access_code} = _this.state;
                        // alert('access_code=' + JSON.stringify(access_code));
                        // const {data: {data, code, msg}} = await userInfo(access_code)
                        // alert('data=' + JSON.stringify(data));
                        // if (code !== '1') return message.error(msg);
                        await _this.getUserInfoFunc();
                    });
                }
            });
        });
    };


    // 获取用户信息
    getUserInfoFunc = async () => {
        try {
            const {access_code} = this.state;  // 获取请求参数
            // alert('access_code1=' + JSON.stringify(access_code));
            const {data: {data, code, msg}} = await userInfo(access_code)
            // alert('userInfo=' + JSON.stringify(data));
            if (code !== '1') return message.error(msg);
            // alert('userId=' + data.user.userId);
            this.setState({userId: data.user.userId});
            let data_params = {
                mobile: data.user.mobile
            };
            this.setState({userId: data.user.userId})
            this.setState({params: data_params}, async () => {
                const {params} = this.state;
                // alert('params=' + JSON.stringify(params));
                await this.getOrderListFunc();
            })
        } catch (error) {
            console.log('error', error)
        }
    };

    // 请求接口函数
    getOrderListFunc = async () => {
        try {
            const {params} = this.state  // 获取请求参数
            const {data: {data, code, msg}} = await getOrderList(params)
            if (code !== '1') return message.error(msg);
            let dataS = { // 拼接表格数据格式
                list: data.items,
                pagination: {
                    current: data.currentPage,
                    pageSize: data.pageSize,
                    total: data.totalCount,
                    totalPage: data.totalPage,
                },
            };
            this.setState({PendingOrderList: dataS})
        } catch (error) {
            console.log('err', error)
        }
    }

    // 跳转
    hrefFun = (x, state) => {
        // alert('userId=' + this.state.userId);
        this.props.history.push({
            pathname: `/${x}`,
            search: `id=${state.orderNo}&userId=` + this.state.userId,
            state
        })
    }


    render() {
        const {PendingOrderList} = this.state
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'orderNo',
                key: 'orderNo',
                render: text => {
                    if (text || text === 0) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '订单类型',
                dataIndex: 'orderCategory',
                key: 'orderCategory',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '供应商编码',
                dataIndex: 'supplierCode',
                key: 'supplierCode',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '供应商名称',
                dataIndex: 'supplierName',
                key: 'supplierName',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '联系人',
                dataIndex: 'supplierLinkman',
                key: 'supplierLinkman',
                render: text => {
                    if (text) {
                        return <div>{text}</div>;
                    } else {
                        return <div>--</div>;
                    }
                },
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                render: (text, record) => {
                    return (
                        <Fragment>
                            <div style={{display: 'flex'}}>
                                <p
                                    style={{cursor: 'pointer', color: '#1890ff', margin: 0}}
                                    onClick={() => {
                                        this.hrefFun('detail', record)
                                    }}
                                >
                                    查看详情
                                </p>
                            </div>
                        </Fragment>
                    );
                }
            }
        ];

        return (
            <Card
                bordered={false}
                style={{position: 'relative'}}
                title={'待提交审批采购订单列表'}
                headStyle={{textAlign: 'center'}}
            >
                <div className={styles.tableList}>
                    <StandardTable
                        data={PendingOrderList}
                        columns={columns}
                        onChange={this.handleStandardTableChange}
                        // showPagination={false}
                    />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        left: '30px',
                        bottom: `${PendingOrderList.pagination.total > 0 ? '50px' : '2px'}`,
                    }}
                >
                    一共{PendingOrderList.pagination.total || 0}条
                </div>
            </Card>
        );
    }
}

export default PendingOrder;
