// Mock restaurant data (same as index)
const MOCK_RESTAURANTS = [
    { 
        id: 1, 
        name: "Jollibee Baliwag", 
        rating: 4.5, 
        reviews: 242, 
        cuisine: "Filipino", 
        address: "DRT Hi-way, corner Santiago S. Aquino Avenue, Baliwag, Bulacan", 
        price: "PPP", 
        tags: ["Spicy", "Family-Friendly", "Quick-Bite"], 
        isOpen: true, 
        imageUrl: "src/asset/images/jabi.png",
        reviewsList: [
            { 
                user: "Maria S.", 
                rating: 5, 
                comment: "Absolutely delicious! The Chickenjoy was perfectly seasoned and fried, soft on my tongue. Definitely coming back for more.", 
                tags: ["Spicy", "Family-Friendly", "Quick-Bite"] 
            },
            { 
                user: "John D.", 
                rating: 4, 
                comment: "Great crispy chicken for a quick, simple meal. Wait. A bit costly, but tastes so great (as count wise) pretty good!", 
                tags: ["Spicy", "Family-Friendly", "Quick-Bite"] 
            }
        ]
    },
    { 
        id: 2, 
        name: "Max's Restaurant", 
        rating: 4.3, 
        reviews: 187, 
        cuisine: "Malaysian", 
        address: "Sofia Remedios Trinidad Hiway, Tanco Compound, Baliwag, Bulacan", 
        price: "PPP", 
        tags: ["Authentic", "Family-Friendly", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/kenny.png",
        reviewsList: [
            { 
                user: "Sarah L.", 
                rating: 5, 
                comment: "Best fried chicken in town! The gravy is amazing too.", 
                tags: ["Authentic", "Family-Friendly"] 
            },
            { 
                user: "Mike R.", 
                rating: 4, 
                comment: "Good food, friendly staff. A bit pricey but worth it.", 
                tags: ["Comfort-Food", "Family-Friendly"] 
            }
        ]
    },
    { 
        id: 3, 
        name: "D' Grill House", 
        rating: 4.2, 
        reviews: 321, 
        cuisine: "Filipino", 
        address: "J.P. Cale Road, Baliwag, 3006 Bulacan", 
        price: "PPP", 
        tags: ["Spicy", "Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/gdrills.png",
        reviewsList: [
            { 
                user: "Anna T.", 
                rating: 4, 
                comment: "Great grilled dishes! Very flavorful and good portions.", 
                tags: ["Spicy", "Comfort-Food"] 
            },
            { 
                user: "Carlos M.", 
                rating: 4, 
                comment: "Solid grill place with reasonable prices.", 
                tags: ["Family", "Comfort-Food"] 
            }
        ]
    },
    { 
        id: 4, 
        name: "Millhouse", 
        rating: 4.6, 
        reviews: 367, 
        cuisine: "Filipino", 
        address: "224 A. Mabini St, Baliwag, Bulacan, Philippines", 
        price: "PPP", 
        tags: ["Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/mill.png",
        reviewsList: [
            { 
                user: "Lisa P.", 
                rating: 5, 
                comment: "Cozy atmosphere and delicious Filipino comfort food!", 
                tags: ["Family", "Comfort-Food"] 
            },
            { 
                user: "Robert K.", 
                rating: 4, 
                comment: "Nice place for family dinners. Good service.", 
                tags: ["Family", "Comfort-Food"] 
            }
        ]
    },
    { 
        id: 5, 
        name: "Mang Inasal - SM", 
        rating: 4.6, 
        reviews: 445, 
        cuisine: "Filipino", 
        address: "DRT Hi-way, corner Santiago S. Aquino Avenue, SM Baliwag", 
        price: "PPP", 
        tags: ["Spicy", "Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/inasal.png",
        reviewsList: [
            { 
                user: "Jenny S.", 
                rating: 5, 
                comment: "Best chicken inasal! Unlimited rice is a plus!", 
                tags: ["Spicy", "Family"] 
            },
            { 
                user: "Mark V.", 
                rating: 4, 
                comment: "Consistent quality and great value for money.", 
                tags: ["Comfort-Food", "Family"] 
            }
        ]
    },
    { 
        id: 6, 
        name: "EC Cafe", 
        rating: 4.6, 
        reviews: 154, 
        cuisine: "Filipino", 
        address: "828 F. Vergel de Dios St, Baliwag, Bulacan", 
        price: "PPP", 
        tags: ["Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "src/asset/images/cafe.png",
        reviewsList: [
            { 
                user: "Grace W.", 
                rating: 5, 
                comment: "Perfect cafe for relaxing and good food!", 
                tags: ["Comfort-Food"] 
            },
            { 
                user: "Tom H.", 
                rating: 4, 
                comment: "Nice ambiance and tasty dishes. Recommended!", 
                tags: ["Family", "Comfort-Food"] 
            }
        ]
    },
];

/**
 * Get restaurant ID from URL parameter
 */
function getRestaurantIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return parseInt(urlParams.get('id'));
}

/**
 * Find restaurant by ID
 */
function findRestaurantById(id) {
    return MOCK_RESTAURANTS.find(r => r.id === id);
}

/**
 * Populate restaurant details on the page
 */
function populateRestaurantDetails(restaurant) {
    document.getElementById('restaurant-image').src = restaurant.imageUrl;
    document.getElementById('restaurant-name').textContent = restaurant.name;
    document.getElementById('restaurant-rating').textContent = restaurant.rating.toFixed(1);
    document.getElementById('restaurant-reviews').textContent = `(${restaurant.reviews} reviews)`;
    document.getElementById('restaurant-cuisine').textContent = restaurant.cuisine;
    document.getElementById('restaurant-price').textContent = restaurant.price;
    document.getElementById('restaurant-address').textContent = restaurant.address;
}

/**
 * Create HTML for a single review
 */
function createReviewHTML(review) {
    const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
    const tagElements = review.tags.map(tag => 
        `<span class="bg-tag-bg text-gray-700 text-xs px-3 py-1 rounded-full">${tag}</span>`
    ).join('');

    return `
        <div class="review-card border border-gray-100">
            <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-semibold text-gray-600">
                        ${review.user.charAt(0)}
                    </div>
                    <div>
                        <p class="font-semibold text-gray-900">${review.user}</p>
                        <div class="text-loyalty-gold text-sm">${stars}</div>
                    </div>
                </div>
                <p class="text-sm text-gray-500 font-medium">${review.rating.toFixed(1)}</p>
            </div>
            <p class="text-gray-700 text-sm mb-3">${review.comment}</p>
            <div class="flex flex-wrap gap-2">
                ${tagElements}
            </div>
        </div>
    `;
}

/**
 * Populate reviews section
 */
function populateReviews(restaurant) {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = restaurant.reviewsList.map(createReviewHTML).join('');
}

/**
 * Show error page if restaurant not found
 */
function showErrorPage() {
    document.body.innerHTML = `
        <div class="max-w-7xl mx-auto p-8 text-center">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h1>
            <a href="index.html" class="text-accent-orange hover:underline text-lg">Back to restaurants</a>
        </div>
    `;
}

/**
 * Initialize the restaurant detail page
 */
function initializeRestaurantDetail() {
    const restaurantId = getRestaurantIdFromUrl();
    const restaurant = findRestaurantById(restaurantId);

    if (restaurant) {
        populateRestaurantDetails(restaurant);
        populateReviews(restaurant);
    } else {
        showErrorPage();
    }
}

// Run initialization when page loads
window.onload = initializeRestaurantDetail;