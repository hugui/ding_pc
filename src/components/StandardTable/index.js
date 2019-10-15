import React, { PureComponent } from 'react';
import { Table } from 'antd';
import styles from './index.less';

function initTotalList(columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor(props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);
    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    onChange(pagination, filters, sorter);
  };

  render() {
    const {
      data: { list, pagination },
      loading,
      columns,
      // rowKey,
      scrollX,
      rowSelection,
      showPagination = true
    } = this.props;

    const paginationProps = {
      showQuickJumper: true,
      pageSizeOptions: ['10', '30', '50'],
      ...pagination,
    };

    return (
      <div className={styles.standardTable}>
        <Table
          loading={loading}
          rowKey={(e, index) => index}
          dataSource={list}
          scroll={{ x: scrollX }}
          columns={columns}
          pagination={showPagination ? paginationProps : false}
          onChange={this.handleTableChange}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}

export default StandardTable;
