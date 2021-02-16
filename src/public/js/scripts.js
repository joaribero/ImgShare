//Auto-closing alerts
setTimeout(function() {
    //$(".alert").alert('close'),
    $(".flash").hide("slow") 
}, 4000);

// Evento LIKE
$('#btn-like').click(function(e) {
    e.preventDefault();
    let imgId = $(this).data('id');
    
    $.post('/images/'+ imgId + '/like')
        .done(data => {
            $('.likes-count').text(data.likes);
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

