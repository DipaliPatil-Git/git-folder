/* ==========================================================================
   AI WELLNESS CHATBOT LOGIC - MINDCARE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const typingIndicator = document.getElementById('typing-indicator');
    const promptButtons = document.querySelectorAll('.prompt-btn');

    // 1. Aria Chatbot Response Database
    const ariaResponses = {
        'burnout': "I hear you. Academic pressure can feel completely overwhelming. Let's take things one step at a time today. Remember, it's okay to prioritize your health over your to-do list. Try using the Pomodoro technique (25 min study, 5 min break).",
        'anxiety': "Anxiety have a way of making everything feel urgent and heavy, but you are safe right now. Let's do a quick grounding check. Can you focus on three things you can hear around you? Try our **Breathing Bubble Exercise** on the **Resources** page.",
        'breathing': "Deep breathing is a wonderful way to relax. I highly recommend heading to our **Resources** page, where we have a beautiful **Breathing Bubble** visualizer. It will guide you through a 4-7-8 breathing pattern.",
        'stressed': "Stress is a completely normal reaction to high workloads. Have you logged your mood in our **Mood Tracker** today? Recording how you feel can help you notice patterns in your stress levels.",
        'depressed': "I'm really sorry you're feeling this way. You're not alone. Please consider opening up to a trusted friend or counselor. If you need immediate help, check out the **Emergency Support** panel in the **Resources** page.",
        'exam': "Exams are stressful, but they don't define your worth. Try to break your revision into small chunks and remember to stay hydrated. A 10-minute walk can do wonders for your focus!",
        'sleep': "Sleep is the foundation of mental clarity. If you're struggling to rest, try to avoid screens 30 minutes before bed. We have some great guides on **Sleep Hygiene** in the Resources section.",
        'lonely': "University can sometimes feel lonely despite being surrounded by people. It's okay to feel this way. Maybe try joining a small student club or reaching out to a classmate today?",
        'hello': "Hello! I'm Aria, your wellness assistant. How are you feeling today? I can help with mindfulness guidance, managing study stress, or recommending breathing exercises.",
        'hi': "Hi there! I'm Aria. How is your day going? Feel free to ask me about stress management, breathing exercises, or coping with study burnout.",
        'thank': "You're very welcome! I'm glad I could support you. Remember to take care of yourself, and I'll be here whenever you need a moment to pause."
    };

    const defaultResponses = [
        "I appreciate you sharing that with me. It's completely valid to feel this way, especially as a student. What is one small thing you can do for yourself in the next five minutes? Maybe stretch or take a sip of water?",
        "Thank you for opening up. Wellness is a continuous journey. If you're feeling stressed, I encourage you to log it in our **Mood Tracker** so we can see trends on your dashboard, or try a guided breathing session.",
        "I hear you, and I'm here. It's easy to lose ourselves in work, but your peace of mind is incredibly precious. Make sure to schedule a small break today.",
        "That makes complete sense. When we're under pressure, self-care is often the first thing we drop. Let's try to take a deep breath together. Inhale peace, exhale tension."
    ];

    // 2. Add Message Bubble
    function addMessage(text, sender) {
        const bubble = document.createElement('div');
        bubble.className = `message-bubble ${sender}`;

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        // Escape HTML but allow link tags we generate
        let formattedText = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
        
        // Render Markdown links beautifully
        formattedText = formattedText
            .replace(/&lt;b&gt;/g, "<b>")
            .replace(/&lt;\/b&gt;/g, "</b>")
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="font-weight: 700; text-decoration: underline;">$1</a>');

        bubble.innerHTML = `
            <div class="message-text">${formattedText}</div>
            <span class="message-time">${timeStr}</span>
        `;

        chatMessages.appendChild(bubble);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // 3. Show/Hide Typing Indicator
    function showTyping() {
        if (typingIndicator) {
            chatMessages.appendChild(typingIndicator); // Move to bottom
            typingIndicator.style.display = 'flex';
            scrollToBottom();
        }
    }

    function hideTyping() {
        if (typingIndicator) {
            typingIndicator.style.display = 'none';
        }
    }

    // 4. Simulate Bot Reply
    function botReply(userMessage) {
        showTyping();

        // Calculate simulated latency based on message length
        const delay = Math.max(1200, Math.min(2200, userMessage.length * 15));

        setTimeout(() => {
            hideTyping();
            
            const cleanMsg = userMessage.toLowerCase().trim();
            let replyText = "";

            // Simple keyword matching
            if (cleanMsg.includes('burnout') || cleanMsg.includes('burn out') || cleanMsg.includes('exhausted') || cleanMsg.includes('tired')) {
                replyText = ariaResponses.burnout;
            } else if (cleanMsg.includes('anxi') || cleanMsg.includes('panic') || cleanMsg.includes('scared') || cleanMsg.includes('nervous')) {
                replyText = ariaResponses.anxiety;
            } else if (cleanMsg.includes('breath') || cleanMsg.includes('inhale') || cleanMsg.includes('exhale')) {
                replyText = ariaResponses.breathing;
            } else if (cleanMsg.includes('stress') || cleanMsg.includes('overwhelm') || cleanMsg.includes('pressure')) {
                replyText = ariaResponses.stressed;
            } else if (cleanMsg.includes('exam') || cleanMsg.includes('test') || cleanMsg.includes('grade') || cleanMsg.includes('study')) {
                replyText = ariaResponses.exam;
            } else if (cleanMsg.includes('sleep') || cleanMsg.includes('awake') || cleanMsg.includes('insomnia') || cleanMsg.includes('night')) {
                replyText = ariaResponses.sleep;
            } else if (cleanMsg.includes('lonely') || cleanMsg.includes('alone') || cleanMsg.includes('isolated')) {
                replyText = ariaResponses.lonely;
            } else if (cleanMsg.includes('sad') || cleanMsg.includes('depress') || cleanMsg.includes('hopeless')) {
                replyText = ariaResponses.depressed;
            } else if (cleanMsg.includes('hello') || cleanMsg.includes('hey')) {
                replyText = ariaResponses.hello;
            } else if (cleanMsg.includes('hi')) {
                replyText = ariaResponses.hi;
            } else if (cleanMsg.includes('thank') || cleanMsg.includes('thanks')) {
                replyText = ariaResponses.thank;
            } else {
                // Pick random fallback response
                replyText = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
            }

            addMessage(replyText, 'assistant');
        }, delay);
    }

    // 5. Send Form Submit Handler
    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (!text) return;

            addMessage(text, 'user');
            chatInput.value = '';
            
            botReply(text);
        });
    }

    // 6. Recommended Sidebar Prompts Trigger
    promptButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const promptText = btn.getAttribute('data-prompt');
            addMessage(promptText, 'user');
            botReply(promptText);
        });
    });

    // Initial greeting
    setTimeout(() => {
        addMessage("Welcome to MindCare support! I'm Aria, your AI wellness companion. How are you feeling today?", 'assistant');
    }, 500);
});