// ================================
// Mood Tracker Logic
// ================================

const moodForm = document.getElementById("mood-form");
const moodCards = document.querySelectorAll(".emoji-card");
const stressSlider = document.getElementById("stress-slider");
const stressValue = document.getElementById("stress-value");

let selectedMood = "";
// ================================
// Mood Selection + Auto Stress
// ================================

const moodStressMap = {

    Happy: 15,

    Calm: 25,

    Sad: 60,

    Stressed: 85,

    Anxious: 75,

    "Burned Out": 95

};

moodCards.forEach(card => {

    card.addEventListener("click", () => {

        // Remove active class
        moodCards.forEach(c =>
            c.classList.remove("active")
        );

        // Active card
        card.classList.add("active");

        // Selected mood
        selectedMood = card.dataset.mood;

        // Auto Stress Value
        const autoStress =
            moodStressMap[selectedMood];

        // Update Slider
        stressSlider.value = autoStress;

        // Update UI Text
        stressValue.textContent =
            `${autoStress}%`;

    });

});

// ================================
// Stress Slider
// ================================

stressSlider.addEventListener("input", () => {

    stressValue.textContent = `${stressSlider.value}%`;

});

// ================================
// Save Mood Entry
// ================================

moodForm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (!selectedMood) {

        alert("Please select your mood.");

        return;

    }

    const stress = stressSlider.value;

    const notes = document.getElementById("notes").value;

    // Current Date & Time
    const now = new Date();

    const entry = {

        mood: selectedMood,
        stress: Number(stress),
        notes: notes,

        date: now.toLocaleDateString(),

        time: now.toLocaleTimeString(),

        timestamp: now.getTime()

    };

    // Get Existing Data
    let moodEntries =
        JSON.parse(localStorage.getItem("mindcareMoodEntries")) || [];

    // Add New Entry
    moodEntries.unshift(entry);

    // Save Back
    localStorage.setItem(
        "mindcareMoodEntries",
        JSON.stringify(moodEntries)
    );

    alert("Mood entry saved successfully!");

    // Reset Form
    moodForm.reset();

    stressValue.textContent = "40%";

    selectedMood = "";

    moodCards.forEach(c => c.classList.remove("active"));

});