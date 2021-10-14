

//-------------------------------SUBMIT Question function (working)------------------------------//
function newQuestion(){
fetch('https://adultingfullstack.herokuapp.com/forumQuestions',{
  method:"POST",
  headers:{ 'Accept':'application/json','Content-Type': 'application/json'},
  body:JSON.stringify(
    {topic:document.getElementById('inputGroupSelect01').value,
    question:document.getElementById('question').value})
})
  .then (res => res.json())
  .then (data => console.log(data))
  .catch(function (err) {
//       console.log('wrong', err); // console.log the errors if any
  });
 }


//---------------------------WORKING SUBMIT ANSWER FUNCTION (working)-----------------------//


function submitAnswer(){
  fetch('https://adultingfullstack.herokuapp.com/Answers',{
    method:"POST",
    headers:{ 'Accept':'application/json','Content-Type': 'application/json'},
    body:JSON.stringify(
      {answer:document.getElementById('answer').value})
  })
    .then (res => res.json())
//     .then (data => console.log(data))
    .catch(function (err) {
        // console.log('wrong', err);
    });
   }






    






