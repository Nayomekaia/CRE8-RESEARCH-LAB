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