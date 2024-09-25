// reviews.js
let db;

$(document).ready(function () {
    // Initialize Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyC2OKBWmAXn9yU8MbdiX4_KAgWxluLJXXE",
        authDomain: "opportunity-931cd.firebaseapp.com",
        projectId: "opportunity-931cd",
        storageBucket: "opportunity-931cd.appspot.com",
        messagingSenderId: "582923732377",
        appId: "1:582923732377:web:1e006003cd9ec6ce7f7f08",
        measurementId: "G-7DVFB3ENCG"
    };

    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();

    // Load existing reviews
    loadReviews();

    // Handle form submission
    $('#review-form').submit(function (e) {
        e.preventDefault();

        // Get form data
        var name = $('#name').val();
        var rating = $('#rating').val();
        var reviewText = $('#review-text').val();

        // Create a new review object
        var newReview = {
            name: name,
            rating: parseInt(rating),
            text: reviewText,
            date: new Date().toISOString()
        };

        // Add the new review to Firestore
        addReviewToFirestore(newReview);

        // Clear the form
        this.reset();
    });
});

function loadReviews() {
    db.collection("reviews").orderBy("date", "desc").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            addReviewToList(doc.data());
        });
    });
}

function addReviewToFirestore(review) {
    db.collection("reviews").add(review)
        .then((docRef) => {
            console.log("Review written with ID: ", docRef.id);
            addReviewToList(review);
        })
        .catch((error) => {
            console.error("Error adding review: ", error);
        });
}

function addReviewToList(review) {
    var stars = '<span class="stars">' + '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) + '</span>';
    var reviewDate = new Date(review.date).toLocaleDateString();
    var reviewHtml = `
        <div class="review">
            <h3>${review.name} ${stars}</h3>
            <p>${review.text}</p>
            <small>${reviewDate}</small>
        </div>
    `;
    $('#review-list').prepend(reviewHtml);
}