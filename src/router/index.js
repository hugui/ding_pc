import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

// 按需加载路由
import {
	// Searchs,
	PendingOrder,
	OrderDetail
} from './routers'

@withRouter
class Routers extends Component {
	constructor(props) {
		super(props)
		// console.log(pathname, 'pathname')
		this.state = {
			historyTitle: {
				'/': '首页',
				'/detail': '详情'
			}
		}
		this.HandleHistoryChange()
	}

	HandleHistoryChange() {
		const { historyTitle } = this.state
		document.title = historyTitle[this.props.location.pathname] || ''
		this.props.history.listen((location) => {
			document.title = historyTitle[location.pathname] || ''
		})
	}

	render() {
		return (
			<Switch>
				<Route path="/" component={PendingOrder} exact />
				<Route path="/detail" component={OrderDetail} />
			</Switch>
		)
	}
}

export default Routers