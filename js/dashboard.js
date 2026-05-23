// =======================================
// Dashboard Real-Time Data System
// =======================================

const moodEntries =
    JSON.parse(localStorage.getItem("mindcareMoodEntries")) || [];

// =======================================
// DOM Elements
// =======================================

const historyContainer =
    document.getElementById("recent-mood-history");

const stressCounter =
    document.getElementById("stress-counter");

const streakCounter =
    document.getElementById("streak-counter");

const wellnessScore =
    document.getElementById("wellness-score-value");

const progressText =
    document.getElementById("progress-ring-value-text");

const chartContainer =
    document.getElementById("chart-container");

// =======================================
// Empty State
// =======================================

if (moodEntries.length === 0) {

    historyContainer.innerHTML = `

        <div class="glass-card" style="padding:1rem;">
            No mood logs yet.
        </div>

    `;

    chartContainer.innerHTML = `

        <div style="padding:2rem;text-align:center;">
            No chart data available.
        </div>

    `;

}

// =======================================
// Render Recent Logs
// =======================================

function renderRecentLogs() {

    historyContainer.innerHTML = "";

    const recent = moodEntries.slice(0, 5);

    recent.forEach(entry => {

        const item = document.createElement("div");

        item.className = "glass-card";

        item.style.marginBottom = "1rem";

        item.style.padding = "1rem";

        item.innerHTML = `

            <div style="display:flex;justify-content:space-between;">
                
                <div>
                    <h4>${entry.mood}</h4>
                    <p style="font-size:0.85rem;color:var(--text-muted);">
                        Stress: ${entry.stress}%
                    </p>
                </div>

                <div style="text-align:right;">
                    <p style="font-size:0.8rem;">
                        ${entry.date}
                    </p>

                    <p style="font-size:0.75rem;color:var(--text-muted);">
                        ${entry.time}
                    </p>
                </div>

            </div>

            ${
                entry.notes
                    ? `<p style="margin-top:0.75rem;">
                        ${entry.notes}
                       </p>`
                    : ""
            }

        `;

        historyContainer.appendChild(item);

    });

}

renderRecentLogs();

// =======================================
// Average Stress
// =======================================

function calculateStress() {

    if (moodEntries.length === 0) {

        stressCounter.textContent = "0%";

        return;

    }

    const total =
        moodEntries.reduce((sum, entry) =>
            sum + entry.stress, 0);

    const average =
        Math.round(total / moodEntries.length);

    stressCounter.textContent = `${average}%`;

}

calculateStress();

// =======================================
// Wellness Score
// =======================================

function calculateWellness() {

    if (moodEntries.length === 0) {

        wellnessScore.textContent = "0%";

        progressText.textContent = "0%";

        return;

    }

    const totalStress =
        moodEntries.reduce((sum, entry) =>
            sum + entry.stress, 0);

    const avgStress =
        totalStress / moodEntries.length;

    const score =
        Math.max(0, 100 - Math.round(avgStress));

    wellnessScore.textContent = `${score}%`;

    progressText.textContent = `${score}%`;

    // Progress Ring
    const circle =
        document.querySelector(".progress-ring-circle");

    const radius = 30;

    const circumference =
        2 * Math.PI * radius;

    circle.style.strokeDasharray =
        circumference;

    const offset =
        circumference -
        (score / 100) * circumference;

    circle.style.strokeDashoffset =
        offset;

}

calculateWellness();

// =======================================
// Streak Calculation
// =======================================

function calculateStreak() {

    if (moodEntries.length === 0) {

        streakCounter.textContent = "0 Days";

        return;

    }

    const uniqueDays = new Set();

    moodEntries.forEach(entry => {

        uniqueDays.add(entry.date);

    });

    streakCounter.textContent =
        `${uniqueDays.size} Days`;

}

calculateStreak();

// =======================================
// Weekly Mood Chart
// =======================================

function renderChart() {

    const last7Days = [];

    for (let i = 6; i >= 0; i--) {

        const d = new Date();

        d.setDate(d.getDate() - i);

        last7Days.push(
            d.toLocaleDateString()
        );

    }

    const chartData = last7Days.map(day => {

        const dayEntries =
            moodEntries.filter(
                entry => entry.date === day
            );

        if (dayEntries.length === 0) {

            return 0;

        }

        const avgStress =
            dayEntries.reduce((sum, entry) =>
                sum + entry.stress, 0)
            / dayEntries.length;

        return 100 - avgStress;

    });

    // SVG Chart
    const width = 600;

    const height = 220;

    const maxValue = 100;

    const pointSpacing =
        width / (chartData.length - 1);

    let points = "";

    chartData.forEach((value, index) => {

        const x = index * pointSpacing;

        const y =
            height -
            (value / maxValue) * 180 -
            20;

        points += `${x},${y} `;

    });

    chartContainer.innerHTML = `

        <svg
            width="100%"
            height="${height}"
            viewBox="0 0 ${width} ${height}"
        >

            <!-- Grid -->

            <line x1="0" y1="180" x2="${width}" y2="180"
                stroke="rgba(255,255,255,0.1)" />

            <!-- Polyline -->

            <polyline
                fill="none"
                stroke="var(--primary)"
                stroke-width="4"
                points="${points}"
            />

            ${
                chartData.map((value, index) => {

                    const x = index * pointSpacing;

                    const y =
                        height -
                        (value / maxValue) * 180 -
                        20;

                    return `

                        <circle
                            cx="${x}"
                            cy="${y}"
                            r="5"
                            fill="var(--primary)"
                        />

                    `;

                }).join("")
            }

        </svg>

    `;

}

renderChart();