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

	function getResponsiveSettings() {
		const { width } = getCanvasSize();

		if (width < 390) {
			return {
				dotSize: 0.7,
				gap: 2.5,
				pointerRadius: 45,
				paddingX: 14,
				paddingY: 18
			};
		}

		if (width < 600) {
			return {
				dotSize: 0.85,
				gap: 3,
				pointerRadius: 55,
				paddingX: 20,
				paddingY: 22
			};
		}

		if (width < 900) {
			return {
				dotSize: 1.05,
				gap: 4,
				pointerRadius: 70,
				paddingX: 34,
				paddingY: 30
			};
		}

		return {
			dotSize: settings.dotSize,
			gap: settings.gap,
			pointerRadius: pointer.radius,
			paddingX: settings.paddingX,
			paddingY: settings.paddingY
		};
	}

	function getBaseFontSize(width) {
		if (width < 370) return 42;
		if (width < 430) return 48;
		if (width < 600) return 58;
		if (width < 700) return 72;
		if (width < 900) return 100;
		if (width < 1200) return 125;
		if (width < 1400) return 150;

		return 185;
	}

	function getResponsiveFontSize() {
		const { width, height } = getCanvasSize();
		const responsive = getResponsiveSettings();

		const maxTextWidth = width - responsive.paddingX * 2;
		const maxTextHeight = height - responsive.paddingY * 2;

		let fontSize = getBaseFontSize(width);

		context.font = getFont(fontSize);

		let longestLineWidth = getLongestLineWidth();
		let blockHeight = getTextBlockHeight(fontSize);

		while ((longestLineWidth > maxTextWidth || blockHeight > maxTextHeight) && fontSize > 20) {
			fontSize -= 2;

			context.font = getFont(fontSize);
			longestLineWidth = getLongestLineWidth();
			blockHeight = getTextBlockHeight(fontSize);
		}

		return fontSize;
	}

	function getFont(fontSize) {
		return `${settings.fontWeight} ${fontSize}px ${settings.fontFamily}`;
	}

	function getLongestLineWidth() {
		return Math.max(...lines.map((line) => context.measureText(line).width));
	}

	function getTextBlockHeight(fontSize) {
		const lineStep = fontSize * settings.lineHeight;
		return fontSize + (lines.length - 1) * lineStep;
	}

	function getTextLayout() {
		const { width, height } = getCanvasSize();

		const fontSize = getResponsiveFontSize();
		const lineStep = fontSize * settings.lineHeight;
		const blockHeight = getTextBlockHeight(fontSize);
		const offsetY = width < 900 ? 0 : -20;
		const startY = (height - blockHeight) / 2 + fontSize / 2 + offsetY;

		return {
			fontSize,
			lineStep,
			startY
		};
	}

	<canvas
		bind:this={canvas}
		onpointermove={handlePointerMove}
		onpointerleave={handlePointerLeave}
	></canvas>
</section>
<style>
</style>