<script>
	import { onMount } from 'svelte';
	import logoSvg from '$lib/assets/logo.svg';

	let canvas;
	let ctx;
	let animationFrame;
	let particles = [];
	let logoImage;
	let prefersReducedMotion = false;

	const lines = ['CRE8 STUDIOS', 'RESEARCH LAB'];

	const settings = {
		background: '#fffaf0',
		dotColor: '#050505',

		dotSize: 1.55,
		gap: 6,

		fontFamily: 'Georgia, "Times New Roman", serif',
		fontWeight: 400,
		lineHeight: 1,

		paddingX: 70,
		paddingY: 50,

		spreadStrength: 15,
		returnSpeed: 0.18
	};

</script>
<section class="dotted-word-section">
</section>
<style>
</style>
