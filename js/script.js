const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  selectTag = document.querySelectorAll("select"),
  exchangeIcon = document.querySelector(".exchange"),
  translateBtn = document.querySelector("button"),
  icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    //selecting English by default as From language and Sinhala as to Language
    let selected;
    if (id == 0 && country_code == "en-GB") {
      selected = "selected";
    }
    if (id == 1 && country_code == "si-LK") {
      selected = "selected";
    }

    let option = `  <option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option); //adding options tag inside select tag
  }
});

exchangeIcon.addEventListener("click",()=>{
    //exchaning the text area and select tag values
    let tempText=fromText.value,
    tempLang=selectTag[0].value;
    fromText.value=toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value=tempText;
    selectTag[1].value = tempLang;
} )

translateBtn.addEventListener("click", () => {
  let text = fromText.value,
    translateFrom = selectTag[0].value, //getting fromSelect tag value
    translateTo = selectTag[1].value; //gettin toSelect tag value

  let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;

  //fetching api response and returning it with parsing into js obj
  // and in another then method receiving that obj
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      toText.value=data.responseData.translatedText;
    });
});

icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{

        if(target.classList.contains("fa-copy")){
            //if clicked icon has From id, copy the fromTextarea value else copy the toTextarea value
            if(target.id=="from"){
                navigator.clipboard.writeText(fromText.value);

            }else{
                 navigator.clipboard.writeText(toText.value);
            }
        }else{
            let utterance;
            // if clicked icon has from id, speak the fromTextarea value else speak the toTextArea value
            if (target.id == "from") {
              utterance=new SpeechSynthesisUtterance(fromText.value);
              utterance.lang=selectTag[0].value; //settin uttarance language to fromSelect tag value

            } else {
              utterance = new SpeechSynthesisUtterance(toText.value);
              utterance.lang = selectTag[1].value; //setting uttarance  language to toSelect tag value
            }

            speechSynthesis.speak(utterance) //speak the passed utterance
        }

    })
})