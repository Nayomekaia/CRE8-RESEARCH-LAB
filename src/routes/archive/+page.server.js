import { supabase } from '$lib/supabaseClient';

export async function load({ url }) {
	const selectedTag = url.searchParams.get('tag') ?? '';

	const { data: tags, error: tagsError } = await supabase
		.from('tags')
		.select('id, name, slug')
		.order('name', { ascending: true });

	if (tagsError) {
		console.error('Could not load tags:', tagsError.message);
	}

	let projectsQuery = supabase
		.from('projects')
		.select(`
			id,
			title,
			slug,
			preview_image,
			published_at,
			is_published,
			tags!inner (
				id,
				name,
				slug
			)
		`)
		.eq('is_published', true)
		.order('published_at', { ascending: false });

	if (selectedTag && selectedTag.trim() !== '') {
		projectsQuery = projectsQuery.eq('tags.slug', selectedTag);
	}

	const { data: projects, error: projectsError } = await projectsQuery;

	if (projectsError) {
		console.error('Could not load projects:', projectsError.message);
	}

	return {
		projects: projects ?? [],
		tags: tags ?? [],
		selectedTag
	};
}