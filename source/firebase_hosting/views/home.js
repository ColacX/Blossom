angular.module("blossom").component("viewHome", {
	template: `
<div class="view home maximized scroll-auto">
	<span v-link="#home">to login</span>
	<multi-layer-section></multi-layer-section>
	<complex-section></complex-section>
	<simple-section></simple-section>
	<sigmoid-section></sigmoid-section>
</div>
`
});