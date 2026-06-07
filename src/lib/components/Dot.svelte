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

	function createTextParticles() {
		particles = [];

		const { width, height } = getCanvasSize();
		const responsive = getResponsiveSettings();
		const backgroundColor = getThemeColor('--color-background');
		const layout = getTextLayout();

		pointer.radius = responsive.pointerRadius;

		context.clearRect(0, 0, width, height);
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, width, height);

		drawText(layout);

		const imageData = context.getImageData(0, 0, width, height);
		const pixels = imageData.data;

		for (let y = 0; y < height; y += responsive.gap) {
			for (let x = 0; x < width; x += responsive.gap) {
				const pixelIndex = (y * width + x) * 4;

				if (isTextPixel(pixels, pixelIndex)) {
					particles.push({
						x,
						y,
						baseX: x,
						baseY: y,
						size: responsive.dotSize,
						randomSpread: Math.random() * 6 + 4
					});
				}
			}
		}

		context.clearRect(0, 0, width, height);
	}

	function drawText(layout) {
		const { width } = getCanvasSize();

		context.fillStyle = '#000';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = getFont(layout.fontSize);

		lines.forEach((line, index) => {
			context.fillText(line, width / 2, layout.startY + index * layout.lineStep);
		});
	}

	function isTextPixel(pixels, index) {
		const red = pixels[index];
		const green = pixels[index + 1];
		const blue = pixels[index + 2];
		const alpha = pixels[index + 3];

		return alpha > 100 && red < 80 && green < 80 && blue < 80;
	}

	function animate() {
		const { width, height } = getCanvasSize();
		const backgroundColor = getThemeColor('--color-background');
		const textColor = getThemeColor('--color-text');

		context.clearRect(0, 0, width, height);
		context.fillStyle = backgroundColor;
		context.fillRect(0, 0, width, height);

		particles.forEach((particle) => {
			updateParticlePosition(particle);
			drawParticle(particle, textColor);
		});

		drawLogoInStudiosO();

		animationFrame = requestAnimationFrame(animate);
	}

	function updateParticlePosition(particle) {
		let targetX = particle.baseX;
		let targetY = particle.baseY;

		if (pointer.x !== null && pointer.y !== null) {
			const distanceX = particle.baseX - pointer.x;
			const distanceY = particle.baseY - pointer.y;
			const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

			if (distance < pointer.radius) {
				const force = (pointer.radius - distance) / pointer.radius;
				const angle = Math.atan2(distanceY, distanceX);
				const spread = force * particle.randomSpread * settings.spreadStrength;

				targetX = particle.baseX + Math.cos(angle) * spread;
				targetY = particle.baseY + Math.sin(angle) * spread;
			}
		}

		particle.x += (targetX - particle.x) * settings.returnSpeed;
		particle.y += (targetY - particle.y) * settings.returnSpeed;
	}

	function drawParticle(particle, color) {
		context.beginPath();
		context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
		context.fillStyle = color;
		context.fill();
	}

	function drawLogoInStudiosO() {
		if (!logoImage) return;

		const { width } = getCanvasSize();
		const layout = getTextLayout();

		context.font = getFont(layout.fontSize);
		context.textAlign = 'center';
		context.textBaseline = 'middle';

		const fullLineWidth = context.measureText(lines[0]).width;
		const lineStartX = width / 2 - fullLineWidth / 2;

		const beforeOWidth = context.measureText('CRE8 STUDI').width;
		const oWidth = context.measureText('O').width;

		const { logoSize, logoOffsetY } = getLogoSettings(width, layout.fontSize);

		const oCenterX = lineStartX + beforeOWidth + oWidth / 2;
		const oCenterY = layout.startY + logoOffsetY;

		context.drawImage(
			logoImage,
			oCenterX - logoSize / 2,
			oCenterY - logoSize / 2,
			logoSize,
			logoSize
		);
	}

	function getLogoSettings(width, fontSize) {
		if (width < 430) {
			return {
				logoSize: fontSize * 0.26,
				logoOffsetY: -3
			};
		}

		if (width < 900) {
			return {
				logoSize: fontSize * 0.28,
				logoOffsetY: -5
			};
		}

		return {
			logoSize: fontSize * 0.2,
			logoOffsetY: -9
		};
	}

	function handlePointerMove(event) {
		const rect = canvas.getBoundingClientRect();

		pointer.x = event.clientX - rect.left;
		pointer.y = event.clientY - rect.top;
	}

	function handlePointerLeave() {
		pointer.x = null;
		pointer.y = null;
	}
</script>

<section class="dotted-word-section" aria-labelledby="dotted-word-title">
	<h1 id="dotted-word-title" class="visually-hidden">CRE8 Studios Research Lab</h1>

	<canvas
		bind:this={canvas}
		onpointermove={handlePointerMove}
		onpointerleave={handlePointerLeave}
	></canvas>
</section>

<style>
</style>