document.addEventListener('DOMContentLoaded', function() {
    const requestRoomLink = document.getElementById('requestRoomLink');
    const selectRoomLink = document.getElementById('selectRoomLink');
    const requestRoomSection = document.getElementById('request-room');
    const selectRoomSection = document.getElementById('select-room');

    requestRoomLink.addEventListener('click', function(event) {
        event.preventDefault();
        toggleSection(requestRoomSection);
    });

    selectRoomLink.addEventListener('click', function(event) {
        event.preventDefault();
        toggleSection(selectRoomSection);
    });

    function toggleSection(section) {
        section.classList.toggle('hidden');
    }
});