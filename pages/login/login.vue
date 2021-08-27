<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎登录</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="tips">登录后不会获取您的任何私人信息，只用于同步在程序内收藏的表情数据，防止丢失。</view>
			<button @click="goWxLogin" open-type="getUserInfo" class="getCaptcha">点击授权登录</button>
			<u-modal v-model="showUserProfileToash" content="登录成功,开启个性化推荐功能？"  :show-cancel-button="true" confirm-text="允许" @confirm="userProfile" @cancel="goBack"></u-modal>
			<!-- #endif -->
			
			<!-- #ifndef MP-WEIXIN -->
			<input class="u-border-bottom" type="number" v-model="tel" placeholder="请输入手机号" />
			<view class="tips u-margin-top-10">未注册的手机号验证后自动创建账号</view>
			<button @click="goPhoneLogin"  class="getCaptcha">点击登录</button>
			<!-- #endif -->
			
		</view>
		<view class="buttom">
			<view class="hint u-text-center">
				表情包数据来自于互联网，版权归原作者所有。
				<view>本站不存储表情图资源，表情图请勿商用。</view>
				<view>如有侵犯您权利的资源，请联系我们处理。</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tel: '',
				showUserProfileToash:false,
			}
		},
		onLoad() {
			
		},
		methods: {
			goPhoneLogin(){
				this.$u.toast("开发中...")
			},
			goBack(){
				uni.navigateBack()
			},
			userProfile(){
				let that = this
				// 获取用户信息
				uni.getUserProfile({
				  provider: 'weixin',
				  desc:"开启个性化推荐功能",
				  success: function (infoRes) {
					console.log(infoRes);
					that.$u.api.accountWxUserProfileApi(infoRes).then(res=>{
						console.log(res)
						//返回上一页
						uni.showToast({
							icon:"success",
						    title: '登录成功',
						    duration: 4000,
							complete:(function(res){
								uni.navigateBack()
							})
						})
					})
				  },
				  fail: function (infoRes) {
				  	uni.navigateBack()
				  }
				});
			},
			goWxLogin() {
				let that = this
			    // 获取code 小程序专有，用户登录凭证。
				uni.login({
					provider: 'weixin',
					success(login) {
						that.$u.api.accountWxLoginApi({"appid":"wxde1ba3474c3e6c2a","code":login.code}).then(res => {
							uni.setStorageSync('token', res.token)
							if (res.is_new_user) {
								that.showUserProfileToash = true
							}else{
								//返回上一页
								uni.showToast({
									icon:"success",
								    title: res.user.nickname+' 欢迎回来~',
								    duration: 4000,
									complete:(function(res){
										uni.navigateBack()
									})
								})
							}
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;
	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}
		.getCaptcha {
			background-color: #19BE6B;
			color: #fff;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;
			
			&::after {
				border: none;
			}
		}
		
	}
	.buttom {
		margin-top: 80%;
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>

