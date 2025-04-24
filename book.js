// Calendar and Time Slot Management
const calendar = document.getElementById('calendar');
const timeSlots = document.getElementById('time-slots');
const timeBoxHeader = document.querySelector('#time-box h2');
let selectedDate = null; // Track the selected date
let selectedTime = null; // Track the selected time

// Generate the calendar for the current month
function generateCalendar() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();
    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.classList.add('disabled');
        calendar.appendChild(emptySlot);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const daySlot = document.createElement('div');
        daySlot.textContent = day;

        // Add click event to select the date
        daySlot.addEventListener('click', () => {
            if (selectedDate) {
                selectedDate.classList.remove('selected'); // Remove the green highlight from the previously selected date
            }
            daySlot.classList.add('selected'); // Highlight the selected date
            selectedDate = daySlot; // Update the selected date

            updateTimeSlots(day, month + 1, year);
        });

        calendar.appendChild(daySlot);
        if (day === 1) {
            daySlot.classList.add('selected'); // Highlight the first date
            selectedDate = daySlot; // Set the first date as selected
            updateTimeSlots(day, month + 1, year); // Display times for the first date
        }
    }
}

// Update the time slots dynamically based on the selected date
function updateTimeSlots(day, month, year) {
    // Update the header to show the selected date
    timeBoxHeader.textContent = `Available Times for ${day}/${month}/${year}`;

    // Clear the previous time slots
    timeSlots.innerHTML = '';

    // Generate new time slots
    const times = generateTimes(17, 23, 30); // Generate times between 17:00 and 23:00 with 30-minute intervals
    times.forEach((time) => {
        const timeSlot = document.createElement('div');
        timeSlot.textContent = time;

        // Add click event to select the time
        timeSlot.addEventListener('click', () => {
            if (selectedTime) {
                selectedTime.classList.remove('selected'); // Remove the green highlight from the previously selected time
            }
            timeSlot.classList.add('selected'); // Highlight the selected time
            selectedTime = timeSlot; // Update the selected time
        });

        timeSlots.appendChild(timeSlot);
    });
}

// Generate time slots between start and end hours with a given interval (in minutes)
function generateTimes(startHour, endHour, interval) {
    const times = [];
    for (let hour = startHour; hour < endHour; hour++) {
        for (let minutes = 0; minutes < 60; minutes += interval) {
            const formattedTime = `${hour.toString().padStart(2, '0')}:${minutes
                .toString()
                .padStart(2, '0')}`;
            times.push(formattedTime);
        }
    }
    return times;
}

// Initialize the calendar
generateCalendar();

// People Count Management
const minusBtn = document.getElementById('minus-btn');
const plusBtn = document.getElementById('plus-btn');
const peopleCount = document.getElementById('people-count');

// Set the initial number of people
let count = 1;

// Decrease the number of people
minusBtn.addEventListener('click', () => {
    if (count > 1) { // Ensure the count doesn't go below 1
        count--;
        peopleCount.textContent = count;
    }
});

// Increase the number of people
plusBtn.addEventListener('click', () => {
    count++;
    peopleCount.textContent = count;
});

// Payment Method Management
document.addEventListener('DOMContentLoaded', () => {
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    const creditCardDetails = document.querySelector('.credit-card-details');
    const paypalDetails = document.querySelector('.paypal-details');
    const mobilepayDetails = document.querySelector('.mobilepay-details');

    // Hide all payment details initially
    function hideAllDetails() {
        creditCardDetails.classList.add('hidden');
        paypalDetails.classList.add('hidden');
        mobilepayDetails.classList.add('hidden');
    }

    // Add event listeners to payment method radio buttons
    paymentInputs.forEach((input) => {
        input.addEventListener('change', () => {
            hideAllDetails(); // Hide all details first

            // Show the relevant details based on the selected payment method
            if (input.value === 'credit-card') {
                creditCardDetails.classList.remove('hidden');
            } else if (input.value === 'paypal') {
                paypalDetails.classList.remove('hidden');
            } else if (input.value === 'mobilepay') {
                mobilepayDetails.classList.remove('hidden');
            }
        });
    });
});

// Book Now Button Logic
document.addEventListener('DOMContentLoaded', () => {
    const bookNowBtn = document.getElementById('book-now-btn');
    const calendarDates = document.querySelectorAll('#calendar div'); // Calendar dates
    const timeSlots = document.getElementById('time-slots'); // Time slots container
    const nameInput = document.getElementById('name'); // Name input
    const emailInput = document.getElementById('email'); // Email input
    const phoneInput = document.getElementById('phone'); // Phone input
    const paymentInputs = document.querySelectorAll('.payment-container input[type="radio"]'); // Payment method radio buttons

    let selectedDate = false;
    let selectedTime = false;
    let nameEntered = false;
    let emailEntered = false;
    let phoneEntered = false;
    let paymentSelected = false;
    let paymentDetailsEntered = false;

    // Function to check if all conditions are met
    function checkAllConditions() {
        if (
            selectedDate &&
            selectedTime &&
            nameEntered &&
            emailEntered &&
            phoneEntered &&
            paymentSelected &&
            paymentDetailsEntered
        ) {
            bookNowBtn.disabled = false; // Enable the button
            bookNowBtn.classList.add('enabled'); // Add the enabled class for styling
        } else {
            bookNowBtn.disabled = true; // Keep the button disabled
            bookNowBtn.classList.remove('enabled'); // Remove the enabled class
        }
    }

    // Add event listeners for calendar dates
    calendarDates.forEach((date) => {
        date.addEventListener('click', () => {
            selectedDate = true;
            checkAllConditions();
        });
    });

    // Add event listeners for time slots
    timeSlots.addEventListener('click', (event) => {
        if (event.target.tagName === 'DIV') {
            selectedTime = true;
            checkAllConditions();
        }
    });

    // Add event listeners for name, email, and phone inputs
    nameInput.addEventListener('input', () => {
        nameEntered = nameInput.value.trim() !== '';
        checkAllConditions();
    });

    emailInput.addEventListener('input', () => {
        emailEntered = emailInput.value.trim() !== '';
        checkAllConditions();
    });

    phoneInput.addEventListener('input', () => {
        phoneEntered = phoneInput.value.trim() !== '';
        checkAllConditions();
    });

    // Add event listeners for payment method selection
    paymentInputs.forEach((input) => {
        input.addEventListener('change', () => {
            paymentSelected = true;

            // Check payment details for the selected payment method
            const selectedPaymentMethod = input.value;
            const paymentDetailsContainer = document.querySelector(`.${selectedPaymentMethod}-details`);
            const paymentDetailsInputs = paymentDetailsContainer.querySelectorAll('input');

            // Add event listeners to payment details inputs
            paymentDetailsInputs.forEach((input) => {
                input.addEventListener('input', () => {
                    // Check if all inputs for the selected payment method are filled
                    paymentDetailsEntered = Array.from(paymentDetailsInputs).every(
                        (input) => input.value.trim() !== ''
                    );
                    checkAllConditions();
                });
            });

            // Trigger a check in case the inputs are already filled
            paymentDetailsEntered = Array.from(paymentDetailsInputs).every(
                (input) => input.value.trim() !== ''
            );
            checkAllConditions();
        });
    });

    // Add a click event for the "Book Now" button
    bookNowBtn.addEventListener('click', () => {
        if (!bookNowBtn.disabled) {
            alert('Booking confirmed!');
            // Add your booking logic here
        }
    });
});