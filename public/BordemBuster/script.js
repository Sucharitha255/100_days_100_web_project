document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const fetchBtn = document.getElementById('fetch-btn');
    const resultContainer = document.getElementById('result-container');
    const activityName = document.getElementById('activity-name');
    const activityType = document.getElementById('activity-type');
    const activityParticipants = document.getElementById('activity-participants');
    const activityPrice = document.getElementById('activity-price');
    const errorMessage = document.getElementById('error-message');

    const durationPill = document.getElementById('pillDuration');
    const difficultyPill = document.getElementById('pillDifficulty');

    // Helper Functions
    function getDuration(activity) {
        if (activity.participants === 1 && activity.price === 0) {
            return 'quick';
        }

        if (activity.participants <= 3) {
            return 'medium';
        }

        return 'long';
    }

    function getDifficulty(activity) {
        if (activity.price === 0) {
            return 'easy';
        }

        if (activity.price <= 0.4) {
            return 'moderate';
        }

        return 'challenging';
    }

    // Fetch Activity Logic
    const fetchActivity = async () => {
        const category = document.getElementById('category').value;
        const participants = document.getElementById('participants').value;
        const budget = document.getElementById('budget').value;

        const durationFilter =
            document.getElementById('duration')?.value || '';

        const difficultyFilter =
            document.getElementById('difficulty')?.value || '';

        // Build API URL
        const apiUrl = new URL(
            'https://bored.api.lewagon.com/api/activity'
        );

        if (category) {
            apiUrl.searchParams.append('type', category);
        }

        if (participants) {
            apiUrl.searchParams.append(
                'participants',
                participants
            );
        }

        if (budget === 'free') {
            apiUrl.searchParams.append('price', '0');
        } else if (budget === 'cheap') {
            apiUrl.searchParams.append('minprice', '0.1');
            apiUrl.searchParams.append('maxprice', '0.4');
        } else if (budget === 'expensive') {
            apiUrl.searchParams.append('minprice', '0.5');
            apiUrl.searchParams.append('maxprice', '1');
        }

        fetchBtn.textContent = 'Seeking...';
        errorMessage.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        try {
            const response = await fetch(apiUrl.toString());

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // API returned no matching activity
            if (data.error) {
                activityName.textContent = 'Hold up!';
                errorMessage.textContent =
                    "We couldn't find an exact match for that vibe. Try tweaking the filters.";
                errorMessage.classList.remove('hidden');

                document
                    .querySelector('.pill-container')
                    ?.classList.add('hidden');

                return;
            }

            // Calculate estimated duration & difficulty
            const duration = getDuration(data);
            const difficulty = getDifficulty(data);

            // Apply custom filters
            const durationMatches =
                !durationFilter ||
                duration === durationFilter;

            const difficultyMatches =
                !difficultyFilter ||
                difficulty === difficultyFilter;

            if (!durationMatches || !difficultyMatches) {
                activityName.textContent =
                    'No matching activity found';

                errorMessage.textContent =
                    'Try adjusting the Duration or Difficulty filters.';

                errorMessage.classList.remove('hidden');

                document
                    .querySelector('.pill-container')
                    ?.classList.add('hidden');

                return;
            }

            // Display activity
            activityName.textContent = data.activity;
            activityType.textContent = `Type: ${data.type}`;
            activityParticipants.textContent =
                `Peeps: ${data.participants}`;

            let priceText = 'Free';

            if (data.price > 0 && data.price <= 0.4) {
                priceText = 'Cheap';
            }

            if (data.price > 0.4) {
                priceText = 'Pricey';
            }

            activityPrice.textContent = `Cost: ${priceText}`;

            // Duration & Difficulty Pills
            if (durationPill) {
                durationPill.textContent =
                    `⏱️ ${duration.charAt(0).toUpperCase() +
                    duration.slice(1)}`;
            }

            if (difficultyPill) {
                difficultyPill.textContent =
                    `🎯 ${difficulty.charAt(0).toUpperCase() +
                    difficulty.slice(1)}`;
            }

            document
                .querySelector('.pill-container')
                ?.classList.remove('hidden');

        } catch (error) {
            console.error('Failed to fetch activity:', error);

            activityName.textContent = 'Signal Lost';

            errorMessage.textContent =
                'Could not connect to the network. Take a breather and try again.';

            errorMessage.classList.remove('hidden');

            document
                .querySelector('.pill-container')
                ?.classList.add('hidden');
        } finally {
            fetchBtn.textContent = 'Find Activity';
        }
    };

    // Event Listener
    fetchBtn.addEventListener('click', fetchActivity);
});