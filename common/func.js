const install = (Vue, vm) => {
	
	//有没有登录
	let isLogin = function(){
		if (uni.getStorageSync('token') == "") {
			return false
		}else{
			return true
		}
	}
	
	let showJoinGroupPop = function(){
		let now = new Date().getTime()
		let setTime = 0
		if (uni.getStorageSync('show_join_group_pop') != ""){
			setTime = uni.getStorageSync('show_join_group_pop')
			//表示已经长按加入，不再弹窗
			if (setTime == -1) {
				return false
			}
		}
		//超过600秒，弹窗一次
		if (now - setTime >  600000) {
			uni.setStorageSync('show_join_group_pop', now)
			return true
		}else{
			return false
		}
	}
	
	

	// 将各个定义的接口名称，统一放进对象挂载到vm.$u.api(因为vm就是this，也即this.$u.api)下
	vm.$u.func = {
		isLogin,
		showJoinGroupPop
	};
}

export default {
	install
}