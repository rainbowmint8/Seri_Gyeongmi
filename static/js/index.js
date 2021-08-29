document.addEventListener("mousemove", parallax);

function parallax(e) {
    this.querySelectorAll('.layer').forEach(layer => {
        const speed = layer.getAttribute('data-speed');

        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
    })
}

//냉장고 
$(document).ready(function(){
    $("#loading").delay(2000).fadeOut();
    $('#open').hide();
    $('.add-btn-xy').hide();
});

function ref_open(){
        $('#close').fadeOut('slow');
        $('#open').fadeIn('slow');
        $('.open').hide();
        $('.add-btn-xy').show();  
}