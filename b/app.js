var data = [
  {
    id: 01,
    name: "Banana",
    quantity: 10,
    image:
      "https://www.collinsdictionary.com/images/full/banana_64728013.jpg",
    price: "60",
  },
  {
    id: 02,
    name: "Kiwi",
    quantity: 10,
    image:
      "https://cdn.britannica.com/45/126445-004-90305E10/Kiwi-fruit.jpg",
    price: "200",
  },
  {
    id: 03,
    name: "Strawberry",
    quantity: 10,
    image: "https://thumbs.dreamstime.com/b/fresh-strawberry-white-background-40742985.jpg",
    price: "125",
  },
  {
    id: 04,
    name: "Watermelon",
    quantity: 10,
    image:
      "https://thumbs.dreamstime.com/b/sliced-watermelon-25612609.jpg",
    price: "50",
  },
  {
    id: 05,
    name: "Mango",
    quantity: 10,
    image:
      "https://img.freepik.com/free-photo/ripe-mango-with-green-leaf-isolated-white_252965-183.jpg?w=2000",
    price: "100",
  },
];


console.log(data);

if (localStorage.getItem("shoppingcartdata") == null) {
  localStorage.setItem("shoppingcartdata", JSON.stringify(data));
  shoppingcart();
} else {
  shoppingcart();
}

function shoppingcart() {
    
  var shoppingdata = JSON.parse(localStorage.getItem("shoppingcartdata"));
  document.getElementById("shoppingList").innerHTML = null;
  for (var i = 0; i < shoppingdata.length; i++) {
    html =
      '<div class="card mb-3" style="max-width: 540px; margin-top:-10px">';
    html += '<div class="row g-0">';
    html += '<div class="col-md-4">';
   
    html +=
      '<img  class="img-fluid rounded-start"  style="height: 63px; width: 71px; margin-top: 28px; margin-left: 7px;" alt="..."  src=' +
      shoppingdata[i].image +
      ">";
    html += "</div>";
    html += '<div class="col-md-8">';
    html += '<div class="card-body">';
    html += ' <h5 class="card-title">' + shoppingdata[i].name + "</h5>";
    html +=
      '<p class="card-text"><small class="text-muted">' +
      shoppingdata[i].quantity +
      "QTY</small></p>";
    html +=
      '<p class="card-text text-danger" style="margin-top:-12px;">$' +
      shoppingdata[i].price +
      "</p>";
      html +=
      '<input type="checkbox" onchange="handleChange(event)" value=' +
      shoppingdata[i].id +
      ">";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    html += "</div>";
    console.log(html);
    $("#shoppingList").append(html);
  }
}

var check;
var checkvalue = [];
function handleChange(e) {
  if (e.target.checked == true) {
    check = e.target.value;

    checkvalue.push(check);
    console.log(checkvalue);
  } else {
    check = e.target.value;
    checkvalue = checkvalue.filter((x) => x != check);
    console.log(checkvalue);
  }
  leftButtondisable()
}



var checkcartlist;
var checkvaluecartlist = [];
function handleChangecartlist(e) {
  if (e.target.checked == true) {
    checkcartlist = e.target.value;
    checkvaluecartlist.push(checkcartlist);
  } else {
    checkcartlist = e.target.value;
    checkvaluecartlist =checkvaluecartlist.filter((x) => x != checkcartlist);
  }
  rightButtondisable();
}


function shoppingToCart() {
  var shoppingdata = JSON.parse(localStorage.getItem("shoppingcartdata"));
  var cartdata = JSON.parse(localStorage.getItem("cartdata"));
  for (let i = 0; i < checkvalue.length; i++) {
    var index = shoppingdata.findIndex((x) => x.id == checkvalue[i]);
    if(shoppingdata[index].quantity == 1){
      shoppingdata.splice(shoppingdata.indexOf(shoppingdata[index]), 1);

    }else{
    shoppingdata[index].quantity = shoppingdata[index].quantity - 1;
    }
    if (cartdata != null && cartdata != "") {
      var cartIndex = cartdata.findIndex((x) => x.id == checkvalue[i]);
      if (cartIndex == -1) {
        var quen=data.find((x) => x.id == checkvalue[i]);
        quen.quantity = 1;
      cartdata.push(quen);
  
      } else {
        cartdata[cartIndex].quantity = cartdata[cartIndex].quantity + 1;
      }
    } else {
        cartdata=[];
        var quen=data.find((x) => x.id == checkvalue[i]);
        quen.quantity = 1;
      cartdata.push(quen);
    
    }
    
    localStorage.setItem("cartdata", JSON.stringify(cartdata));
    localStorage.setItem("shoppingcartdata", JSON.stringify(shoppingdata));
   
  }
  shoppingcart();
  showcartlistdata()
  checkvalue = [];
}



function cartToshopping() {
 
  var shoppingdata = JSON.parse(localStorage.getItem("shoppingcartdata"));
  var cartdata = JSON.parse(localStorage.getItem("cartdata"));
  for (let i = 0; i < checkvaluecartlist.length; i++) {
    var index = cartdata.findIndex((x) => x.id == checkvaluecartlist[i]);
    if(cartdata[index].quantity == 1){
      cartdata.splice(cartdata.indexOf(cartdata[index]), 1);

    }else{
    cartdata[index].quantity = cartdata[index].quantity - 1;
    }
    if (shoppingdata != null && shoppingdata != "") {
      var shoppingIndex = shoppingdata.findIndex((x) => x.id == checkvaluecartlist[i]);
      if (shoppingIndex == -1) {
        var quantity=shoppingdata.find((x) => x.id == checkvaluecartlist[i]);
        quantity.quantity = 1;
        shoppingdata.push(quantity);
      } else {
        shoppingdata[shoppingIndex].quantity = shoppingdata[shoppingIndex].quantity + 1;
      }
    } else {
        shoppingdata=[];
        var quantity=shoppingdata.find((x) => x.id == checkvaluecartlist[i]);
        quantity.quantity = 1;
        shoppingdata.push(quantity);
    }
    
    localStorage.setItem("cartdata", JSON.stringify(cartdata));
    localStorage.setItem("shoppingcartdata", JSON.stringify(shoppingdata));
    
  }
  heckvaluecartlist = [];
    shoppingcart();
    showcartlistdata()
}

if (localStorage.getItem("cartdata") != null) {
  showcartlistdata();
}

function showcartlistdata() {
  var cartdata = JSON.parse(localStorage.getItem("cartdata"));
  document.getElementById("cartList").innerHTML = null;
  for (var j = 0; j < cartdata.length; j++) {
    cart =
      '<div class="card mb-3" style="max-width: 540px; margin-top:-10px ">';
    cart += '<div class="row g-0">';
    cart += '<div class="col-md-4">';
    
    cart +=
      '<img  class="img-fluid rounded-start"  style="height: 63px; width: 71px; margin-top: 28px; margin-left: 7px;" alt="..."  src=' +
      cartdata[j].image +
      " >";
    cart += "</div>";
    cart += '<div class="col-md-8" ">';
    cart += '<div class="card-body">';
    cart += ' <h5 class="card-title">' + cartdata[j].name + "</h5>";
    cart +=
      '<p class="card-text"><small class="text-muted">' +
      cartdata[j].quantity +
      "QTY</small></p>";
    cart += '<p class="card-text text-danger priceText" style="margin-top:-12px;">$' + cartdata[j].price + "</p>";
    cart += '<input type="checkbox" onchange="handleChangecartlist(event)" value=' +
    cartdata[j].id +'>';
    cart += "</div>";
    cart += "</div>";
    cart += "</div>";
    cart += "</div>";
    $("#cartList").append(cart);
  }

  uncheckedshoppingcart();
  rightButtondisable();
  showbuybutton();
}


var isSelectedAll = false;
function uncheckedshoppingcart() {
  var check = document.getElementsByTagName("input");
  for (var i = 0; i < check.length; i++) {
    if (check[i].type == "checkbox") {
      check[i].checked = isSelectedAll;
      leftButtondisable();
    }
  }
}

var isSelectedAll = false;
function uncheckedcartlist() {
  var check = document.getElementsByTagName("input");
  for (var i = 0; i < check.length; i++) {
    if (check[i].type == "checkbox") {
      check[i].checked = isSelectedAll;
     rightButtondisable();
    }
  }
}


//Buy button show and hide
function showbuybutton() {
  if (localStorage.getItem("cartdata") == null) {
    document.getElementById("buyButton").style.display = "none";
  } else {
    document.getElementById("buyButton").style.display = "block";
  }
}

//create table
// Remove buy cart
function removecartlist() {
  //document.getElementById("cartList").innerHTML = null;
  createTable();
  $("#myToast").toast("show");
  // localStorage.removeItem("cartdata");
  showbuybutton();
}


// disable / enable left side button
function leftButtondisable() {
  var count = 0;
  var check = document.getElementsByTagName("input");
  for (var i = 0; i < check.length; i++) {
    if (check[i].type == "checkbox" && check[i].checked) {
      count++;
    }
    if (count > 0) {
      document.getElementById("btn2").disabled = false;
    } else {
      document.getElementById("btn2").disabled = true;
    }
  }
}


// disable / enable right side button
function rightButtondisable(){
    var count=0;
    var check = document.getElementsByTagName("input");
    for(var i=0; i<check.length;i++){
        if(check[i].type=="checkbox" && check[i].checked){
            count++;
        }
        if(count>0)
        {
            document.getElementById("btn3").disabled = false;
        }
        else{
            document.getElementById("btn3").disabled = true;
        }
    }

}

//table

function createTable() {
 
  let localData = localStorage.getItem('cartdata');
  if (localData) {
    $("#tblData tbody").html("");
    let localArray = JSON.parse(localData);
    let index = 1;
    localArray.forEach(element => {
      let dynamicTR = "<tr>";
      dynamicTR = dynamicTR + "<td> " + index + "</td>";
      dynamicTR = dynamicTR + "<td class='txtName'  data-id=" + element.id + ">" + element.name + "</td>";
      dynamicTR = dynamicTR + "<td class='txtContact'>" + " 24-05-2022 " + "</td>";
      dynamicTR = dynamicTR + "<td class='txtAltNo'>" + element.price + "</td>";
      dynamicTR = dynamicTR + "<td class='txtAddress'>" + element.quantity + "</td>";
      dynamicTR = dynamicTR + "    <td class='tdAction text-center'>";
      dynamicTR = dynamicTR + "        <button class='btn btn-sm btn-success btn-edit' id='viewBtn'> VIEW ITEM</button>";
      dynamicTR = dynamicTR + "    </td>";
      dynamicTR = dynamicTR + " </tr>";
      $("#tblData tbody").append(dynamicTR);
      index++;
      td1="<td class='txtIMG'>" + element.image +"</td>";
    });
  }



//MODAL

$("#viewBtn").click(function() {
  // let table=$("#tblData")
  // console.log("Modal btn clicked");
  $("#viewModal").modal('show');
//   modalBody=$("#modalBody");

//   myrow=$(this).parents('tr').data();

// $('#modalBody').html('Hello');
  // myrow = $(this).parents('tr') .data();
 
  // table.rows( {page: 'current'} ).deselect();

  // table.row( $(this).parents('tr') ).select();
  // table.row( $(this) ).select();
                            
  // craft modal body                                                                 
  // $('#person').html('Hello ' + myrow.fullname);
  // // element with property display: none
  // $('#uniq').html(myrow.uniqid);                           
  // $('#myModal').modal('show');                                 
});



$(".close").click(function() {
  
  $("#viewModal").modal('hide');
                                  
});




//modal function-2

$(function () {
  // ON SELECTING ROW
  $(".btn-edit").click(function () {
//FINDING ELEMENTS OF ROWS AND STORING THEM IN VARIABLES
      var a =
$(this).parents("tr").find(".txtName").text();
      var c =
$(this).parents("tr").find(".txtContact").text();
      var d =
$(this).parents("tr").find(".txtAltNo").text();
      var e = 
$(this).parents("tr").find(".txtAddress").text();

var f = 
$(this).parents("tr").find(".txtIMG").text();

      var p = "";
      // CREATING DATA TO SHOW ON MODEL
      p += 
"<p id='a' name='txtName'>Name: "
        + a + " </p>";
      
      p +=
"<p id='c' name='txtContact'>Date: " 
        + c + "</p>";
      p += 
"<p id='d' name='txtAltNo'>Price: "
        + d + " </p>";
      p += 
"<p id='e' name='txtAddress'>Quantity: "
        + e + " </p>";
        "<p id='f' name='txtIMG'>"
        + f + "</p>";
      //CLEARING THE PREFILLED DATA
      $("#divViewModal").empty();
      //WRITING THE DATA ON MODEL
      $("#divViewModal").append(p);
  });
});

}

