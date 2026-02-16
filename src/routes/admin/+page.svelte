<script lang="ts">
	import Button from '@smui/button';
	import { onMount, onDestroy } from 'svelte';

	let intervalId;
	let users: any[] = [];

	// email별 편집 중 포인트 값 저장
	let editingPoints: Record<string, number> = {};

	onMount(() => {
		loadUsers(); // 최초 1회

		intervalId = setInterval(() => {
			loadUsers();
		}, 3000); // 3초마다 갱신
	});

	onDestroy(() => {
		clearInterval(intervalId);
	});

	async function loadUsers() {
		const res = await fetch('https://kickweb-backend.onrender.com/admin/users');
		const data = await res.json();
		users = data.map((user) => ({
			...user,
			// 로컬 편집 중이면 덮어쓰지 않음
			points: editingPoints[user.email] ?? user.points
		}));
	}

	async function save(user) {
		const pointsToSave = editingPoints[user.email] ?? user.points;

		await fetch('https://kickweb-backend.onrender.com/admin/adjust', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: user.email,
				points: pointsToSave,
				kickboard: user.kickboard
			})
		});

		alert('저장 완료');

		// 저장 후 편집 상태 제거
		delete editingPoints[user.email];

		loadUsers(); // 서버 데이터 새로 가져오기
	}

	async function delete_user(user) {
		if (!confirm(`정말 ${user.email}을(를) 삭제하시겠습니까?`)) return;

		await fetch('https://kickweb-backend.onrender.com/admin/delete', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: user.email })
		});

		loadUsers(); // 삭제 후 데이터 갱신
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
	</thead>
	<tbody>
		{#each users as user}
			<tr>
				<td>{user.email}</td>
				<td>
					<input
						type="number"
						value={editingPoints[user.email] ?? user.points}
						oninput={(e) => (editingPoints[user.email] = +(e.target as HTMLInputElement).value)}
					/>
				</td>
				<td>{user.kickboard}</td>
				<td>
					<Button variant="raised" onclick={() => save(user)}>저장</Button>
					<Button variant="outlined" color="secondary" onclick={() => delete_user(user)}
						>삭제</Button
					>
				</td>
			</tr>
		{/each}
	</tbody>
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
