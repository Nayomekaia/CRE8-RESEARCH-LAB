<footer class="site-footer">
	<nav aria-label="Footer navigation">
		<ul class="footer-links">
			<li>
				<a href="/">CRE8 Studios website</a>
			</li>

			<li>
				<address>
					<a href="mailto:Info@cre8studios.nl">Info@cre8studios.nl</a>
				</address>
			</li>

			<li>
				<a href="/archive">Take a look around</a>
			</li>
		</ul>
	</nav>
</footer>

<style>
	.site-footer {
		flex: 0 0 auto;
		width: 100%;
		padding: 1rem;
		color: var(--color-text);
		text-transform: uppercase;
		font-size: var(--font-size-lg);
		letter-spacing: var(--letter-spacing-sm);
		box-sizing: border-box;
	}

	.site-footer nav {
		width: 100%;
	}

	.footer-links {
		display: grid;
		grid-template-columns: 1fr;
		gap: 0.65rem;
		width: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.footer-links li {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		min-width: 0;
		text-align: left;
	}

	.footer-links a {
		color: inherit;
		text-decoration: none;
		white-space: normal;
	}

	.footer-links a:hover {
		text-decoration: underline;
		text-underline-offset: 0.25rem;
	}

	address {
		font-style: normal;
	}

	@media (min-width: 700px) {
		.site-footer {
			padding: 2rem;
			font-size: var(--font-size-md);
		}

		.footer-links {
			grid-template-columns: 1fr auto 1fr;
			align-items: center;
			gap: 1rem;
		}

		.footer-links li:nth-child(1) {
			justify-content: flex-start;
			text-align: left;
		}

		.footer-links li:nth-child(2) {
			justify-content: center;
			text-align: center;
		}

		.footer-links li:nth-child(3) {
			justify-content: flex-end;
			text-align: right;
		}

		.footer-links a {
			white-space: nowrap;
		}
	}

	@media (min-width: 1000px) {
		.site-footer {
			padding: 2rem 3rem;
			font-size: var(--font-size-lg);
		}
	}
</style>