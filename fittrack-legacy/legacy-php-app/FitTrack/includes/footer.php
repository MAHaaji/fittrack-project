    <footer class="container mt-4 text-center border-top pt-4 pb-3">
        <p>&copy; FitTrack - Created for educational purposes</p>
    </footer>
    <script>
        document.addEventListener('DOMContentLoaded', function () {
            const toggler = document.getElementById('customToggler');
            const navbarContent = document.getElementById('navbarContent');

            toggler.addEventListener('click', function () {
                const isExpanded = toggler.getAttribute('aria-expanded') === 'true';

                // Toggle the collapse class manually
                if (isExpanded) {
                    navbarContent.classList.remove('show');
                    toggler.setAttribute('aria-expanded', 'false');
                } else {
                    navbarContent.classList.add('show');
                    toggler.setAttribute('aria-expanded', 'true');
                }
            });
        });
    </script>
</body>
</html>