var bagBarcode;
var barcodegs1
var qtyData;
$(document).ready(function () {
    var gs1;

   

    $('#searchTxt').keypress(function (e) {
        //console.log("keypressed");
        if (e.charCode === 29) {
            this.value += String.fromCharCode(e.which);
            // this.value += "_1"
            gs1 = true;
            // e.preventDefault();
            //alert(this.value);
            //alert("gs1");
        }


        if (e.keyCode == 13) {
            //alert("searching");

            var barcode = document.getElementById("searchTxt").value;
            barcode = barcode.replace(" 17", String.fromCharCode(29) + "17");
            barcode = barcode.replace(/\s/g, '');
            barcodegs1 = "_1" + barcode.replace(new RegExp(String.fromCharCode(29).replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), "_1");
            /* if(gs1){
var answer = parseBarcode(barcode);
answer.parsedCodeItems.forEach(parsedFDAAns);
}else{*/   var answer = parseBarcode(barcode);
            answer.parsedCodeItems.forEach(parsedAns);


        }
    });

    $('#searchTxt2').keypress(function (e) {

        if (e.charCode === 29) {
            this.value += String.fromCharCode(e.which);
            ////////////////this.value += "_1"
            gs1 = true;

        }
        if (e.keyCode == 13) {
            //alert("searching");
            barcodegs1 = "_1" + document.getElementById("searchTxt2").value + "_1";
            bagBarcode = document.getElementById("searchTxt2").value;
           // alert(bagBarcode + " " + gs1);
            $('#searchTxt3').focus();
        }
    });
    $('#searchTxt3').keypress(function (e) {

        if (e.charCode === 29) {
            this.value += String.fromCharCode(e.which);
            this.value += "_1"
            gs1 = true;

        }
        if (e.keyCode == 13) {
            //alert("searching");
            barcodegs1 = barcodegs1 + document.getElementById("searchTxt3").value;
            bagBarcode = bagBarcode + String.fromCharCode(29) + document.getElementById("searchTxt3").value;
           // alert(bagBarcode + " " + gs1);

            var answer = parseBarcode(bagBarcode);
            answer.parsedCodeItems.forEach(parsedAns);

        }
    });
});

/* Lp2824-plus or lp2824-z printer at 203 dpi*/
function printKitsSYR(zpl) {


    var ipaddress = "10.88.32.33:9100/pstprnt";
    var url = "http://" + ipaddress;
    var method = "POST";
    var async = true;
    var request = new XMLHttpRequest();

    request.onload = function () {
        var status = request.status; // HTTP response status, e.g., 200 for "200 OK"
        var data = request.responseText; // Returned data, e.g., an HTML document.
        //output.innerHTML = "Status: " + status + "<br>" + data;
    }

    request.open(method, url);
    //timeout Delays closing xmlHttpRequest.  Required for some zebranet.  zebranet must be allowed to sucessfully send response back to pc or will refuse connections for 1 minute before giving up.
    request.timeout = 4000;

    // Actually sends the request to the server.
    request.send(zpl);


}