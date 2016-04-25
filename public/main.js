$(document).ready(function(){
    "use strict";
    init();
});

function init(){
    "use strict";
    var nextRow =$('table tr:last')[0].id
    $('#enter').click(function(event) {
        event.preventDefault();
        var assignment = $('#assignment').val();
        var grade = $('#grade').val();
        var totalgrade = $('#total').val();
        var lettergrade = getlettergrade((parseInt(grade)/parseInt(totalgrade))*100);
        console.log(assignment,grade, totalgrade,lettergrade);
        $.ajax({
            type: "POST",
            url: "/api",
            data: {
                "assignment": assignment,
                "grade": grade,
                "totalgrade": totalgrade,
                "lettergrade": lettergrade
            },
            success: function(){
                nextRow++;
                $('table').append('<tr id='+nextRow+'><td>'+assignment+'</td><td>'+grade+'</td><td>'+totalgrade+'</td>' +
                    '<td>'+lettergrade+'</td><td><button class="delete">Delete</button></td><td><button class="update">Update</button></td></tr>');
                $('.delete').click(function(){
                    var button = $(this).parent().parent()[0];
                    delrow(button);
                })
            },
            dataType: null
        });
    });
    $('.delete').click(function() {
        var button = $(this).parent().parent()[0];
        delrow(button);
        /*   $.ajax({
         type: "DELETE",
         url: "/api",
         data: {
         "id": $(this).parent().parent()[0].id
         },
         success: function(){
         button.remove();
         },
         dataType: null
         }); */
    });
    function delrow(row){
        $.ajax({
            type: "DELETE",
            url: "/api",
            data: {
                "id": row.id
            },
            success: function(){
                row.remove();
            },
            dataType: null
        });
    }
    $('.update').click(function(event) {
        var button = $(this).parent().parent()[0];
        // console.log(button);
        /*  event.preventDefault();
         var dot = $('#editdate').val();
         var desc = $('#editdesc').val();
         var amount = $('#editamount').val();
         var type = $('#edittype').val();
         console.log(dot,desc,amount,type);
         $.ajax({
         type: "PUT",
         url: "/api",
         data: {
         "id": $(this).parent().parent()[0].id,
         "transDate": dot,
         "desc": desc,
         "amount": amount,
         "debit": type
         },
         success: function(){
         button.after('<tr><td>'+dot+'</td><td>'+desc+'</td><td>'+amount+'</td><td>'+type+'</td></tr>');
         button.remove();
         },
         dataType: null
         }); */
        updaterow(button);
    });
    function getlettergrade(score){
        var grade ='';
        if(score<60){
            grade='F';
        }
        else if(score <70) {
            grade = 'D';
        }
        else if(score <80) {
            grade = 'C';
        }
        else if(score <90){
            grade = 'B';
        }
        else {
            grade = 'A';
        }
        return grade;
    }
    function updaterow(row){
        event.preventDefault();
        console.log(row);
        var assignment = $('#editassignment').val();
        var grade = $('#editgrade').val();
        var totalgrade = $('#edittotal').val();
        var lettergrade = getlettergrade((parseInt(grade)/parseInt(totalgrade))*100);
        $.ajax({
            type: "PUT",
            url: "/api",
            data: {
                "id": row.id,
                "assignment": assignment,
                "grade": grade,
                "totalgrade": totalgrade,
                "lettergrade": lettergrade
            },
            success: function(){
                //console.log($(row.id));
                $('table').append('<tr id='+nextRow+'><td>'+assignment+'</td><td>'+grade+'</td><td>'+totalgrade+'</td>' +
                    '<td>'+lettergrade+'</td><td><button class="delete">Delete</button></td><td><button class="update">Update</button></td></tr>');
                $('.delete').click(function(){
                        var button = $(this).parent().parent()[0];
                        delrow(button);
            });
                    row.remove();
        }});


}}