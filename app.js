const adviceElement = document.getElementById('advice');
const getAdviceButton = document.querySelector('button');

const getAdvice = async () => {
    getAdviceButton.disabled = true;
    getAdviceButton.classList.add('opacity-50', 'cursor-not-allowed');
    adviceElement.innerHTML = '<p class="text-2xl text-white font-light italic leading-relaxed">Channeling wisdom...</p>';

    const timestamp = Date.now();
    const url = `https://api.adviceslip.com/advice?timestamp=${timestamp}`;
   
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayAdvice(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        adviceElement.innerHTML = '<p class="text-2xl text-red-300 font-light italic leading-relaxed">Oops! Our wisdom well is dry. Try again soon.</p>';
    } finally {
        getAdviceButton.disabled = false;
        getAdviceButton.classList.remove('opacity-50', 'cursor-not-allowed');
    }
};

const displayAdvice = (data) => {
    adviceElement.innerHTML = `
        <p class="text-2xl text-white font-light italic leading-relaxed">"${data.slip.advice}"</p>
        <p class="text-sm text-indigo-300 mt-4 font-semibold">WISDOM #${data.slip.id}</p>
    `;
};

const shareAdvice = () => {
    const adviceText = document.querySelector('#advice p').textContent;
    if (navigator.share) {
        navigator.share({
            title: 'Wisdom from Wisdom Whisper',
            text: adviceText,
            url: window.location.href,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        const textArea = document.createElement('textarea');
        textArea.value = adviceText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Wisdom copied to clipboard! Share it with the world.');
    }
};


function toggleTheme() {
    const htmlElement = document.documentElement;
    htmlElement.classList.toggle('dark');
    if (htmlElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
});