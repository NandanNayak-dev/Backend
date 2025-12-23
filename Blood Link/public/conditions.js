let check=document.querySelector(".check")
let bloodGroup=document.querySelector("#bloodGroup")


check.addEventListener("click",(e)=>{
    e.preventDefault()
    console.log(bloodGroup.value)
    if(bloodGroup.value!=="A+" && bloodGroup.value!=="A-" && bloodGroup.value!=="B+" && bloodGroup.value!=="B-" && bloodGroup.value!=="O+" && bloodGroup.value!=="O-" && bloodGroup.value!=="AB+" && bloodGroup.value!=="AB-"){
        alert("Invalid Blood Group")
    } 
    else{
        alert("Valid Blood Group")
    }

})