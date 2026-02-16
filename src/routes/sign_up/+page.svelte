<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { signUp } from '$lib/api';
	import bgImage1 from '/src/lib/assets/킥보드-removebg-preview.png';

	let email = '';
	let password = '';
	let message = '';

	async function handleSignUp() {
		const res = await signUp({ email, password });
		message = res.success ? '회원가입 성공!' : res.message;
	}
</script>

<main>
	<div
		class="center-container"
		style="background-image:url('{bgImage1}'); background-size: 50% auto; background-repeat: no-repeat;"
	>
		<h1>회원가입</h1>

		<input bind:value={email} placeholder="이메일" />
		<input bind:value={password} type="password" placeholder="비밀번호" />

		<Button variant="raised" onclick={handleSignUp}>
			<Label>회원가입</Label>
		</Button>

		<p>{message}</p>
		<span>이미 계정이 있으신가요? <a href="/">로그인</a></span>
	</div>
</main>

<style>
	.center-container {
		display: flex;
		flex-direction: column; /* 세로로 쌓기 */
		justify-content: center; /* 세로 중앙 */
		align-items: center; /* 가로 중앙 */
		height: 100vh; /* 화면 전체 높이 */
		gap: 1rem; /* 요소 간 간격 */
		background-color: rgb(213, 248, 193);
	}

	input {
		padding: 0.5rem;
		width: 250px;
		border-radius: 5px;
		border: 1px solid #ccc;
	}
</style>
