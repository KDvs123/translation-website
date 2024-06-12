const fromText = document.querySelector(".from-text"),
  toText = document.querySelector(".to-text"),
  selectTag = document.querySelectorAll("select"),
  translateBtn = document.querySelector("button");

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
      console.log(data);
      toText.value=data.responseData.translatedText;
    });
});
