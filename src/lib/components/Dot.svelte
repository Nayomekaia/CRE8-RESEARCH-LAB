<script>
	import { onMount } from 'svelte';
	import logoSvg from '$lib/assets/logo.svg';

	let canvas;
	let context;
	let animationFrame;
	let logoImage;
	let particles = [];

	const lines = ['CRE8 STUDIOS', 'RESEARCH LAB'];

	const pointer = {
		x: null,
		y: null,
		radius: 120
	};

	const settings = {
		dotSize: 1.55,
		gap: 6,
		fontFamily: 'Georgia, "Times New Roman", serif',
		fontWeight: 400,
		lineHeight: 1,
		paddingX: 70,
		paddingY: 50,
		spreadStrength: 10,
		returnSpeed: 0.18
	};

	onMount(() => {
		context = canvas.getContext('2d');

		loadLogo();
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			cancelAnimationFrame(animationFrame);
		};
	});

	function loadLogo() {
		logoImage = new Image();
		logoImage.src = logoSvg;

		logoImage.onload = () => {
			resizeCanvas();
			createTextParticles();
			animate();
		};
	}

	function handleResize() {
		resizeCanvas();
		createTextParticles();
	}

	function resizeCanvas() {
		const parent = canvas.parentElement;
		const rect = parent.getBoundingClientRect();
		const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

		canvas.width = Math.floor(rect.width * pixelRatio);
		canvas.height = Math.floor(rect.height * pixelRatio);

		canvas.style.width = `${rect.width}px`;
		canvas.style.height = `${rect.height}px`;

		context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
	}

	function getCanvasSize() {
		return {
			width: canvas.clientWidth,
			height: canvas.clientHeight
		};
	}

	function getThemeColor(name) {
		return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
	}
	<canvas
		bind:this={canvas}
		onpointermove={handlePointerMove}
		onpointerleave={handlePointerLeave}
	></canvas>
</section>
<style>
</style>