const members = {
    "101": { name: "Amit Sharma", lastPaid: "2025-06-01", nextDue: "2025-07-01T00:00:00" },
    "102": { name: "Priya Mehra", lastPaid: "2025-06-05", nextDue: "2025-07-05T00:00:00" },
    "103": { name: "Rohan Patel", lastPaid: "2025-06-10", nextDue: "2025-07-10T00:00:00" },
    "104": { name: "Neha Verma", lastPaid: "2025-06-15", nextDue: "2025-07-15T00:00:00" },
    "105": { name: "Suresh Yadav", lastPaid: "2025-06-20", nextDue: "2025-07-20T00:00:00" },
    "106": { name: "Anjali Singh", lastPaid: "2025-06-25", nextDue: "2025-07-25T00:00:00" },
    "107": { name: "Vikram Joshi", lastPaid: "2025-06-28", nextDue: "2025-07-28T00:00:00" },
    "108": { name: "Sneha Desai", lastPaid: "2025-06-30", nextDue: "2025-07-30T00:00:00" },
    "109": { name: "Rahul Nair", lastPaid: "2025-07-01", nextDue: "2025-08-01T00:00:00" },
    "110": { name: "Kriti Pandey", lastPaid: "2025-07-05", nextDue: "2025-08-05T00:00:00" }
};

let countdownInterval;

// Function to register a new member
function registerMember(id, name, lastPaid, nextDue) {
    if (members[id]) {
        alert("Member ID already exists.");
        return;}
    
    members[id] = { name, lastPaid, nextDue };
    alert(`Member ${name} registered successfully!`);
}

// Function to get member details
function getMemberDetails() {
    const memberId = document.getElementById('memberId').value.trim();
    const info = document.getElementById('memberInfo');
    const countdown = document.getElementById('countdown');
    const error = document.getElementById('error');
    const paymentButton = document.getElementById('paymentButton');

    clearInterval(countdownInterval);
    info.innerHTML = '';
    countdown.innerHTML = '';
    error.innerHTML = '';

    // Hide the blocks initially
    info.style.display = 'none';
    countdown.style.display = 'none';
    error.style.display = 'none';
    paymentButton.style.display = 'none';

    if (!memberId || !members[memberId]) {
        error.innerText = "Member not found. Please check your ID.";
        error.style.display = 'block';
        return;
    }

    const member = members[memberId];

    info.innerHTML = `
        <p><strong>Name:</strong> ${member.name}</p>
        <p><strong>Last Payment:</strong> ${member.lastPaid}</p>
        <p><strong>Next Due:</strong> ${new Date(member.nextDue).toDateString()}</p>
    `;

    // Show the blocks when details are fetched
    info.style.display = 'block';
    countdown.style.display = 'block';
    paymentButton.style.display = 'inline-block';

    startCountdown(new Date(member.nextDue));
}

function startCountdown(dueDate) {
    const countdown = document.getElementById('countdown');

    countdownInterval = setInterval(() => {
        const now = new Date();
        const diff = dueDate - now;

        if (diff <= 0) {
            clearInterval(countdownInterval);
            countdown.innerHTML = "⏰ Due date has passed!";
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdown.innerHTML = `⏳ Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
}

// Payment section logic
document.addEventListener('DOMContentLoaded', () => {
    const paymentButton = document.getElementById('paymentButton');
    const paymentOptions = document.getElementById('paymentOptions');
    const submitPayment = document.getElementById('submitPayment');

    paymentButton.addEventListener('click', () => {
        if (paymentOptions.style.display === 'none') {
            paymentOptions.style.display = 'block';
        } else {
            paymentOptions.style.display = 'none';
        }
    });

    submitPayment.addEventListener('click', () => {
        const membershipPlan = document.getElementById('membershipPlan').value;
        const paymentMethod = document.getElementById('paymentMethod').value;

        alert(`Payment submitted!\nMembership Plan: ${membershipPlan}\nPayment Method: ${paymentMethod}`);
        paymentOptions.style.display = 'none';
    });

    // Register form submission
    document.getElementById('registerForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submit

        const id = document.getElementById('newMemberId').value.trim();
        const name = document.getElementById('newMemberName').value.trim();
        const lastPaid = document.getElementById('lastPaid').value.trim();
        const nextDue = document.getElementById('nextDue').value.trim();

        registerMember(id, name, lastPaid, nextDue);
        document.getElementById('registerForm').reset();
    });
});
