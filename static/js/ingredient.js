// 카드 삭제
// function deleteDiv() {
//   const div = document.getElementById('card');

//   div.remove();
// }


$(document).ready(function () {
  showCards();
});

$(document).on('click', '.test', function () {
  let target = $(this).next().children('h3').text()
  console.log(target)
  $.ajax({
    type: "POST",
    url: "/newItem",
    data: {
      "target": target
    },
    success: function (response) { // 성공하면
      // alert(response["msg"]);
      window.location.reload()
    }
  })
})


function addButton() {
  let food_name = $('#foodName').val();
  console.log(food_name)
  $.ajax({
    type: "POST",
    url: "/newItem",
    data: {
      "food_name": food_name
    },
    success: function (response) { // 성공하면
      // alert(response["msg"]);
      window.location.reload()
    }
  })
}



function showCards() {
  $.ajax({
    type: "GET",
    url: "/newItem",
    data: {},
    success: function (response) {
      let foodInfo = response['all_food'];
      // let targetInfo = $('#food-add-bar').val()
      console.log(response)
      // console.log(response['all_food'])
      for (let i = 0; i < foodInfo.length; i++) {
        let name = foodInfo[i]['음식명'];
        let info1 = foodInfo[i]['1인분칼로리(kcal)'];
        let info2 = foodInfo[i]['탄수화물(g)'];
        let info3 = foodInfo[i]['단백질(g)'];
        let info4 = foodInfo[i]['지방(g)'];
        let info5 = foodInfo[i]['콜레스트롤(g)'];
        let info6 = foodInfo[i]['식이섬유(g)'];
        let info7 = foodInfo[i]['나트륨(g)'];

        let temp_html = `<div class="card">
                            <button type="button" class="test btn-close btn-close-black btn-close-card" aria-label="Close"></button>
                            <div class="food-info-text">
                                <!-- 음식이름 -->
                                <h3 class="card-title">${name}</h3>

                                <!-- 음식정보 -->
                                <div class="food-info">
                                    <h5 class="nutrient">영양 성분</h5>
                                    <div class="nutrient1">열량 : ${info1}kcal</div>
                                    <div class="nutrient2">탄수화물 : ${info2}g</div>
                                    <div class="nutrient3">단백질 : ${info3}g</div>
                                    <div class="nutrient4">지방 : ${info4}g</div>
                                    <div class="nutrient5">콜레스테롤 : ${info5}mg</div>
                                    <div class="nutrient6">식이섬유 : ${info6}g</div>
                                    <div class="nutrient7">나트륨 : ${info7}g</div>
                                </div>
                            </div>

                              <!-- 레시피 정보 버튼 -->
                              <button type="button" class="btn-style" data-bs-toggle="modal" data-bs-target="#exampleModal"">RECIPE SEARCH
                              </button>
                          </div>`
        $('.card-wrap').append(temp_html)
      }

    }
  })
}