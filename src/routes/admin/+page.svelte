<script lang="ts">
	import Button from '@smui/button';
	import { onMount, onDestroy } from 'svelte';

	let intervalId;

	onMount(() => {
		loadUsers(); // 최초 1회

		intervalId = setInterval(() => {
			loadUsers();
		}, 3000); // 3초마다 갱신
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	let users: any[] = [];

	async function loadUsers() {
		const res = await fetch('https://kickweb-backend.onrender.com/admin/users');
		users = await res.json();
	}

	async function save(user) {
		await fetch('https://kickweb-backend.onrender.com/admin/adjust', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: user.email,
				points: Number(user.points),
				kickboard: user.kickboard
			})
		});
		alert('저장 완료');
		loadUsers();
	}

	async function delete_user(user) {
		if (!confirm(`정말 ${user.email}을(를) 삭제하시겠습니까?`)) return;

		await fetch('https://kickweb-backend.onrender.com/admin/delete', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: user.email })
		});
	}
</script>

<h1>관리자 유저 관리</h1>

<table border="1" cellpadding="8">
	<thead>
		<tr>
			<th>Email</th>
			<th>Points</th>
			<th>Kickboard</th>
			<th>Action</th>
		</tr>

		{#each users as user}
			<tr>
				<td>{user.email}</td>
				<td>
					<input type="number" bind:value={user.points} />
				</td>
				<td>
					{user.kickboard}
				</td>
				<td>
					<Button variant="raised" onclick={() => save(user)}>저장</Button>
					<Button variant="outlined" color="secondary" onclick={() => delete_user(user)}
						>삭제</Button
					>
				</td>
			</tr>
		{/each}
	</thead>
</table>

<style>
	table {
		margin-top: 2rem;
		border-collapse: collapse;
	}
	input {
		width: 100px;
	}
</style>
