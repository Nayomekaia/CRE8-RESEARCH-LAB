<script>
	import logo from '$lib/assets/logo.svg';
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
