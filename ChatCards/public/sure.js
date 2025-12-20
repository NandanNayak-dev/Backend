let delbtn = document.querySelectorAll(".delete");
for (let i = 0; i < delbtn.length; i++) {
  delbtn[i].addEventListener("click", function (e) {
    if (!confirm("Are you sure?")) {
      e.preventDefault(); 
    }
  });
}

let updbtn = document.querySelectorAll(".update");
for (let i = 0; i < updbtn.length; i++) {
  updbtn[i].addEventListener("click", function (e) {
    if (!confirm("Are you sure?")) {
      e.preventDefault();    
    }
  });
}


