<script lang="ts">
	import { login } from '$lib/api';
	import { goto } from '$app/navigation';
	import Button, { Label } from '@smui/button';
	import bgImage1 from '/src/lib/assets/킥보드-removebg-preview.png';

	let email = '';
	let password = '';
	let message = '';

	async function handleLogin() {
		const res = await login({ email, password });

		if (res.success) {
			// admin 계정이면 관리자 페이지
			if (email === 'admin' && password === 'admin') {
				goto('/admin');
			} else {
				// 일반 유저
				goto(`/main?email=${encodeURIComponent(email)}`);
			}
		} else {
			message = res.message;
		}
	}
</script>

<main>
	<div
		class="center-container"
		style="background-image:url('{bgImage1}'); background-size: 50% auto; background-repeat: no-repeat;"
	>
		<h1>로그인</h1>

		<input type="email" placeholder="이메일" bind:value={email} />

		<input type="password" placeholder="비밀번호" bind:value={password} />

		<Button variant="raised" onclick={handleLogin}>
			<Label>로그인</Label>
		</Button>

		<p>{message}</p>

		<span>
			회원이 아니신가요?
			<a href="/sign_up">회원가입</a>
		</span>
	</div>
</main>

<style>
	.center-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100vh;
		gap: 1rem;
		background-color: rgb(213, 248, 193);
		padding: 2rem;
		box-sizing: border-box;
	}

	input {
		width: 250px;
		padding: 0.5rem;
		border: 1px solid #ccc;
		border-radius: 8px;
	}

	a {
		color: #3a7afe;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
