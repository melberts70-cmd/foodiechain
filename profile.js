// Load favorites count for the badge
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

/**
 * Update the favorites count badge
 */
function updateFavoritesCount() {
    const favCountBadge = document.getElementById('fav-count');
    if (favCountBadge) {
        favCountBadge.textContent = favorites.length;
        if (favorites.length > 0) {
            favCountBadge.classList.remove('hidden');
        } else {
            favCountBadge.classList.add('hidden');
        }
    }
}

/**
 * User profile data (mock data - in real app this would come from backend)
 */
const userProfile = {
    name: "Food Explorer",
    memberSince: "2024",
    totalVisits: 24,
    placesVisited: 8,
    loyaltyPoints: 850,
    recentActivities: [
        {
            type: "payment",
            title: "Payment Successful",
            restaurant: "Jollibee Baliwag",
            time: "Today",
            color: "accent-orange"
        },
        {
            type: "favorite",
            title: "Added to favorites",
            restaurant: "Max's Restaurant",
            time: "2 days ago",
            color: "blue-500"
        },
        {
            type: "review",
            title: "Review",
            restaurant: "You reviewed Millhouse",
            time: "3 days ago",
            color: "green-500"
        },
        {
            type: "loyalty",
            title: "Loyalty",
            restaurant: "You earned 50 points at EC Cafe",
            time: "5 days ago",
            color: "purple-500"
        }
    ],
    loyaltyProgress: [
        {
            restaurant: "Max's Restaurant",
            visits: 3,
            required: 5,
            reward: "PPP 50 for a trip",
            awayText: "3 visits away",
            progress: 60
        },
        {
            restaurant: "Jollibee's",
            visits: 5,
            required: 10,
            reward: "PPP 200 for a trip",
            awayText: "5 orders away",
            progress: 40
        },
        {
            restaurant: "Mang Inasal",
            visits: 2,
            required: 6,
            reward: "PPP 100 for a reward",
            awayText: "4 orders away",
            progress: 33
        }
    ]
};

/**
 * Initialize the profile page
 */
function initializeProfile() {
    updateFavoritesCount();
    
    // You can add more dynamic content here
    // For example, load user's actual recent orders, reviews, etc.
    console.log("Profile loaded for:", userProfile.name);
}

// Run initialization when page loads
window.onload = initializeProfile;