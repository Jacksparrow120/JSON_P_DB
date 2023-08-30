


var jpdbBaseURL = "http://api.login2explore.com:5577";
var jpdbIRL = "api/irl";
var jpdbIML = "api/iml";
var DBName = "STUDENT-DB";
var RelationName = "Studentdata";
var connToken = "90931258|-31949327750247445|90960979";

$('rollno').focus();

function saveRecNo2LS(jsonobj){
    var lvdata = JSON.parse(jsonobj.data);
    localStorage.setItem('recno',lvdata.rec_no);
}

function getrollnoAsJsonObj(){
    var rollno = $('#rollno').val();
    var jsonStr = {
        id: rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonobj){
    saveRecNo2LS(jsonobj);
    var record = JSON.parse(jsonobj.data).record;
    $('#name').val(record.name);
    $('#class').val(record.class);
    $('#dob').val(record.dob);
    $('#address').val(record.address);
    $('#edate').val(record.edate);
}

function resetForm(){
    $('#rollno').val('');
    $('#name').val('');
    $('#class').val('');
    $('#dob').val('');
    $('#address').val('');
    $('#edate').val('');
}

function validateData(){
    var rollno, name, class_, dob, address, edate;
    rollno = $('rollnno').val();
    name = $('name').val();
    class_ = $('class').val();
    dob = $('dob').val();
    address = $('address').val();
    edate = $('edate').val();

    if (rollno == ''){
        alert("Roll No Missing");
        $("#rollno").focus();
        return "";
    }

    if (name == ''){
        alert("First Name Missing");
        $("#name").focus();
        return "";
    }

    if (class_ == ''){
        alert("Class Missing");
        $("#class").focus();
        return "";
    }

    if (dob == ''){
        alert("Date of Birth Missing");
        $("#dob").focus();
        return "";
    }

    if (address == ''){
        alert("Address Missing");
        $("#address").focus();
        return "";
    }

    if (edate == ''){
        alert("Enrollment Date Missing");
        $("#edate").focus();
        return "";
    }

    var jsonStrObj = {
        rollno : rollno,
        name : name,
        class_ : class_,
        dob : dob,
        address : address,
        edate : edate
    };
    return JSON>stringify(jsonStrObj);
}

function getstudent(){
    var rollnoJsonObj = getrollnoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, DBName,RelationName, rollnoJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCOmmandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    if(resJsonObj.status === 400){
        $('#save').prop("disabled", false);
        $('#reset').prop("disabled", false);
        $('#name').focus();
    }
}

function saveData(){
    var jsonStrObj = validateData();
    if(jsonStrObj === "") {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, DBName, RelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCOmmandAtGivenBaseUrl( putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#rollno').focus();
}

function changeData(){
    $('#change').prop("disabled", true);
    jsonChng = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChng, DBName, RelationName, localStorage.getItem('recno'));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCOmmandAtGivenBaseUrl( updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#rollno').focus();
}


