currLoc = $(location).attr('href');
var isLiked = false;

//Auto-closing alerts
setTimeout(function() {
    //$(".alert").alert('close'),
    $(".flash").hide("slow") 
}, 4000);

//Showing likes
if (currLoc.includes('/images')){
    $(document).ready(function(){
        let imgId = $('#btn-like').data('id');
        $.get('/images/'+ imgId + '/isliked')
            .done(data => {
                isLiked = data.liked;
                if (isLiked === true){
                    console.log('entro aca');
                    $('#btn-like').addClass("heart1");
                    $('.p-like').addClass("heart");
                }
            });
    });
};

// Evento LIKE
$('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    
    $.post('/images/'+ imgId + '/like')
        .done(data => {
            $('.likes-count').text(data.likes);
            isLiked = data.isLiked;
            if (isLiked === true){
                $(this).addClass("heart1");
                $('.p-like').addClass("heart");
            }
            else {
                $(this).removeClass("heart1");
                $('.p-like').removeClass("heart");
            }
        });
});

//Evento DELETE
$('#btn-delete').click(function(e){
    e.preventDefault();
    let $this = $(this);
    const response = confirm('Are you sure you want to delete this image?');
    if (response){
        let imgId = $this.data('id');
        $.ajax({
            url: '/images/' + imgId,
            type: 'DELETE'
        })
        .done(function(result){
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.text('Deleted');
        });
    }
});

//Event hide/show comments
$('#post-comment').hide();

$('#btn-toggle-comment').click(e =>{
    e.preventDefault();
    $('#post-comment').slideToggle();
});

//Muestro nombre del file al subirlo.
$('.custom-file-input').on('change',function(){
    const file = document.getElementById("inputGroupFile").files[0]
    if (file){
        var fileName = file.name;
        $(this).next('.form-control-file').addClass("selected").html(fileName);
    }
})

//Image Preview
const inpFile = document.getElementById("inputGroupFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.querySelector(".image-preview__image");
const previewDefaultText = previewContainer.querySelector(".image-preview__default-text");

previewContainer.style.display = "none";

inpFile.addEventListener("change", function(){
    const file = this.files[0];
    
    if (file) {
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display= "block";

        reader.addEventListener("load", function(){
            previewImage.setAttribute("src", this.result);
        });

        reader.readAsDataURL(file);
        $('#imagePreview').slideToggle();

    } else {
        previewDefaultText.style.display = "block";
        previewImage.style.display= "none";
        previewImage.setAttribute("src","");
        $('#imagePreview').hide();
    }
});

//collapse
$('.card-header').click(function(){
    console.log('aca entro');
    if ($('.card-header').hasClass("collapsed")) {
        console.log('entro aca');
        $('card-collapse-btn').text = '-';
    }
    else {
        $('card-collapse-btn').text = '+';
    }
});