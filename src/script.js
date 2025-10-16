const MOCK_RESTAURANTS = [
    { id: 1, 
        name: "Jollibee Baliwag", 
        rating: 4.5, reviews: 242, 
        cuisine: "Filipino", 
        address: "DRT Hi-way, corner Santiago S. Aquino...", 
        price: "PPP", 
        tags: ["Spicy", "Family-Friendly", "Quick-Bite"], 
        isOpen: true, 
        imageUrl: "asset/images/jabi.png" 
    },
    { id: 2, 
        name: "Max's Restaurant", 
        rating: 4.3, reviews: 187, 
        cuisine: "Malaysian", 
        address: "Sofia Remedios Trinidad Hiway, Tanco...", 
        price: "PPP", 
        tags: ["Authentic", "Family-Friendly", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "asset/images/kenny.png" 
    },
    { id: 3, 
        name: "D' Grill House", 
        rating: 4.2, 
        reviews: 321, 
        cuisine: "Filipino", 
        address: "J.P. Cale Road, Baliwag, 3006 Bulacan", 
        price: "PPP", 
        tags: ["Spicy", "Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "asset/images/gdrills.png" 
    },
    { id: 4, 
        name: "Millhouse", 
        rating: 4.6, 
        reviews: 367, 
        cuisine: "Filipino", 
        address: "224 A. Mabini St, Baliwag, Bulacan...", 
        price: "PPP", 
        tags: ["Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "asset/images/mill.png" 
    },
    { id: 5, 
        name: "Mang Inasal - SM", 
        rating: 4.6, 
        reviews: 445, 
        cuisine: "Filipino", 
        address: "DRT Hi-way, corner Santiago S. Aquino...", 
        price: "PPP", 
        tags: ["Spicy", "Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "asset/images/inasal.png" 
    },
    { id: 6, 
        name: "EC Cafe", 
        rating: 4.6, 
        reviews: 154, 
        cuisine: "Filipino", 
        address: "828 F. Vergel de Dios St, Bali...", 
        price: "PPP", 
        tags: ["Family", "Comfort-Food"], 
        isOpen: true, 
        imageUrl: "asset/images/cafe.png" 
    },
];

// Unique filter tags for the filter bar (excluding duplicates and sorting for consistency)
const ALL_TAGS = Array.from(new Set(MOCK_RESTAURANTS.flatMap(r => r.tags))).sort();

// --- DOM Selectors ---
const restaurantGrid = document.getElementById('restaurant-grid');
const loadingIndicator = document.getElementById('loading-indicator');
const filterContainer = document.getElementById('category-filters');

let activeTag = 'Spicy'; // Default active tag

// --- Core Functions ---

/**
 * Generates the HTML for a single restaurant card.
 * @param {object} restaurant - The restaurant data object.
 * @returns {string} The HTML string for the card.
 */
function createRestaurantCard(restaurant) {
    const starIcon = `<svg class="w-4 h-4 text-loyalty-gold fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;

    const statusBadge = restaurant.isOpen 
        ? `<span class="status-badge open flex items-center gap-2 ">
                <img src="asset/images/clock.png" alt="Open" class="clock-icon w-3 h-3 color-white ">
                Open
           </span>` 
        : `<span class="status-badge closed">
                <img src="asset/images/clock.png" alt="Open" class="clock-icon w-3 h-3">
                Closed
           </span>`
           ;
    // Tags for the bottom section (limited to 3 for clean layout)
    const tagElements = restaurant.tags.slice(0, 3).map(tag => 
        `<span class="bg-tag-bg text-gray-700 text-xs px-2 py-1 rounded-full whitespace-nowrap transition duration-200 hover:bg-gray-200">${tag}</span>`
    ).join('');

    return `
        <div class="bg-card-bg rounded-xl overflow-hidden figma-shadow transition duration-300 cursor-pointer border border-gray-100">
            <div class="relative h-40 w-full">
                <img src="${restaurant.imageUrl}" alt="${restaurant.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x250/F8D8D8/333?text=Restaurant+Image';" class="w-full h-full object-cover">
                <div class="absolute top-2 left-2 p-1 bg-black bg-opacity-60 rounded-full text-white text-xs font-medium">
                    ${statusBadge}
                </div>
            </div>
            <div class="p-4 flex flex-col justify-between h-auto">
                <div>
                    <div class="flex items-center justify-between mb-2">
                        <h3 class="text-lg font-bold text-gray-800 truncate">${restaurant.name}</h3>
                        <div class="flex items-center text-sm font-medium ml-2 flex-shrink-0">
                            ${starIcon}
                            <span class="ml-1 text-gray-700">${restaurant.rating.toFixed(1)}</span>
                            <span class="text-xs text-gray-500 ml-1">(${restaurant.reviews})</span>
                        </div>
                    </div>
                    
                    <p class="text-sm text-gray-500 mb-1">${restaurant.address.substring(0, 30)}...</p>
                    <p class="text-xs text-foodie-brand font-semibold mb-3">${restaurant.cuisine}</p>
                </div>

                <!-- Price & Tags Section -->
                <div class="flex justify-between items-end border-t pt-3">
                    <span class="text-lg font-extrabold text-gray-700">${restaurant.price}</span>
                    <div class="flex flex-wrap gap-2 justify-end">
                        ${tagElements}
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Handles the click event for a filter tag.
 * @param {string} tag - The tag to filter by.
 */
function handleFilterClick(tag) {
    activeTag = tag;
    renderRestaurants(activeTag);
    
    // Update button styles
    document.querySelectorAll('.filter-tag').forEach(btn => {
        btn.classList.remove('active-filter');
        if (btn.getAttribute('data-tag') === tag) {
            btn.classList.add('active-filter');
        }
    });
}

/**
 * Renders the category filter buttons dynamically and attaches listeners.
 */
function renderFilters() {
    // Include 'All' as the first option, then the unique tags
    const tagsToDisplay = ['All', ...ALL_TAGS];

    filterContainer.innerHTML = tagsToDisplay.map(tag => `
        <button data-tag="${tag}" class="filter-tag bg-tag-bg text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition duration-200 hover:bg-gray-200">${tag}</button>
    `).join('');

    // Attach click listeners
    document.querySelectorAll('.filter-tag').forEach(button => {
        button.addEventListener('click', (e) => {
            const tag = e.currentTarget.getAttribute('data-tag');
            handleFilterClick(tag);
        });
    });
}

/**
 * Renders the list of restaurant cards to the DOM.
 * @param {string} filterTag - The tag to filter by ('All' or a specific tag).
 */
function renderRestaurants(filterTag) {
    loadingIndicator.style.display = 'block'; 
    restaurantGrid.innerHTML = ''; // Clear existing content
    
    // Simulate a brief network delay for realism
    setTimeout(() => {
        const filteredRestaurants = filterTag === 'All'
            ? MOCK_RESTAURANTS
            : MOCK_RESTAURANTS.filter(r => r.tags.includes(filterTag));

        if (filteredRestaurants.length > 0) {
            restaurantGrid.innerHTML = filteredRestaurants.map(createRestaurantCard).join('');
        } else {
            restaurantGrid.innerHTML = '<div class="col-span-full text-center p-8 text-gray-500 text-lg">No restaurants matching the tag "'+ filterTag +'" were found.</div>';
        }

        loadingIndicator.style.display = 'none';
    }, 300); 
}

/**
 * Initializes the application.
 */
function initializeApp() {
    renderFilters();
    // Initial Render: Filter by the default active tag ('Spicy' to match the original image)
    handleFilterClick(activeTag);
}

// Run the initialization function when the window loads
window.onload = initializeApp;