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

	const mouse = {
		x: null,
		y: null,
		radius: 120
	};

	const responsiveSteps = [
		{
			maxWidth: 480,
			dotSize: 0.75,
			gap: 3,
			mouseRadius: 50,
			paddingX: 16,
			paddingY: 20,
			fontSize: 46,
			logoOffsetY: -3,
			logoScale: 0.26,
			textOffsetY: 0
		},
		{
			maxWidth: 768,
			dotSize: 1,
			gap: 4,
			mouseRadius: 70,
			paddingX: 32,
			paddingY: 30,
			fontSize: 80,
			logoOffsetY: -5,
			logoScale: 0.28,
			textOffsetY: 0
		},
		{
			maxWidth: 1024,
			dotSize: 1.2,
			gap: 5,
			mouseRadius: 90,
			paddingX: 50,
			paddingY: 40,
			fontSize: 115,
			logoOffsetY: -7,
			logoScale: 0.24,
			textOffsetY: -10
		},
		{
			maxWidth: 1280,
			dotSize: settings.dotSize,
			gap: settings.gap,
			mouseRadius: mouse.radius,
			paddingX: settings.paddingX,
			paddingY: settings.paddingY,
			fontSize: 145,
			logoOffsetY: -9,
			logoScale: 0.2,
			textOffsetY: -20
		}
	];

	onMount(() => {
		ctx = canvas.getContext('2d');

		const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		prefersReducedMotion = motionQuery.matches;

		logoImage = new Image();
		logoImage.src = logoSvg;

		logoImage.onload = () => {
			resizeCanvas();
			createTextParticles();

			if (prefersReducedMotion) {
				drawStaticFrame();
			} else {
				animate();
			}
		};

		window.addEventListener('resize', handleResize);
		motionQuery.addEventListener('change', handleMotionPreferenceChange);

		return () => {
			window.removeEventListener('resize', handleResize);
			motionQuery.removeEventListener('change', handleMotionPreferenceChange);
			cancelAnimationFrame(animationFrame);
		};
	});

	function handleResize() {
		resizeCanvas();
		createTextParticles();

		if (prefersReducedMotion) {
			drawStaticFrame();
		}
	}

	function handleMotionPreferenceChange(event) {
		prefersReducedMotion = event.matches;
		cancelAnimationFrame(animationFrame);

		if (prefersReducedMotion) {
			drawStaticFrame();
		} else {
			animate();
		}
	}

</script>
<section class="dotted-word-section">
</section>
<style>
</style>
