function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.dragger-preview').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$(".dragger").change(function(){
    readURL(this);
})


// add new item on table
let lineNo = 1;
$(document).ready(function () {
    $(".add-item").click(function () {
        markup = "<tr><td><p><input type='text' placeholder='Description of service or product...'></p></td><td><p><input type='text' placeholder='Quantity'></p></td><td><p class='d-flex'><span class='d-block'>$</span><input type='text' placeholder='0.00'></p></td><td><p class='d-flex'><span class='d-block'>$</span><input type='text' placeholder='0.00'></p><button class='remove-item' onClick='remove()'><i class='ri-close-line'></i></button></td>" + lineNo + "</td></tr>";
        tableBody = $("table tbody");
        tableBody.append(markup);
        lineNo++;
    });
});

// Remove item
$(document).ready(function remove() {
    $(".remove-item").click(function () {
        $(this).parent().parent().remove();
    });
});
