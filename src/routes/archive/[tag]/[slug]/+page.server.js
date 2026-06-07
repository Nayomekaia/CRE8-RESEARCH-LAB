import { error } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function load({ params, url }) {
	const returnTag = url.searchParams.get('returnTag') ?? '';

	const { data: project, error: projectError } = await supabase
		.from('projects')
		.select(`
			*,
			tags (
				id,
				name,
				slug
			)
		`)
		.eq('slug', params.slug)
		.eq('tags.slug', params.tag)
		.single();

	if (projectError || !project) {
		console.error(projectError);
		throw error(404, 'Project not found');
	}

	return {
		project,
		returnTag
	};
}