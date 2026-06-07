<script>
	import { page } from '$app/state';
	import logo from '$lib/assets/logo.svg';

	const pathname = $derived(page.url.pathname);

	function isActive(path) {
		if (path === '/') {
			return pathname === '/';
		}

		return pathname.startsWith(path);
	}
</script>

<nav>
	<ul>
		<li>
			<a href="/" class="logo">
				<img src={logo} alt="CRE8 Studios logo" />
			</a>
		</li>

		<li>
			<a href="/archive" class:active={isActive('/archive')}>Archive</a>
		</li>

		<li>
			<a href="/information" class:active={isActive('/information')}>Information</a>
		</li>
	</ul>
</nav>

<style>
	nav {
		width: 100%;
		background: var(--color-background);
		padding: 1.25rem 1rem;
		box-sizing: border-box;
	}

	nav ul {
		list-style: none;
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin: 0;
		padding: 0;
		gap: 3rem;
	}

	nav li {
		display: flex;
		align-items: center;
		text-transform: uppercase;
		font-size: 0.85rem;
		line-height: 1;
	}

	nav a {
		position: relative;
		color: var(--color-neutral-900);
		text-decoration: none;
	}

	nav a:not(.logo)::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: -0.25rem;
		width: 100%;
		height: 1px;
		background: var(--color-neutral-900);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.2s ease;
	}

	nav a:not(.logo):hover::after,
	nav a:not(.logo).active::after {
		transform: scaleX(1);
	}

	.logo {
		display: flex;
		align-items: center;
		line-height: 0;
		width: auto;
		height: auto;
		flex: 0 0 auto;
	}

	img {
		display: block;
		width: 1.6rem;
		height: auto;
		max-width: none;
	}

