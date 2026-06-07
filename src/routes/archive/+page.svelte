<style>
	:global(body) {
		background: #fffaf0;
		color: #151515;
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.archive-page {
		display: grid;
		grid-template-columns: 1fr;
		height: 100dvh;
		min-height: 0;
		overflow: hidden;
		background: #fffaf0;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.archive-sidebar {
		z-index: 5;
		background: #fffaf0;
		padding: 1rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		overflow: hidden;
	}

	.filter-block {
		position: relative;
		max-width: none;
	}

	.filter-block::before,
	.filter-block::after {
		content: '';
		position: absolute;
		top: 0;
		z-index: 2;
		width: 3.5rem;
		height: 100%;
		pointer-events: none;
	}

	.filter-block::before {
		left: 0;
		background: linear-gradient(to right, #fffaf0 20%, rgba(255, 250, 240, 0));
	}

	.filter-block::after {
		right: 0;
		background: linear-gradient(to left, #fffaf0 20%, rgba(255, 250, 240, 0));
	}

	.filter-label {
		margin: 0 1.8rem 0.7rem;
		text-transform: uppercase;
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		color: rgba(0, 0, 0, 0.45);
	}

	.archive-sidebar h2 {
		display: none;
	}

	.filter-nav {
		position: relative;
		z-index: 1;
		display: flex;
		gap: 0.5rem;
		overflow-x: auto;
		overflow-y: hidden;
		padding: 0 1.8rem 0.25rem;
		scrollbar-width: none;
		-webkit-overflow-scrolling: touch;
		scroll-snap-type: x proximity;
	}

	.filter-nav::-webkit-scrollbar {
		display: none;
	}

	.filter-nav a {
		flex: 0 0 auto;
		scroll-snap-align: start;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2rem;
		padding: 0.45rem 0.85rem;
		border: 1px solid rgba(0, 0, 0, 0.16);
		border-radius: 999rem;
		color: rgba(0, 0, 0, 0.55);
		text-decoration: none;
		text-transform: uppercase;
		font-size: 0.62rem;
		letter-spacing: 0.08em;
		line-height: 1;
		white-space: nowrap;
		transition:
			color 0.2s ease,
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.filter-nav a::before {
		display: none;
	}

	.filter-nav a:hover,
	.filter-nav a.active {
		color: var(--background);
		background: #151515;
		border-color: #151515;
		text-decoration: none;
	}

	.archive-content {
		container-type: inline-size;
		height: 100%;
		min-height: 0;
		overflow-y: auto;
		padding: 1rem 1.25rem 4rem;
		scroll-timeline-name: --archive-scroll;
		scroll-timeline-axis: block;
	}

	.archive-header {
		position: sticky;
		top: -18px;
		z-index: 4;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin: -1rem -1.25rem 1.25rem;
		padding: 1rem 1.25rem;
		background: rgba(255, 250, 240, 0.92);
		backdrop-filter: blur(0.8rem);
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	.archive-header p {
		margin: 0;
		text-transform: uppercase;
		font-size: 0.7rem;
		letter-spacing: 0.12em;
		color: rgba(0, 0, 0, 0.45);
	}

	.sort {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		text-transform: uppercase;
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		color: rgba(0, 0, 0, 0.45);
	}

	.sort select {
		border: 0;
		background: transparent;
		text-transform: uppercase;
		font-size: 0.7rem;
		letter-spacing: 0.08em;
		color: #151515;
		cursor: pointer;
	}

	.project-grid,
	.project-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.project-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1.25rem;
	}

	.project-column {
		display: contents;
	}

	.project-list {
		display: contents;
	}

	.project-item {
		opacity: 0;
		transform: translateY(2rem);
		animation: card-in 1.25s cubic-bezier(0.22, 1, 0.36, 1) forwards;
		animation-delay: var(--delay);
	}

	.project-link {
		display: block;
		color: inherit;
		text-decoration: none;
	}

	.project-card figure {
		margin: 0;
	}

	.project-card img {
		display: block;
		width: 100%;
		border-radius: 0.2rem;
		object-fit: cover;
		background: #e8e0d2;
		transition:
			transform 0.35s ease,
			opacity 0.35s ease;
	}

	.project-link:hover img {
		transform: scale(0.985);
		opacity: 0.88;
	}

	.project-meta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		margin-top: 0.55rem;
	}

	.project-meta p,
	.project-meta time {
		margin: 0;
		text-transform: uppercase;
		font-size: 0.55rem;
		letter-spacing: 0.08em;
		color: rgba(0, 0, 0, 0.55);
	}

	.project-card h2 {
		margin: 0.25rem 0 0;
		text-transform: uppercase;
		font-size: 0.7rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		line-height: 1.2;
	}

	.empty-message {
		margin: 3rem 0 0;
		font-size: 0.85rem;
		color: rgba(0, 0, 0, 0.5);
	}

	@keyframes card-in {
		from {
			opacity: 0;
			transform: translateY(2rem);
			filter: blur(0.3rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	@keyframes reverse-scroll {
		from {
			transform: translateY(calc(-100% + 100vh));
		}

		to {
			transform: translateY(calc(100% - 100vh));
		}
	}

	@container (min-width: 34rem) {
		.project-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.5rem;
		}
	}

	@container (min-width: 62rem) {
		.project-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.7rem;
			overflow: hidden;
		}

		.project-column {
			display: flex;
			flex-direction: column;
			gap: 1.7rem;
		}

		.project-list {
			display: flex;
			flex-direction: column;
			gap: 1.7rem;
		}

		.project-column-reverse .project-list {
			flex-direction: column-reverse;
		}

		@supports (animation-timeline: scroll()) {
			.project-column-reverse {
				transform: translateY(calc(-100% + 100vh));
				animation: reverse-scroll linear forwards;
				animation-timeline: --archive-scroll;
			}
		}
	}

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
