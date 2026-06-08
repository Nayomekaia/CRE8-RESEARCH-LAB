<script>
	import Dot from '$lib/components/Organisms/Dot.svelte';
</script>

<main class="home-page">
	<Dot />
</main>

<style>
	.home-page {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 1rem;
		box-sizing: border-box;
	}

	@media (min-width: 700px) {
		.home-page {
			padding: 2rem;
		}
	}

	@media (min-width: 1000px) {
		.home-page {
			padding: 2rem 3rem;
		}
	}
</style>