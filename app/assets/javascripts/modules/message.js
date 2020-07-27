$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox" data-message-id=${message.id}>
          <div class="mainChat-box">
            <div class="mainChat-box__name">
              ${message.user__name}
            </div>
            <div class="mainChat-box__deteline">
              ${message.created_at}
            </div>
          </div>
          <div class="messege">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MessageBox" data-message-id=${message.id}>
        <div class="mainChat-box">
          <div class="mainChat-box__name">
            ${message.user_name}
          </div>
          <div class="mainChat-box__deteline">
            ${message.created_at}
          </div>
        </div>
        <div class="messege">
          <p class="Message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    console.log("OK")
    e.preventDefault()
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.mainChat-centre').append(html);      
      $('form')[0].reset();
      $('.send').prop("disabled", false);
    })
  });
});
