let winStreak = 0;

export function increaseWinStreak() {
    winStreak += 1;
    displayWinStreak();
}

export function resetWinStreak() {
    winStreak = 0;
    displayWinStreak();
}

export function displayWinStreak() {
    const winStreakElement = document.getElementById('winStreak');
    if (winStreakElement) {
        winStreakElement.textContent = `Win Streak: ${winStreak}`;
    }
}
