<script>
	let { data } = $props();

	const selectedTag = $derived(data.selectedTag ?? '');
	const projects = $derived(data.projects ?? []);
	const tags = $derived(data.tags ?? []);
	const projectColumns = $derived(createProjectColumns(projects));

	function createProjectColumns(projects, columnAmount = 3) {
		return Array.from({ length: columnAmount }, (_, columnIndex) =>
			projects.filter((_, projectIndex) => projectIndex % columnAmount === columnIndex)
		);
	}

	function getFilterUrl(tagSlug = '') {
		return tagSlug ? `/archive?tag=${tagSlug}` : '/archive';
	}

	function getProjectUrl(project) {
		if (!project.tags?.slug || !project.slug) {
			return '/archive';
		}

		const projectUrl = `/archive/${project.tags.slug}/${project.slug}`;

		return selectedTag ? `${projectUrl}?returnTag=${selectedTag}` : projectUrl;
	}

	function formatYear(date) {
		return date ? new Date(date).getFullYear() : '';
	}
</script>

<main class="archive-page">
	<aside class="archive-sidebar">
		<section class="filter-block" aria-labelledby="filter-title">
			<p class="filter-label">Filter</p>
			<h2 id="filter-title">Category</h2>

			<nav class="filter-nav">
				<a
					href="/archive"
					class="filter-link"
					class:active={selectedTag === ''}
					aria-current={selectedTag === '' ? 'page' : undefined}
				>
					View all
				</a>

				{#each tags as tag}
					<a
						href={getFilterUrl(tag.slug)}
						class="filter-link"
						class:active={selectedTag === tag.slug}
						aria-current={selectedTag === tag.slug ? 'page' : undefined}
					>
						{tag.name}
					</a>
				{/each}
			</nav>
		</section>
	</aside>

	<section class="archive-content" aria-labelledby="archive-title">
		<header class="archive-header">
			<h1 id="archive-title" class="visually-hidden">Project archive</h1>

			<p class="project-count">
				{projects.length}
				project{projects.length === 1 ? '' : 's'}
			</p>

			<form class="sort" aria-label="Sort projects">
				<label for="project-sort">Sort by</label>

				<select id="project-sort" name="sort">
					<option value="newest">Newest</option>
					<option value="oldest">Oldest</option>
				</select>
			</form>
		</header>

		{#if projects.length > 0}
			{#key selectedTag}
				<ul class="project-grid" aria-label="Projects">
					{#each projectColumns as columnProjects, columnIndex}
						<li class="project-column" class:project-column-reverse={columnIndex !== 1}>
							<ul class="project-list">
								{#each columnProjects as project, index}
									<li class="project-item" style={`--delay: ${index * 140}ms`}>
										<article class="project-card">
											<a href={getProjectUrl(project)} class="project-link">
												{#if project.preview_image}
													<figure class="project-image">
														<img src={project.preview_image} alt={project.title} />
													</figure>
												{/if}

												<footer class="project-meta">
													{#if project.tags}
														<p>{project.tags.name}</p>
													{/if}

													{#if project.published_at}
														<time datetime={project.published_at}>
															{formatYear(project.published_at)}
														</time>
													{/if}
												</footer>

												<h2>{project.title}</h2>
											</a>
										</article>
									</li>
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			{/key}
		{:else}
			<p class="empty-message">No projects found.</p>
		{/if}
	</section>
</main>

<style>
	:global(body) {
		background: var(--color-background);
		color: var(--color-text);
	}

	.archive-page {
		--archive-sidebar-width: 17rem;
		--archive-content-padding-x: 1.25rem;
		--archive-content-padding-bottom: 4rem;
		--archive-grid-gap: 1.25rem;
		--archive-border: 1px solid var(--color-border);
		--archive-filter-padding-x: 1.8rem;

		display: grid;
		grid-template-columns: 1fr;
		height: 100dvh;
		min-height: 0;
		overflow: hidden;
		background: var(--color-background);
		border-top: var(--archive-border);
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

	.archive-sidebar {
		z-index: 5;
		padding: 1rem 0;
		overflow: hidden;
		background: var(--color-background);
		border-bottom: var(--archive-border);
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
		background: linear-gradient(to right, var(--filter-fade-start) 20%, var(--filter-fade-end));
	}

	.filter-block::after {
		right: 0;
		background: linear-gradient(to left, var(--filter-fade-start) 20%, var(--filter-fade-end));
	}

	.filter-label,
	.project-count,
	.sort,
	.project-meta p,
	.project-meta time,
	.project-card h2 {
		text-transform: uppercase;
		letter-spacing: var(--letter-spacing-md);
	}

	.filter-label {
		margin: 0 var(--archive-filter-padding-x) 0.7rem;
		font-size: var(--font-size-sm);
		letter-spacing: var(--letter-spacing-lg);
		color: var(--color-text-subtle);
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
		padding: 0 var(--archive-filter-padding-x) 0.25rem;
		scrollbar-width: none;
		scroll-snap-type: x proximity;
		-webkit-overflow-scrolling: touch;
	}

	.filter-nav::-webkit-scrollbar {
		display: none;
	}

	.filter-link {
		flex: 0 0 auto;
		scroll-snap-align: start;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2rem;
		padding: 0.45rem 0.85rem;
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-pill);
		color: var(--color-text-muted);
		text-decoration: none;
		text-transform: uppercase;
		font-size: var(--font-size-sm);
		letter-spacing: var(--letter-spacing-md);
		line-height: 1;
		white-space: nowrap;
		transition:
			color var(--transition-fast),
			background var(--transition-fast),
			border-color var(--transition-fast);
	}

	.filter-link::before {
		display: none;
	}

	.filter-link:hover,
	.filter-link.active {
		color: var(--color-background);
		background: var(--color-accent);
		border-color: var(--color-accent);
		text-decoration: none;
	}

	.archive-content {
		container-type: inline-size;
		height: 100%;
		min-height: 0;
		overflow-y: auto;
		padding: 1rem var(--archive-content-padding-x) var(--archive-content-padding-bottom);
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
		margin: -1rem calc(var(--archive-content-padding-x) * -1) 1.25rem;
		padding: 1rem var(--archive-content-padding-x);
		background: var(--surface-blur);
		backdrop-filter: blur(0.8rem);
		border-bottom: var(--archive-border);
	}

	.project-count {
		margin: 0;
		font-size: var(--font-size-base);
		letter-spacing: var(--letter-spacing-xl);
		color: var(--color-text-subtle);
	}

	.sort {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		margin: 0;
		font-size: 0.65rem;
		letter-spacing: var(--letter-spacing-lg);
		color: var(--color-text-subtle);
	}

	.sort select {
		border: 0;
		background: transparent;
		color: var(--color-text);
		text-transform: uppercase;
		font-size: var(--font-size-base);
		letter-spacing: var(--letter-spacing-md);
		cursor: pointer;
	}

	.project-grid,
	.project-list {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.project-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--archive-grid-gap);
	}

	.project-column,
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

	.project-image {
		margin: 0;
	}

	.project-card img {
		width: 100%;
		border-radius: var(--radius-sm);
		object-fit: cover;
		background: var(--color-surface);
		transition:
			transform var(--transition-medium),
			opacity var(--transition-medium);
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
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
	}

	.project-card h2 {
		margin: 0.25rem 0 0;
		font-size: var(--font-size-base);
		font-weight: var(--fw-medium);
		line-height: 1.2;
	}

	.empty-message {
		margin: 3rem 0 0;
		font-size: var(--font-size-lg);
		color: var(--color-text-muted);
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

		.project-column,
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
			--archive-content-padding-x: 1.7rem;

			grid-template-columns: var(--archive-sidebar-width) 1fr;
		}

		.archive-sidebar {
			height: 100%;
			padding: 4rem 2.8rem;
			overflow: visible;
			border-right: var(--archive-border);
			border-bottom: 0;
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
			letter-spacing: var(--letter-spacing-md);
		}

		.archive-sidebar h2 {
			display: block;
			margin: 0 0 1rem;
			text-transform: uppercase;
			font-size: var(--font-size-heading-sm);
			font-weight: var(--fw-medium);
			letter-spacing: var(--letter-spacing-md);
		}

		.filter-nav {
			flex-direction: column;
			align-items: flex-start;
			gap: 0.7rem;
			overflow: visible;
			padding: 0;
			scroll-snap-type: none;
		}

		.filter-link {
			min-height: 0;
			padding: 0;
			border: 0;
			border-radius: 0;
			gap: 0.8rem;
			background: transparent;
			color: var(--color-text-muted);
			text-transform: none;
			font-size: var(--font-size-md);
			letter-spacing: var(--letter-spacing-sm);
		}

		.filter-link::before {
			content: '';
			display: block;
			width: 0.3rem;
			height: 0.3rem;
			border-radius: 50%;
			background: currentColor;
			opacity: 0;
			transform: scale(0.4);
			transition:
				opacity var(--transition-fast),
				transform var(--transition-fast);
		}

		.filter-link:hover,
		.filter-link.active {
			color: var(--color-text);
			background: transparent;
			text-decoration: underline;
			text-underline-offset: 0.18rem;
		}

		.filter-link.active::before {
			opacity: 1;
			transform: scale(1);
		}
	}

	@media (min-width: 1000px) {
		.archive-page {
			--archive-sidebar-width: 18rem;
			--archive-content-padding-x: 1.7rem;
		}

		.archive-content {
			padding-right: 2.4rem;
		}

		.archive-header {
			margin-right: -2.4rem;
			padding-right: 2.4rem;
		}
	}

	@media (min-width: 1400px) {
		.archive-page {
			--archive-sidebar-width: 20rem;
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