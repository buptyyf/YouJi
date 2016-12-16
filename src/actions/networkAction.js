import {
    NativeAppEventEmitter,
    NativeModules
} from 'react-native'
import config from '../config'


export class NetworkAction {
    async promiseNetwork(baseData , paramData = {}) {
        return new Promise(async (resolve, reject) => {
            try {
                paramData = Object.assign({oauth_token: config.oauth_token}, paramData);
                let params = paramData;
                console.log(params);
                const input = this.param(params);
                console.log(input);
                const method = (baseData.method || 'GET').toUpperCase();
                const useBody = method === 'POST' || method === 'PUT';
                let url = `${config.baseUrl}` +
                    (config.baseUrl.endsWith('/') ? '' : '/') +
                    `${baseData.url}`;
                useBody || (url = this.appendQuery(url, input));
                console.log(url);
                let res = await fetch(url, {
                    method: baseData.method,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Cookie': '',
                        'User-Agent': ''
                    },
                    body: useBody ? input : null,
                    //credentials: 'include'
                })
                if(res.status < 200 || res.status > 299) {
                    throw new Error(res.status + '');
                }
                if(res) {
                    let data = await res.json();
                    resolve(data);
                } else {
                    resolve(null);
                }
                //console.log(data);
            } catch(error) {
                console.log(error);
                reject(error);
            }
        })
    }
    param(query, scope = '') {
        let key
        let value
        let out = ''
        Object.keys(query).forEach((name) => {
            key = scope ? `${scope}[${name}]` : name
            value = query[name]
            if (value === undefined) return
            value === null && (value = '')
            if (typeof value === 'object') {
                out += this.param(value, key)
            } else {
                out += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            }
        })
        return scope ? out : out.substr(1)
    }

    appendQuery(link, query) {
        return query ? (link + '&' + query).replace(/[&?]+/, '?') : link
    }
}