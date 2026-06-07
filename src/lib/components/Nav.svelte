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
