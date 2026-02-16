import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter() // Netlify용 어댑터
		// 필요시 다른 설정 추가 가능
	}
};

export default config;
