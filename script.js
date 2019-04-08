var timer = new Vue({
	el: '#countDownTimer',
	data() {
		return {
			weddingDay: new Date(2019, 8, 7, 13).getTime(),
			now: Date.now()
		}
	},
	created() {
		setInterval(() => {
			this.now = Date.now()
		}, 1000)
	},
	computed: {
		time() {
			const delta = this.weddingDay - this.now
			return {
				seconds: Math.floor((delta / 1000) % 60) + 1,
				minutes: Math.floor((delta / 1000 / 60) % 60) + 1,
				hours: Math.floor((delta / (1000 * 60 * 60)) % 24) + 1,
				days: Math.floor(delta / (1000 * 60 * 60 * 24)) + 1
			}
		}
	}
})
