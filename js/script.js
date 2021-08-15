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
        markup = "<tr><td><p><input type='text' placeholder='Description of service or product...'></p></td><td><p><input type='text' placeholder='Quantity'></p></td><td><p class='d-flex'><span class='d-block'>$</span><input type='text' placeholder='0.00'></p></td><td><p class='d-flex'><span class='d-block'>$</span><input type='text' placeholder='0.00'></p><button class='remove-item' onclick='deleteRow(this)'><i class='ri-close-line'></i></button></td>" + lineNo + "</td></tr>";
        tableBody = $("table tbody");
        tableBody.append(markup);
        lineNo++;
    });
});

// Remove item on close button
function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("itemtable").deleteRow(i);
}

// Remove item
$(document).ready(function remove() {
    $(".discount .remove-item").click(function () {
        $(this).parent().remove();
    });
});


// Add taxt shiping and diacount items
$(document).ready(function remove() {
    $(".add-btns .add-tax").click(function () {
        $(this).addClass("d-none");
        $('.tax-item').removeClass("d-none");
    });
});
$(document).ready(function remove() {
    $(".add-btns .add-discount").click(function () {
        $(this).addClass("d-none");
        $('.discount-item').removeClass("d-none");
    });
});
$(document).ready(function remove() {
    $(".add-btns .add-shiping").click(function () {
        $(this).addClass("d-none");
        $('.shiping-item').removeClass("d-none");
    });
});

// $(document).ready(function remove() {
//     $(".tax-item-close").click(function () {
//         $('.add-btns .add-tax').removeClass("d-none");
//     });
// });
// $(document).ready(function remove() {
//     $(".discount-item-close").click(function () {
//         $('.add-btns .add-discount').removeClass("d-none");
//     });
// });
// $(document).ready(function remove() {
//     $(".shiping-item-close").click(function () {
//         $('.add-btns .add-shiping').removeClass("d-none");
//     });
// });