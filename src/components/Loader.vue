<template> <!--кружок загрузки. глобальный компонент-->
  <div class="app-loader">
		<div class="preloader-wrapper active">
      <div class="spinner-layer" :class="color">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
		},
		computed: {
			color() {
				const color = ['spinner-red-only', 'spinner-blue-only', 'spinner-green-only']
				return color[Math.floor(Math.random() * 3)] // рандомный цвет
			}
		}
  }
</script>

<style scoped>
</style>