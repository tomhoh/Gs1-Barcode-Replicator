function beginFDASearch(theNDC) {
    //theNDC=theNDC.substring(0, theNDC.indexOf("-", 8));
    var test = theNDC.slice(6, 10);
    var ndc44 = theNDC.slice(0, 4) + "-" + theNDC.slice(4, 8)
    var ndc54 = theNDC.slice(0, 5) + "-" + theNDC.slice(5, 9)
    var ndc53 = theNDC.slice(0, 5) + "-" + theNDC.slice(5, 8)
    findNDC(ndc44, ndc54, ndc53);
    //////alert("fda search ndcs: "+test+" "+theNDC +" "+ndc44 +" "+ndc54 +" "+ndc53)
    //alert(theNDC);

}



function findNDC(ndc44,ndc54,ndc53) {
try {
// var response = UrlFetchApp.fetch('https://api.fda.gov/drug/ndc.json?search=product_ndc:%22' + ndc44 + '%22+product_ndc:%22' + ndc54 + '%22+product_ndc:%22' + ndc53 + '%22&limit=1');
console.log("findNDC funtion");
var xmlhttp = new XMLHttpRequest();
var url = 'https://api.fda.gov/drug/ndc.json?search=product_ndc:%22' + ndc44 + '%22+product_ndc:%22' + ndc54 + '%22+product_ndc:%22' + ndc53 + '%22&limit=1';

xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
        console.log(this.responseText);
        paseFDADrug(json);
    }
};

xmlhttp.open("GET", url, true);
xmlhttp.send();

} catch (error) {
return error.message;
}
}
/*********************************GS1 parsing*************************************/
var ndc;
var expDateMFG;
var lot;
function parsedAns(element, index, array){
 //alert(element.ai);
 switch(element.ai) {
 case "01":
   ndc = element.data.substring(3, 13);
   //alert("ndc: "+ element.data.substring(3, 13));
   //$('#tableBar').show();
   //$('.loader').show();
       beginFDASearch(ndc);
   break;
 case "21":
 // alert(element.data);
   break;
    case "17":
    // expDateMFG = moment(element.data, 'MM-DD-YYYY')
     expDateMFG = moment(element.data).format('MM/DD/YYYY');
     console.log(expDateMFG);
     if(moment(expDateMFG).isAfter(moment().add(1, 'y'))){
       facilityExp = moment().add(1, 'y').format('MM/DD/YYYY')
       //alert("Date is before " + moment().add(1, 'y').format('MM/DD/YYYY'));
     }else{
       facilityExp = expDateMFG;
     }
     
   //alert("The Date " +expDateMFG);
   break;
    case "10":
   alert(element.data);
   lot = element.data;
   break;
 default:
   // code block
}

}

/**************************End of GS1 parsing*************************************/
var BrandName;
var GenericName;
var Package;
function paseFDADrug(jsonObj){
  //alert(jsonObj);
  var package;
  var manufg;
  var route;
  var activeI;
  var upc;
  var pclass;
   console.log(jsonObj.results);
 
   for(let i = 0; i < jsonObj.results.length; i++) {
   let obj = jsonObj.results[i];
package = obj.packaging;
manufg=obj.openfda.manufacturer_name;
route = obj.route;
activeI = obj.active_ingredients;
upc = obj.openfda.upc;
pclass = obj.pharm_class;

  // alert(obj.packaging[i]);
  
  
   //$('#dfieldBrand').val(cleanDrugString(obj.brand_name));
   //$('#dfieldGeneric').val(cleanDrugString(obj.generic_name));
   BrandName = obj.brand_name;
   GenericName = obj.generic_name;
  // $('#dfieldBrand').val(obj.brand_name);
  // $('#dfieldGeneric').val(obj.generic_name);
   $('#dfieldFORM').val(obj.dosage_form);
   /*if(obj.dea_schedule === undefined){
$('#dfieldCONTROL').val("");
   }else{
$('#dfieldCONTROL').val(obj.dea_schedule);
   }
   
$('#dfieldTYPE').val(obj.product_type);
   $('#dfieldTYPE').val(obj.product_type);
   checkInputforLength();
*/
   }
   if(package.length ==1){
      $('#dfieldPACKAGE').val(package[0].description);
      var quantityString = (package[0].description.substring(0,package[0].description.indexOf(" ")).replace(/\D/g, ""));
       console.log("QTY: "+quantityString);
       if (quantityString == null || parseInt(quantityString) > 50){
        quantityString ="1";

       }
       console.log("QTY: "+quantityString  );
   //  $('#dfieldNDC-PACKAGE').val(package[0].package_ndc);
     //$('#dfieldNDC-10').val((package[0].package_ndc).replaceAll('-',''));
     //  $('#dfieldNDC-DASH').val(package[0].package_ndc);
      // $('#dfieldNDC-MFG').val((package[0].package_ndc).substring(0, (package[0].package_ndc).indexOf("-")));
       var thedrugNDC = (package[0].package_ndc).substring((package[0].package_ndc).indexOf("-")+1,(package[0].package_ndc).length);
//$('#dfieldNDC-DRUG').val((thedrugNDC).substring(0, (thedrugNDC).indexOf("-")));
       //determineNDC11(package[0].package_ndc);
   }else{
   for(let p = 0; p < package.length; p++) {
   let objP = package[p];
  // alert(objP.package_ndc);
  
////////alert(fdaSearchNDC);
  var pkNDC44 = ndc.slice(0,4)+"-"+ndc.slice(4,8)+"-"+ndc.slice(8,11);
  var pkNDC54 = ndc.slice(0,5)+"-"+ndc.slice(5,9)+"-"+ndc.slice(9,10);
  var pkNDC53 = ndc.slice(0,5)+"-"+ndc.slice(5,8)+"-"+ndc.slice(8,11);
  /////////////alert("parsing ndc number: "+pkNDC44+" "+pkNDC54+" "+pkNDC53+" ");
   //if(objP.package_ndc==$(('#fdaSearch').val()).slice(0,4)){
     if(objP.package_ndc==pkNDC44 ||objP.package_ndc==pkNDC54 ||objP.package_ndc==pkNDC53 ){
    // $('#dfieldPACKAGE').val(objP.description);
     var quantityString = (objP.description.substring(0,objP.description.indexOf(" ")).replace(/\D/g, ""));
    
     if (quantityString == null || parseInt(quantityString) > 50){
        quantityString ="1";

       }
       console.log("QTY: "+quantityString  );
    // $('#dfieldNDC-PACKAGE').val(objP.package_ndc);
    // $('#dfieldNDC-10').val((objP.package_ndc).replaceAll('-',''));
     //  $('#dfieldNDC-DASH').val(objP.package_ndc);
     //  $('#dfieldNDC-MFG').val((objP.package_ndc).substring(0, (objP.package_ndc).indexOf("-")));
       var thedrugNDC = (objP.package_ndc).substring((objP.package_ndc).indexOf("-")+1,(objP.package_ndc).length);
//$('#dfieldNDC-DRUG').val((thedrugNDC).substring(0, (thedrugNDC).indexOf("-")));
       //determineNDC11(objP.package_ndc);
   }
  
           }
   }
          
  /*  for(let m = 0; m < manufg.length; m++) {
   let objM = manufg[m];
   //$('#dfieldMFG').val(objM);
   //alert(objM);
           }
   for(let r = 0; r < manufg.length; r++) {
   let objR = route[r];
  // $('#dfieldROUTE').val(objR);
  // alert(objR);
           }
    for(let a = 0; a < activeI.length; a++) {
   let objA = activeI[a];
   //alert(objA.strength);
  // $('#dfieldSTRENGTH').val(objA.strength);
  $('#dfieldACTIVE_INGREDIENTS').val($('#dfieldACTIVE_INGREDIENTS').val()+objA.name+',');
           }
       if(upc !=null){    
   for(let u = 0; u < upc.length; u++) {
   let objU = upc[u];
   $('#dfieldNDC-MPN').val(objU);}
  // alert(objU);
           }
           if(pclass!= null){
   for(let c = 0; c < pclass.length; c++) {
   let objC = pclass[c];
   //alert(objC);
   $('#dfieldCLASS').val($('#dfieldCLASS').val()+objC+',');
           }
   }
   $('#dfieldTOTAL_VOL').val("1");
   $('#fdaSearch').val('');*/
   console.log("Brand Name "+BrandName+" "+"Generic Name "+GenericName +" "+"Lot: "+lot+" "+"Expiration: "+expDateMFG);
   var zplString = `^XA 
^FT85,38^A0N,30,20^FDLOT: `+lot+`^FS
^FT85,65^A0N,30,20^FDEXP: `+expDateMFG+`^FS
^FT85,92^A0N,30,20^FD`+BrandName+`^FS
^FO35,22
           ^BXN,2,200,,,,_
          ^FD`+ barcodegs1 + `^FS

           ^PQ1,0,1,Y^XZ`;
           
           
                  printKitsSYR(zplString);
}
