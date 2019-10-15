import Loadable from 'react-loadable'
import DelayLoading from '../components/DelayLoading'

export const PendingOrder = Loadable({ loader: () => import('../pages/PendingOrder.js'), loading: DelayLoading, delay: 3000 });
export const OrderDetail = Loadable({ loader: () => import('../pages/OrderDetail.js'), loading: DelayLoading, delay: 3000 });
