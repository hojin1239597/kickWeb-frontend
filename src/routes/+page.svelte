<script lang="ts">
	import Button, { Label } from '@smui/button';
	import MenuSurface from '@smui/menu-surface';
</script>

<main>
	<div class="center-container">
		<h1>kick-app</h1>
		<div class="block"></div>
		<div class="block"></div>
		<a href="sign_in">
			<Button variant="raised">
				<Label>로그인</Label>
			</Button>
		</a>
		<div class="block"></div>
		<div class="block"></div>
		<div class="block"></div>
		<span><a href="sign_up">회원가입</a></span>
	</div>
</main>

<style>
	a {
		text-decoration: none;
		color: black;
	}
	.center-container {
		display: flex;
		flex-direction: column; /* 세로로 쌓이도록 */
		justify-content: center; /* 세로 중앙 */
		align-items: center; /* 가로 중앙 */
		height: 100vh;
		gap: 1rem; /* 요소 간 간격 */
		background-color: rgb(213, 248, 193);
	}
</style>
