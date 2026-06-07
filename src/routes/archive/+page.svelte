	@media (min-width: 700px) {
		.archive-page {
			grid-template-columns: 17rem 1fr;
		}

		.archive-sidebar {
			height: 100%;
			padding: 4rem 2.8rem;
			border-right: 1px solid var(--neutral-200);
			border-bottom: 0;
			overflow: visible;
		}

		.filter-block {
			max-width: 14rem;
		}

		.filter-block::before,
		.filter-block::after {
			display: none;
		}

		.filter-label {
			margin: 0 0 0.25rem;
			font-size: 0.65rem;
			letter-spacing: 0.08em;
		}

		.archive-sidebar h2 {
			display: block;
			margin: 0 0 1rem;
			text-transform: uppercase;
			font-size: 0.95rem;
			font-weight: 500;
			letter-spacing: 0.08em;
		}

		.filter-nav {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			gap: 0.7rem;
			overflow: visible;
			padding: 0;
			scroll-snap-type: none;
		}

		.filter-nav a {
			min-height: 0;
			padding: 0;
			border: 0;
			border-radius: 0;
			background: transparent;
			color: rgba(0, 0, 0, 0.55);
			text-transform: none;
			font-size: 0.75rem;
			letter-spacing: 0.04em;
			gap: 0.8rem;
		}

		.filter-nav a::before {
			content: '';
			display: block;
			width: 0.3rem;
			height: 0.3rem;
			border-radius: 50%;
			background: currentColor;
			opacity: 0;
			transform: scale(0.4);
			transition:
				opacity 0.2s ease,
				transform 0.2s ease;
		}

		.filter-nav a:hover,
		.filter-nav a.active {
			color: #151515;
			background: transparent;
			text-decoration: underline;
			text-underline-offset: 0.18rem;
		}

		.filter-nav a.active::before {
			opacity: 1;
			transform: scale(1);
		}

		.archive-content {
			padding: 1rem 1.7rem 5rem;
		}

		.archive-header {
			margin: -1rem -1.7rem 1.25rem;
			padding: 1rem 1.7rem;
		}
	}

	@media (min-width: 1000px) {
		.archive-page {
			grid-template-columns: 18rem 1fr;
		}

		.archive-content {
			padding-right: 2.4rem;
			padding-left: 1.7rem;
		}

		.archive-header {
			margin-right: -2.4rem;
			margin-left: -1.7rem;
			padding-right: 2.4rem;
			padding-left: 1.7rem;
		}
	}

	@media (min-width: 1400px) {
		.archive-page {
			grid-template-columns: 20rem 1fr;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.project-item,
		.project-column-reverse {
			opacity: 1;
			filter: none;
			transform: none;
			animation: none;
		}
	}
</style>
