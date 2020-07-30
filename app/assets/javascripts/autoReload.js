$(function(){
  function buildHTML(message){
    if ( message.image ) {
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

  let reloadMessages = function() {
    let last_message_id = $('.MessageBox:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.mainChat-centre').append(insertHTML);
        $('.mainChat-centre').animate({ scrollTop: $('.mainChat-centre')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  always(() => {
    $(".form__submit").removeAttr("disabled");
    });
  setInterval(reloadMessages, 7000);
});