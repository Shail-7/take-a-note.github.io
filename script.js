// let b=document.getElementById("load");
let preLoader=document.getElementById("loading");

function myfun(){
    alert("loaded");
    preLoader.style.display='none';


}
// b.addEventListener('load',()=>{
//     alert("loaded");
//     let preLoader=document.getElementById("loading");
//     preLoader.style.display='none';


// });

// b.innerHTML="Loading...";
let addbtn = document.getElementById("addbtn");
let container = document.getElementById("container");
let j = -1;
const notes = [];
let prsntCnt = 0;
let aftrCnt = 0;
let checkFlag = 0;
// if(notes.length>0)
// {
//     alert("not empty");
//     console.log(notes);
// }
// else
// {
//     alert("empty");
// }


//add  btn note code

var insNode = (i) => {
    var htmlData = `  <div class="col-lg-4" class="notecontainer" id="notecontainer${i}">



   <button type="button" id="done${i}" value="notetext${i}" class="btn float-left text-primary font-weight-bold done rounded-circle"><span
       class="text-black rounded-circle img-thumbnail"><i class="fa fa-check-square"></i></span></button>

       <button type="button" id="edit${i}" value="notetext${i}" class="btn float-right text-success font-weight-bold edit rounded-circle"><span
               class="text-black rounded-circle img-thumbnail"><i class="fa fa-edit"></i></span></button>

       <button type="button" id="del${i}" value="notecontainer${i}" class="btn float-right text-danger font-weight-bold del rounded-circle"><span
               class="text-black rounded-circle img-thumbnail"><i class="fa fa-trash"></i></span></button>

       <textarea name="" id="notetext${i}" cols="40" rows="8" class="note textcss">

   </textarea>
   <p></p>

</div> `;
    

    container.insertAdjacentHTML('afterbegin', htmlData);
    let ntcnt=document.getElementById("notecontainer");

};

let storeLocalData = (notetext) => {
    // console.log(notetext.value);
    notes.push(notetext.value);
    localStorage.setItem('notes', JSON.stringify(notes));
    reloadFn();


};

let storeEditLocalData = (notetext, i) => {

    notes[i] = notetext.value;
    localStorage.setItem('notes', JSON.stringify(notes));
    checkFlag = 1;


};

let doneFn = (done) => {
    // alert(done.value + " ...");

    let notetext = document.getElementById(done.value);
    // alert(notetext.getAttribute('data-target'));
    notetext.setAttribute("readonly", "readonly");
    storeLocalData(notetext);
    done.remove();
    return notetext;


};

let editFn = (edit, i) => {

    let notetext = document.getElementById(edit.value);
    notetext.style.fontSize = '18px';

    notetext.style.border = '3px solid #FFC107';
    notetext.removeAttribute("readonly");

    notetext.addEventListener('change', () => {
        // alert("changed");

        notetext.setAttribute("readonly", "readonly");
        storeEditLocalData(notetext, i);

        notetext.style.fontSize = '16px';
        notetext.style.border = 'none';

    });
};

const reloadFn = () => {

    if (checkFlag == 1) {
        checkFlag = 0;
        location.reload();
        // alert("reloaded");

    }
    else {
        // location.reload();

        // alert("nooooo");
    }

};

const removeNote = (i) => {

    // alert("indx "+i);
    const arr = notes.splice(i, 1);
    // alert(arr);
    localStorage.setItem('notes', JSON.stringify(notes));
    reloadFn();

};

const delFn = (del, i) => {

    let notecontainer = document.getElementById(del.value);
    // notecontainer.remove();
    removeNote(i);
};

addbtn.addEventListener('click', () => {


    j++;

    insNode(j);




    // let storeLocalData=(notetext)=>{
    //     // console.log(notetext.value);
    //     notes.push(notetext.value);
    //     localStorage.setItem('notes',JSON.stringify(notes));

    // };
    //     var htmlData = `  <div class="col-lg-4" id="notecontainer${i}">


    //     <button type="button" id="done${i}" value="notetext${i}" class="btn float-left text-primary font-weight-bold done rounded-circle"><span
    //         class="text-black rounded-circle img-thumbnail"><i class="fa fa-check-square"></i></span></button>


    //         <button type="button" id="edit${i}" value="notetext${i}" class="btn float-right text-success font-weight-bold edit rounded-circle"><span
    //                 class="text-black rounded-circle img-thumbnail"><i class="fa fa-edit"></i></span></button>

    //         <button type="button" id="del${i}" value="notecontainer${i}" class="btn float-right text-danger font-weight-bold del rounded-circle"><span
    //                 class="text-black rounded-circle img-thumbnail"><i class="fa fa-trash"></i></span></button>

    //         <textarea name="" id="notetext${i}" cols="40" rows="8" class="pre-scrollable border-0 note textcss">

    //     </textarea>

    // </div> `;

    //     container.insertAdjacentHTML('afterbegin', htmlData);


    //done btn code

    let done = document.getElementById(`done${j}`);

    done.addEventListener('click', () => {
        checkFlag = 1;
        let noUse = doneFn(done);
        // reloadFn();
    });
    // done.addEventListener('click', () => {

    //     alert(done.value);

    //     let notetext = document.getElementById(done.value);
    //     // alert(notetext.getAttribute('data-target'));
    //     notetext.setAttribute("readonly", "readonly");
    //     storeLocalData(notetext);
    //     done.remove();
    // });



    //del btn code
    var del = document.getElementById(`del${j}`);
    del.addEventListener('click', () => {

        // alert(del.value);

        let notecontainer = document.getElementById(del.value);
        notecontainer.remove();


    });

    var edit = document.getElementById(`edit${j}`);
    // var q=notes.length+j;

    edit.addEventListener('click', () => {

        var tmp = edit.value;
        // alert("id of nt " + parseInt(tmp[(tmp.length - 1)]));



        if (prsntCnt == 0) {
            editFn(edit, parseInt(tmp[(tmp.length - 1)]));
        } else {
            aftrCnt++;
            let indx = (notes.length - 1);
            // edit.value = `notetext${indx}`;

            // var t = edit.value;
            // alert("id of nt " + parseInt(indx));
            editFn(edit, parseInt(indx));

            // editFn(edit, (notes.length-1));

        }


        // alert(del.value);
        // let notetext = document.getElementById(edit.value);
        // notetext.removeAttribute("readonly");

        // notetext.addEventListener('change', () => {

        //     notetext.setAttribute("readonly", "readonly");
        //});


        // location.reload();

    });

    // console.log(container.childElementCount);

});



const presentNotes = JSON.parse(localStorage.getItem('notes'));
if (presentNotes) {
    for (let l = 0; l < presentNotes.length; l++) {
        prsntCnt++;
        // alert("che");

        insNode(l);

        let noteText = document.getElementById(`notetext${l}`);
        noteText.value = presentNotes[l];


        let done = document.getElementById(`done${l}`);

        let noUse = doneFn(done);

        // alert(`notetext${l}`);


        let edit = document.getElementById(`edit${l}`);

        edit.addEventListener('click', () => {
            // alert("clicked");

            editFn(edit, l);

            let noteText = document.getElementById(`notetext${l}`);
            // alert("noteText = "+noteText.value);
            // storeLocalData(noteText);


        });

        var del = document.getElementById(`del${l}`);
        del.addEventListener('click', () => {
            checkFlag = 1;

            delFn(del, l);


        });






    }
}

// var d=new Date();
// console.log(typeof d);
// console.log(d.getMonth);




// let container=document.getElementById("container");

