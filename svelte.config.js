import adapter from '@sveltejs/adapter-netlify';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// 먼저 preprocess 설정
	preprocess: preprocess(),

	kit: {
		adapter: adapter() // Netlify용 어댑터
		// 필요시 다른 설정 추가 가능
	}
};

export default config;
