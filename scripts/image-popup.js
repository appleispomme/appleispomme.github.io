$(function () {
    $(document).on('click', '.pop', function (e) {
        e.preventDefault();

        var modalEl = document.getElementById('imagemodal');
        if (!modalEl || typeof bootstrap === 'undefined') return;

        $('.imagepreview').attr('src', $(this).find('img').attr('src'));

        var imageModal = bootstrap.Modal.getOrCreateInstance(modalEl);
        imageModal.show();
    });
});