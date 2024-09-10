$(document).ready(function () {
    $('nav a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - $('header').outerHeight()
            }, 800);
        }
    });
});

$(document).ready(function () {
    const servicesContainer = $('.services-container');
    const scrollSpeed = 0.5; // pixels per frame
    let scrollPosition = 0;
    let animationId;

    // Clone items to ensure smooth looping
    const items = servicesContainer.children().clone();
    servicesContainer.append(items);

    function autoScroll() {
        scrollPosition += scrollSpeed;

        // Reset position when we've scrolled the width of all original items
        if (scrollPosition >= servicesContainer.children().length * 270 / 2) {
            scrollPosition = 0;
        }

        servicesContainer.css('transform', `translateX(${-scrollPosition}px)`);
        animationId = requestAnimationFrame(autoScroll);
    }

    // Start auto-scrolling
    autoScroll();

    // Pause scrolling when mouse enters the services section
    $('.services-scroll').on('mouseenter', function () {
        cancelAnimationFrame(animationId);
    });

    // Resume scrolling when mouse leaves the services section
    $('.services-scroll').on('mouseleave', function () {
        autoScroll();
    });

    // Mobile menu toggle
    $('#menuToggle').click(function () {
        $('#navMenu').toggleClass('show');
    });

    // Close menu when clicking outside
    $(document).click(function (event) {
        var target = $(event.target);
        if (!target.closest('#navMenu').length && !target.closest('#menuToggle').length) {
            $('#navMenu').removeClass('show');
        }
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Shrink header on scroll
    $(window).scroll(function () {
        if ($(document).scrollTop() > 50) {
            $('header').addClass('scrolled');
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Form submission using Formspree
    $('#contact-form').submit(function (e) {
        e.preventDefault();

        // Basic form validation
        let isValid = true;
        $('#contact-form input[required], #contact-form textarea[required]').each(function () {
            if ($(this).val().trim() === '') {
                isValid = false;
                $(this).addClass('error');
            } else {
                $(this).removeClass('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
            return;
        }

        // Collect form data
        let formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            inquiry: [],
            message: $('#message').val()
        };

        // Collect checkbox values
        $('input[name="inquiry"]:checked').each(function () {
            formData.inquiry.push($(this).val());
        });

        // Formspree AJAX submission
        $.ajax({
            url: "https://formspree.io/f/xdknjrqo",
            method: 'POST',
            data: formData,
            dataType: 'json',
            success: function (response) {
                alert('Thank you for your message. We will get back to you soon!');
                $('#contact-form')[0].reset();
            },
            error: function (xhr, status, error) {
                alert('An error occurred. Please try again later.');
                console.error(error);
            }
        });
    });

    // Add error class on blur if field is empty
    $('#contact-form input[required], #contact-form textarea[required]').blur(function () {
        if ($(this).val().trim() === '') {
            $(this).addClass('error');
        } else {
            $(this).removeClass('error');
        }
    });
});

function initMap() {
    // Coordinates for Brevard County
    const brevardCenter = { lat: 28.3118, lng: -80.7340 };

    // Create the map
    const map = new google.maps.Map(document.getElementById("map"), {
        center: brevardCenter,
        zoom: 10,
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#00A86B" }]
            },
            {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#FFFFFF" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#FFFFFF" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#89BF8B" }]
            }
        ]
    });

    // Define locations
    const locations = [
        { name: "Merritt Island", lat: 28.3180, lng: -80.6659 },
        { name: "Cocoa Beach", lat: 28.3200, lng: -80.6076 },
        { name: "Titusville", lat: 28.6122, lng: -80.8077 },
        { name: "Melbourne", lat: 28.0836, lng: -80.6081 },
        { name: "Rockledge", lat: 28.3247, lng: -80.7328 },
        { name: "Palm Bay", lat: 28.0345, lng: -80.5887 },
        { name: "Viera", lat: 28.2619, lng: -80.7351 },
        { name: "Satellite Beach", lat: 28.1756, lng: -80.5901 },
        { name: "Cape Canaveral", lat: 28.3922, lng: -80.6077 },
        { name: "Indialantic", lat: 28.0889, lng: -80.5673 }
    ];

    // Add markers for each location
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name
        });

        // Add click event to open info window
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${location.name}</h3><p>We provide service here!</p>`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}

$(document).ready(function () {
    $('.menu-icon').click(function () {
        $('nav ul').toggleClass('show');
    });

    // Close menu when a link is clicked
    $('nav ul li a').click(function () {
        $('nav ul').removeClass('show');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('header');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    // Shrink header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // Close mobile menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
        });
    });
});