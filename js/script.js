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

function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
// add new item on table
let lineNo = 1;
$(document).ready(function () {
    $(".add-item").click(function () {
        markup = "<tr><td><p><input type='text' placeholder='Description of service or product...' ></p></td><td><p><input type='text' placeholder='Quantity' id='quat"+lineNo + "' onkeyup='calcPrice(this)' onkeypress='return isNumberKey(event)'></p></td><td><p class='d-flex'><span class='d-block'>$</span><input type='text' placeholder='0.00' id='rate"+ lineNo + "'  onkeyup='calcPrice(this)' onkeypress='return isNumberKey(event)'></p></td><td><p class='d-flex' id='price"+ lineNo+ "'><span class='d-block' >$</span><input type='text' placeholder='0.00'></p><button class='remove-item' id= 'del"+lineNo+"' onclick='deleteRow(this)'><i class='ri-close-line'></i></button></td>" + lineNo + "</td></tr>";
        tableBody = $("table tbody");
        tableBody.append(markup);
        lineNo++;
    });
});
let sub_total = 0;
let total = 0;
let tax = 0;
let tax_type = "fixed";
let discount = 0;
let dis_type = "fixed";
let shipping = 0;
let ship_type = "fixed";
let amount = 0;
let balance = 0;
function calcTotal(subtotal){
    let total_temp = subtotal;
    if(discount > 0){
        if(dis_type. localeCompare("fixed") == 0){
            total_temp -= discount;
        }
        else{
            total_temp = (total_temp - (total_temp* discount/100)).toFixed(2);
        }
    }
    if(tax > 0){
        if(tax_type. localeCompare("fixed") == 0){
            total_temp += tax;
        }
        else{
            total_temp = (total_temp + (total_temp* tax/100)).toFixed(2);
        }
    }
    if (shipping > 0){
        if(ship_type.localeCompare("fixed") == 0){
            total_temp += shipping;
        }
        else{
            total_temp = (total_temp + (total_temp* shipping/100)).toFixed(2);
        }
    }
    return total_temp;
}
function display_tax(){
    let temp_val = sub_total;
    if(dis_type. localeCompare("fixed")== 0){
        document.getElementById("discount_p").innerHTML = "$" + discount.toString();
        temp_val -= discount;
    }else{
        document.getElementsByID("discount_p").innerHTML = "$" + ((temp_val*discount/100).toFixed(2)).toString();
        temp_val -= (sub_total*discount/100).toFixed(2);
    }

    if(tax_type.localeCompare("fixed") == 0){
        document.getElementById("tax_p").innerHTML = "$" + tax.toString();
        temp_val += tax;
    }else{
        document.getElementById("tax_p").innerHTML = "$" + ((temp_val*tax/100).toFixed(2)).toString();
        temp_val += ((temp_val*tax/100).toFixed(2)).toString();
    }

    if(ship_type.localeCompare("fixed") == 0){
        document.getElementById("ship_p").innerHTML = "$" + shipping.toString();
    }else{
        document.getElementById("ship_p").innerHTML = "$" + ((temp_val*shipping/100).toFixed(2)).toString();
    }
}
$("#ship_type").on('change', function() {
    
    ship_type = this.value;
    total = calcTotal(sub_total);

    document.getElementById("total").innerHTML = "$" +  total.toString();
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
    display_tax();
});

$("#tax_type").on('change', function() {
    tax_type = this.value;
    total = calcTotal(sub_total)
    document.getElementById("total").innerHTML = "$" +  total.toString();
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
    display_tax();
});
$("#dis_type").on('change', function() {
    dis_type = this.value;
    total = calcTotal(sub_total)
    document.getElementById("total").innerHTML = "$" +  total.toString();
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
    display_tax();
});
$("#ship").on('input', function() {
    
    if(this.value.length > 0)
    {
        shipping = parseFloat(this.value);
    }else{
        shipping = 0;
    }
    total = calcTotal(sub_total);
    total = total_temp;
    document.getElementById("total").innerHTML = "$" +  (total).toString();
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
    display_tax();
});
$("#tax").on('input', function() {
    
    if(this.value.length > 0)
    {
        tax = parseFloat(this.value);
    }else{
        tax = 0;
    }
    total = calcTotal(sub_total);
    document.getElementById("total").innerHTML = "$" +  total.toString();
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
    display_tax();
});

$("#discount").on('input', function() {
    
    if(this.value.length > 0)
    {
        discount = parseFloat(this.value);
    }else{
        discount = 0;
    }
    total = calcTotal(sub_total);
    document.getElementById("total").innerHTML = "$" +  total.toString();
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
    display_tax();
});

function calcPrice(row){
    var id = row.id;
    var val = row.value;
    var cur_price = NaN;
    
    if (id.includes("quat")){
        var cur_price_tag = document.getElementById("price"+ id.split("quat")[1]).innerHTML;
        cur_price = parseFloat(cur_price_tag.split("$")[1]);

        var an_id = "rate"+id.split("quat")[1];
        var an_val = document.getElementById(an_id).value;
        if(an_val.length != 0){
            var item_price = 0;
            if(val.length == 0){
                item_price = 0;
            }else{
                item_price = parseFloat(val) * parseFloat(an_val);
            }
            item_price = item_price.toFixed(2);
            if(cur_price > 0){
                sub_total = parseFloat(sub_total) - cur_price
            }
            sub_total =parseFloat(sub_total) + parseFloat(item_price);
            total = calcTotal(sub_total);
            document.getElementById("price"+ id.split("quat")[1]).innerHTML ="$ "+  item_price.toString();
            document.getElementById("subtotal").innerHTML = "$" +  sub_total.toString();
            document.getElementById("total").innerHTML = "$" +  (total).toString();
            balance = total - amount;
            document.getElementById("balance").innerHTML = "$" +  balance.toString();
        }
    }else if(id.includes("rate")){
        var cur_price_tag = document.getElementById("price"+ id.split("rate")[1]).innerHTML;
        cur_price = parseFloat(cur_price_tag.split("$")[1]);
        var an_id = "quat"+id.split("rate")[1];
        var an_val = document.getElementById(an_id).value;
        if(an_val.length != 0){
            var item_price = 0;
            if(val.length == 0){
                item_price = 0;
            }else{
                item_price = parseFloat(val) * parseFloat(an_val);
            }
            item_price = item_price.toFixed(2);
            if(cur_price > 0){
                sub_total = parseFloat(sub_total) - cur_price
            }
            sub_total =parseFloat(sub_total) + parseFloat(item_price);
            total = calcTotal(sub_total);
            document.getElementById("price" + id.split("rate")[1]).innerHTML ="$ "+  item_price.toString();
            document.getElementById("subtotal").innerHTML = "$" +  sub_total.toString();
            document.getElementById("total").innerHTML = "$" +  (total).toString();
            balance = total - amount;
            document.getElementById("balance").innerHTML = "$" +  balance.toString();
        }
    }
    display_tax();
}

$("#amount").on('input', function() {
    amount = parseFloat(this.value);
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
});



// Remove item on close button
function deleteRow(r) {
    var row_id = r.id.split('del')[1];
    var quat_val = parseFloat(document.getElementById("quat" + row_id).value);
    var rate_val = parseFloat(document.getElementById("rate" + row_id).value);
    sub_total -= quat_val * rate_val;
    document.getElementById("subtotal").innerHTML = "$" +  sub_total.toString();
    total = calcTotal(sub_total);
    document.getElementById("total").innerHTML = "$" +  (total.toFixed(2)).toString();
    balance = total - amount;
    document.getElementById("balance").innerHTML = "$" +  balance.toString();
    display_tax();
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("itemtable").deleteRow(i);
}

// Remove item
$(document).ready(function remove() {
    $(".discount .remove-item").click(function () {
        $(this).parent().remove();
        element_id = $(this).attr('id');
        if(element_id.localeCompare('tax_btn') == 0){
            tax = 0;
            total = calcTotal(sub_total)
            document.getElementById("total").innerHTML = "$" +  total.toString();
            balance = total - amount;
            document.getElementById("balance").innerHTML = "$" +  balance.toString();
            display_tax();
        }else if(element_id.localeCompare('discount_btn') == 0){
            discount = 0;
            total = calcTotal(sub_total)
            document.getElementById("total").innerHTML = "$" +  total.toString();
            balance = total - amount;
            document.getElementById("balance").innerHTML = "$" +  balance.toString();
            display_tax();
        }else if(element_id.localeCompare('ship_btn') == 0){
            shipping = 0;
            total = calcTotal(sub_total)
            document.getElementById("total").innerHTML = "$" +  total.toString();
            balance = total - amount;
            document.getElementById("balance").innerHTML = "$" +  balance.toString();
            display_tax();
        }
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