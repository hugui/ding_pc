import axios from 'axios';

const api = 'http://msding.vaiwan.com'

const APIUtils = {
    base: api,
    jsonBaseUrl: api,
    XML2jsobj: function (node) {
        var data = {};

        // append a value
        function Add(name, value) {
            if (data[name]) {
                if (data[name].constructor !== Array) {
                    data[name] = [data[name]];
                }
                data[name][data[name].length] = value;
            } else {
                data[name] = value;
            }
        }

        // element attributes
        var c, cn;
        if (node.attributes) {
            for (c = 0; cn = node.attributes[c]; c++) {
                Add(cn.name, cn.value);
            }
        }

        // child elements
        for (c = 0; cn = node.childNodes[c]; c++) {
            if (cn.nodeType === 1) {
                if (cn.childNodes.length === 1 && cn.firstChild.nodeType === 3) {
                    // text value
                    Add(cn.nodeName, cn.firstChild.nodeValue);
                } else {
                    // sub-object
                    Add(cn.nodeName, this.XML2jsobj(cn));
                }
            }
        }
        return data;
    },
    code: function (d) {
        return d.match(/code="(\d+?)"/g)[0].split('=')[1].replace(/"/g, "")
    },
    /**
     * 公用post请求
     * @param url
     * @param params
     * @returns {Promise.<TResult>}
     */
    commonPost: (url, params) => {
        let time = new Date().getTime()

        if (Object.prototype.toString.call(params) !== '[object Object]') {
            params = {}
        }
        return axios({
            url: APIUtils.base + url,
            method: 'post',
            data: params,
            timeout: 6000,
            headers:
                {
                    'Content-Type': 'application/json'
                },
            dataType: 'json',
            transformRequest: [function (data) {
                data = JSON.stringify(data)
                return data
            }],
        }).then(res => {
            let time1 = new Date().getTime()
            console.log(url + '接口耗时=======' + (time1 - time) / 1000 + '秒')

            return res
        }).catch(error => {
            // if (error.response) {
            //   Toast({
            //     message: `网络连接失败${error.response.status}，请检查您的网络设置并稍后再试`,
            //     position: 'bottom',
            //     duration: 2000
            //   })
            // } else if (error.request) {
            //   Toast({
            //     message: '网络连接失败，请检查您的网络设置并稍后再试',
            //     position: 'bottom',
            //     duration: 2000
            //   })
            // } else {
            //   Toast({
            //     message: '网络连接失败，请检查您的网络设置并稍后再试',
            //     position: 'bottom',
            //     duration: 2000
            //   })
            // }
            console.log(error, '=========')
        })
    },
    /**
     * 公用get请求
     * @param url
     * @returns {Promise.<TResult>}
     */
    commonGet: (url, params, type) => {
        let time = new Date().getTime()

        return axios({
            url: APIUtils.base + url,
            responseType: 'json',
            params: params,
            timeout: 6000,
        }).then(res => {
            let time1 = new Date().getTime()
            console.log(url + '接口耗时=======' + (time1 - time) / 1000 + '秒')

            // console.log(url+'接口返回数据：',APIUtils.XML2jsobj(res.data.documentElement))
            // return APIUtils.XML2jsobj(res.data.documentElement)
            return res;
        }).catch(error => {
            console.log(error)

            // Toast({
            //   message: '网络连接失败，请检查您的网络设置并稍后再试',
            //   position: 'bottom',
            //   duration: 2000
            // })
        })
    },
    jsonGet: (url, type) => {

        return axios({
            url: APIUtils.jsonBaseUrl + url,
            responseType: 'json',
            timeout: 6000,
        }).then(res => {
            console.log(url + '接口返回数据========', res);

            return res;
        }).catch(error => {
            console.log(error);

            // Toast({
            //   message: '网络连接失败，请检查您的网络设置并稍后再试',
            //   position: 'bottom',
            //   duration: 2000
            // })
            return null;
        })
    }
}
export default APIUtils
