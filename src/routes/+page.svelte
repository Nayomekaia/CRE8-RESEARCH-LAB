<script>
	import Dot from '$lib/components/Organisms/Dot.svelte';
</script>

<main>
	<Dot />
</main>

<style>
	main {
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		padding: 1rem;
		box-sizing: border-box;
	}

	@media (min-width: 768px) {
		main {
			padding: 2rem;
		}
	}

	@media (min-width: 1024px) {
		main {
			padding: 2rem 3rem;
		}
	}
</style>