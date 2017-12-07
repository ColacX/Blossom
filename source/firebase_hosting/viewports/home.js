angular.module("blossom").component("viewportHome", {
	template: `
<div class="viewport home">
	<div class="maximized scroll-auto">
		<span ui-sref="login">home</span>
		<multi-layer-section></multi-layer-section>
		<complex-section></complex-section>
		<simple-section></simple-section>
		<sigmoid-section></sigmoid-section>
	</div>
</div>
`
});