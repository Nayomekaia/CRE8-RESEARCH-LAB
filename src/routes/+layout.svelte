<script>
	import { onNavigate } from '$app/navigation';
	
	import Nav from '$lib/components/Organisms/Nav.svelte';
	import Footer from '$lib/components/Organisms/Footer.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<section>
	<header>
		<Nav />
	</header>

	{@render children()}

	<Footer />
</section>

<style>
	:global(::view-transition-old(root)) {
		animation: page-out 0.22s ease both;
	}

	:global(::view-transition-new(root)) {
		animation: page-in 0.38s ease both;
	}

	section {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
		height: 100dvh;
		overflow: hidden;
		background: var(--color-background);
		color: var(--color-text);
	}

	header {
		flex: 0 0 auto;
		width: 100%;
	}

	@keyframes page-out {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	@keyframes page-in {
		from {
			opacity: 0;
			transform: translateY(0.1rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(::view-transition-old(root)),
		:global(::view-transition-new(root)) {
			animation: none;
		}
	}
</style>