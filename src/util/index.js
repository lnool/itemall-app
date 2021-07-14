import { Toast } from 'vant'
export * from './pattern'

// 防抖函数
export const debounce = (func, wait) => {
	let timeout = null
	return function () {
		let context = this
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			func.apply(context)
		}, wait)
	}
}

// 提示
export const toast = (message) => {
	Toast({ message })
}


// 存储Token
export const saveToken = (token,user)=>{
	localStorage.setItem('token',token)
	localStorage.setItem('user',JSON.stringify(user))
}

// 获取Token和用户信息
export const queryToken = ()=>{
	return {
		token:localStorage.getItem('token'),
		user:JSON.parse(localStorage.getItem('user'))
	}
}

