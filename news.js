const submitButton = document.getElementById('locationsubmit');
const refreshButton = document.getElementById('refresh');
const inputLocation = document.getElementById('locationinput');
const resultDiv = document.getElementById('result');
const card = document.querySelector(".container");



refreshButton.addEventListener('click', ()=>{
  location.reload();
})

submitButton.addEventListener('click', async () => {
  const apiKey = (await fetch('apis.json').then(response => response.json()))[1];
  const city = inputLocation.value;
  const finaldata = await doit(city,apiKey);
  

  let html = '';
  card.style.display = 'flex'
  for (let i = 0; i < 5; i++) {
    html += `<div class="card">`;

    if (finaldata[i].title) {
      html += `<h2>${finaldata[i].title}</h2>`;
    } else {
      html += `<p>*The Translation to English is not available, click the link below to see the original news*</p>`;
    }

    if (finaldata[i].categories && finaldata[i].content) {
      html += `<p><strong>Category:</strong> ${finaldata[i].categories[0] || 'Hot Topic'}</p>`;
      html += `<p><strong>Content:</strong> ${finaldata[i].content.split('.')[0] + finaldata[i].summary}</p>`;
    } else {
      html += `<p>*The Translation to English is not available, click the link below to see the original news*</p>`;
    }

    if (finaldata[i].url) {
      html += `<p><a href="${finaldata[i].url}" target="_blank">Read more</a></p>`;
    } else {
      html += `<p>*The Translation to English is not available, click the link below to see the original news*</p>`;
    }

    html += `</div>`;
  }
  resultDiv.innerHTML = html;
});


async function doit(sheher,apiKey){
  const url = `https://api.goperigon.com/v1/all?&title="${sheher}"&q="Canada"&apiKey=${apiKey}`;
  const data = await fetch(url).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });


  finaldata = (Object.values(data))[2]

  return finaldata

  /*console.log(finaldata)
  let titles = []
  let categories = []
  let contents = []
  let urls = []

  for(let i=0; i <= 4; i++){
    if(finaldata[i].title !== 'undefined'){
      titles.push(finaldata[i].title)
    }
    if((((finaldata[i]).content).split("."))[0] !== 'undefined'){
      contents.push((((finaldata[i]).content).split("."))[0] + String(finaldata[i].summary))
    }
    categories.push((((finaldata[i]).categories)[0]).name)
    
    urls.push(finaldata[i].url)

  }

  
  console.log(titles);
  console.log(categories);
  console.log(contents);
  console.log(urls);*/
}



