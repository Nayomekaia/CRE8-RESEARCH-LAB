<script>
	let { data } = $props();

	const project = $derived(data.project);
	const returnTag = $derived(data.returnTag ?? '');
	const backUrl = $derived(returnTag ? `/archive?tag=${returnTag}` : '/archive');
	const projectImage = $derived(project.main_image ?? project.preview_image);

	function getProjectYear(date) {
		if (!date) {
			return '';
		}

		return new Date(date).getFullYear();
	}

	function splitContent(content) {
		if (!content) {
			return [];
		}

		return content
			.split('\n\n')
			.map((paragraph) => paragraph.trim())
			.filter(Boolean);
	}
</script>

<svelte:head>
	<title>{project.title} | CRE8 Studios Research Lab</title>
	<meta
		name="description"
		content={project.intro ?? `${project.title} project from CRE8 Studios Research Lab.`}
	/>
</svelte:head>
			<a href={backUrl} class="back-link">
				<span class="back-arrow" aria-hidden="true">←</span>
				<span>Back to archive</span>
			</a>
				{#if project.published_at}
					<time datetime={project.published_at}>
						{getProjectYear(project.published_at)}
					</time>
				{/if}
			{#if projectImage}
				<figure class="project-media">
					<img src={projectImage} alt={project.title} loading="eager" />
				</figure>
			{/if}

			{#if project.content}
				<section class="content" aria-label="Project description">
					{#each splitContent(project.content) as paragraph}
						<p>{paragraph}</p>
					{/each}
				</section>
			{/if}
<style>
	.detail-page {
		display: grid;
		grid-template-columns: 1fr;
		height: 100%;
		min-height: 0;
		overflow: hidden;
		background: var(--color-background);
		border-top: 1px solid var(--color-border);
	}

	.detail-sidebar {
		z-index: 5;
		padding: 1.25rem;
		background: var(--color-background);
		border-bottom: 1px solid var(--color-border);
	}

	.sidebar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		width: fit-content;
		color: var(--color-text);
		text-transform: uppercase;
		font-size: var(--font-size-base);
		letter-spacing: var(--letter-spacing-md);
		text-decoration: none;
		white-space: nowrap;
	}

	.back-arrow {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.65rem;
		height: 1.65rem;
		border: 1px solid var(--color-border-strong);
		border-radius: var(--radius-pill);
		font-size: var(--font-size-heading-sm);
		line-height: 1;
		transition:
			transform var(--transition-fast),
			background var(--transition-fast),
			color var(--transition-fast),
			border-color var(--transition-fast);
	}

	.back-link:hover .back-arrow {
		transform: translateX(-0.2rem);
		background: var(--color-text);
		color: var(--color-background);
		border-color: var(--color-text);
	}

	.back-link:hover span:last-child {
		text-decoration: underline;
		text-underline-offset: 0.22rem;
	}

	.project-info {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.project-info p,
	.project-info time {
		margin: 0;
		text-transform: uppercase;
		font-size: var(--font-size-sm);
		letter-spacing: var(--letter-spacing-md);
		color: var(--color-text-subtle);
	}

	.detail-scroll {
		height: 100%;
		min-height: 0;
		overflow-x: hidden;
		overflow-y: auto;
	}

	.project-detail {
		width: 100%;
		max-width: 72rem;
		padding: 2rem 1.25rem 6rem;
	}

	.project-header {
		max-width: 58rem;
		margin-bottom: 2rem;
	}

	.project-header h1 {
		margin: 0;
		color: var(--color-text);
		text-transform: uppercase;
		font-size: clamp(2.6rem, 9vw, 5rem);
		font-weight: 400;
		letter-spacing: -0.06em;
		line-height: 0.88;
	}

	.project-media,
	.project-video {
		width: 100%;
		margin: 0 0 2.5rem;
	}

	.project-media img,
	.project-video video {
		display: block;
		width: 100%;
		height: auto;
		border-radius: var(--radius-md);
		background: var(--color-card-background);
	}

	.project-media img {
		max-height: 78vh;
		object-fit: cover;
	}

	.intro {
		max-width: 46rem;
		margin: 0 0 1.5rem;
		color: var(--color-text-soft);
		font-size: clamp(1.05rem, 1.7vw, 1.45rem);
		line-height: 1.45;
	}

	.project-button {
		display: inline-flex;
		align-items: center;
		margin-bottom: 2.5rem;
		color: var(--color-text);
		text-transform: uppercase;
		font-size: var(--font-size-md);
		letter-spacing: var(--letter-spacing-md);
		text-decoration: underline;
		text-underline-offset: 0.22rem;
	}

	.content {
		max-width: 48rem;
		padding-bottom: 2rem;
	}

	.content p {
		margin: 0 0 1.25rem;
		color: var(--color-text-body);
		font-size: clamp(1rem, 1.2vw, 1.1rem);
		line-height: 1.7;
	}

	.content p:first-child {
		color: var(--color-text);
		font-size: clamp(1.08rem, 1.4vw, 1.25rem);
		line-height: 1.55;
	}

	@media (min-width: 760px) {
		.detail-page {
			grid-template-columns: 17rem 1fr;
		}

		.detail-sidebar {
			height: 100%;
			padding: 4rem 2.8rem;
			border-right: 1px solid var(--color-border);
			border-bottom: 0;
		}

		.sidebar-inner {
			position: sticky;
			top: 4rem;
			display: block;
		}

		.back-link {
			margin-bottom: 2.5rem;
		}

		.project-info {
			display: block;
			margin-top: 2.5rem;
		}

		.project-info p,
		.project-info time {
			display: block;
			margin-bottom: 0.7rem;
		}

		.project-detail {
			padding: 4rem 3rem 8rem;
		}

		.project-header {
			margin-bottom: 2.5rem;
		}

		.project-media {
			margin-bottom: 3rem;
		}

		.project-video {
			margin-top: 3.5rem;
		}
	}

	@media (min-width: 1100px) {
		.detail-page {
			grid-template-columns: 18rem 1fr;
		}

		.project-detail {
			padding-right: 5rem;
			padding-left: 4rem;
		}
	}

	@media (min-width: 1400px) {
		.detail-page {
			grid-template-columns: 20rem 1fr;
		}

		.project-detail {
			padding-left: 5rem;
		}
	}
</style>