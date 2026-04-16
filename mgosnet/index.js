/* ── Дата и живые часы UTC ───────────────────────────── */
function pad(n) {
	return String(n).padStart(2, "0");
}
function updateClock() {
	const now = new Date();
	document.getElementById("live-time").textContent =
		`${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
}
document.getElementById("today-date").textContent =
	new Date().toLocaleDateString("ru-RU", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});
updateClock();
setInterval(updateClock, 1000);

/* ── Лонгрид: развернуть / свернуть ─────────────────── */
function toggleLongread(id, btn) {
	const body = document.getElementById(id);
	const isCollapsed = body.classList.toggle("collapsed");
	btn.classList.toggle("expanded", !isCollapsed);
	// меняем текст, сохраняя иконку (первый child — svg)
	btn.childNodes[btn.childNodes.length - 1].textContent = isCollapsed
		? " Развернуть"
		: " Свернуть";
	if (isCollapsed) {
		body.closest(".post").scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	}
}

/* ── Карусели ────────────────────────────────────────── */
document.querySelectorAll("[data-carousel]").forEach((wrap) => {
	const track = wrap.querySelector(".carousel-track");
	const imgs = track.querySelectorAll("img");
	const prev = wrap.querySelector(".carousel-prev");
	const next = wrap.querySelector(".carousel-next");
	const dotsEl = wrap.querySelector(".carousel-dots");
	const counter = wrap.querySelector(".carousel-counter-hud");
	const total = imgs.length;
	let cur = 0;

	imgs.forEach((_, i) => {
		const d = document.createElement("button");
		d.className = "carousel-dot" + (i === 0 ? " active" : "");
		d.setAttribute("aria-label", `Слайд ${i + 1}`);
		d.addEventListener("click", () => go(i));
		dotsEl.appendChild(d);
	});

	function go(n) {
		cur = (n + total) % total;
		track.style.transform = `translateX(-${cur * 100}%)`;
		dotsEl
			.querySelectorAll(".carousel-dot")
			.forEach((d, i) => d.classList.toggle("active", i === cur));
		counter.textContent = `${pad(cur + 1)} / ${pad(total)}`;
	}

	prev.addEventListener("click", () => go(cur - 1));
	next.addEventListener("click", () => go(cur + 1));

	// свайп
	let sx = 0;
	wrap.addEventListener(
		"touchstart",
		(e) => {
			sx = e.touches[0].clientX;
		},
		{ passive: true },
	);
	wrap.addEventListener("touchend", (e) => {
		const dx = e.changedTouches[0].clientX - sx;
		if (Math.abs(dx) > 40) go(dx < 0 ? cur + 1 : cur - 1);
	});

	go(0);
});

/* ── Видео: полный экран ─────────────────────────────── */
function goFullscreen(btn) {
	const video = btn.closest(".video-wrap").querySelector("video");
	const req =
		video.requestFullscreen ||
		video.webkitRequestFullscreen ||
		video.mozRequestFullScreen;
	if (!document.fullscreenElement && req) req.call(video);
	else if (document.exitFullscreen) document.exitFullscreen();
}
