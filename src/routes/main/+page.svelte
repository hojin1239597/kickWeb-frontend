<script lang="ts">
	import { onMount } from 'svelte';

	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';

	import Dialog, { Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';

	let email = '';
	let points = 0;

	let pointDialogOpen = false;
	let buyKickboardDialogOpen = false;

	let kickboard = false;

	// SSR 안전하게 onMount에서 URL 파라미터 읽기
	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const qEmail = urlParams.get('email');
		if (!qEmail) {
			location.href = '/'; // 이메일 없으면 로그인 페이지로
			return;
		}
		email = qEmail;
		loadMe();
	});

	async function loadMe() {
		const res = await fetch(`http://127.0.0.1:8000/me/${email}`);
		const data = await res.json();

		points = data.points ?? 0;
		kickboard = !!data.kickboard;
	}

	// 포인트 구매
	async function buyPoints(amount: number) {
		const res = await fetch('http://127.0.0.1:8000/points/add', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, amount })
		});
		const data = await res.json();

		if (data.success) {
			points = data.points; // DB 반영된 값으로 화면 갱신
		}
		pointDialogOpen = false;
	}

	async function buyKickboard() {
		const cost = 1000; // 킥보드 1대당 1000포인트

		if (points < cost) {
			alert('포인트가 부족합니다!');
			return;
		}

		const res = await fetch('http://127.0.0.1:8000/kickboard/buy', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
		const data = await res.json();

		if (data.success) {
			points = data.points;
			kickboard = data.kickboard;
			alert(data.message);
		} else {
			alert(data.message);
		}
	}

	async function returnKickboard() {
		const res = await fetch('http://127.0.0.1:8000/kickboard/return', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email })
		});
		const data = await res.json();

		if (data.success) {
			points = data.points;
			kickboard = false;
			alert(data.message);
		} else {
			alert(data.message);
		}
	}
</script>

<!-- ================= AppBar ================= -->
<TopAppBar variant="static" color="primary">
	<Row>
		<Section>
			<Title>Kick App</Title>
		</Section>
		<Section align="end" toolbar>
			<Button onclick={() => (pointDialogOpen = true)}>
				<Label>💰 {points} P</Label>
			</Button>
			<IconButton class="material-icons">account_circle</IconButton>
		</Section>
	</Row>
</TopAppBar>

<!-- ================= Main ================= -->
<main>
	{#if !kickboard}
		<Button
			class="kickboard-button"
			variant="raised"
			onclick={() => (buyKickboardDialogOpen = true)}
		>
			<Label>킥보드 구매</Label>
		</Button>
	{:else}
		<p>킥보드가 준비되었습니다! 즐거운 라이딩 되세요!</p>
		<Button variant="outlined" color="secondary" onclick={() => returnKickboard()}>
			<Label>킥보드 반납</Label>
		</Button>
	{/if}
</main>

<!-- ================= 포인트 구매 Dialog ================= -->
<Dialog bind:open={pointDialogOpen}>
	<Title>포인트 구매</Title>
	<Content>
		<Button onclick={() => buyPoints(1000)}><Label>1000원 → 1000P</Label></Button>
		<Button onclick={() => buyPoints(5000)}><Label>5000원 → 5000P</Label></Button>
		<Button onclick={() => buyPoints(10000)}><Label>10000원 → 10000P</Label></Button>
		<Button onclick={() => buyPoints(50000)}><Label>50000원 → 50000P</Label></Button>
	</Content>
	<Actions>
		<Button onclick={() => (pointDialogOpen = false)}><Label>닫기</Label></Button>
	</Actions>
</Dialog>

<!-- ================= 킥보드 구매 Dialog ================= -->
<Dialog bind:open={buyKickboardDialogOpen}>
	<Title>킥보드 구매</Title>
	<Content>
		<p>비용: 1000포인트</p>
		<p class="precaution">사용시간은 무제한입니다</p>
	</Content>
	<Actions>
		<Button onclick={() => (buyKickboardDialogOpen = false)}><Label>취소</Label></Button>
		<Button onclick={() => buyKickboard()}><Label>구매</Label></Button>
	</Actions>
</Dialog>

<style>
	main {
		margin-top: 6rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
	}

	.precaution {
		color: red;
		font-size: 0.9rem;
	}
</style>
