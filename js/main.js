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
            url: "https://formspree.io/f/xanwkgrn",
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