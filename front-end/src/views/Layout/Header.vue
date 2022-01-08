<template>
		<!--HEADER-->
		<header id="top-head" class="uk-position-fixed">
			<div class="uk-container uk-container-expand uk-background-primary">
				<nav class="uk-navbar uk-light" data-uk-navbar="mode:click; duration: 250">
					<div class="uk-navbar-left">
						<div class="uk-navbar-item uk-hidden@m">
							<a class="uk-logo" href="#"><img class="custom-logo" src="img/dashboard-logo-white.svg" alt=""></a>
						</div>
					</div>
					<div class="uk-navbar-right">
						<ul class="uk-navbar-nav">
							<li><a href="#" data-uk-icon="icon:user" title="Your profile" data-uk-tooltip></a></li>
							<li><a href="#" data-uk-icon="icon:  sign-out" title="Sign Out" data-uk-tooltip @click="logout"></a></li>
							<li><a class="uk-navbar-toggle" data-uk-toggle data-uk-navbar-toggle-icon href="#offcanvas-nav" title="Offcanvas" data-uk-tooltip></a></li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
		<!--/HEADER-->
</template>

<script>
export default {
	methods: {
			logout() {
				this.$router.push('/logout')
			}
		}
}
</script>

<style>

</style>