// 문의 탭 전환과 config.js 값(오픈채팅·전화·SNS·후기) 반영 — 빈 값은 화면에서 숨긴다
(function () {
  var config = window.CLUB_CONFIG || {};

  // 문의 탭: 누른 탭의 내용만 보이게
  var tabs = document.querySelectorAll('[role="tab"]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var selected = t === tab;
        t.setAttribute('aria-selected', String(selected));
        document.getElementById(t.getAttribute('aria-controls')).hidden = !selected;
      });
    });
  });

  // 오픈채팅 버튼: 링크가 없으면 누를 수 없는 "준비 중" 표시
  document.querySelectorAll('.openchat-slot').forEach(function (slot) {
    var el;
    if (config.openChatUrl) {
      el = document.createElement('a');
      el.className = 'btn btn-kakao';
      el.href = config.openChatUrl;
      el.target = '_blank';
      el.rel = 'noopener';
      el.textContent = '카카오톡 오픈채팅으로 문의';
    } else {
      el = document.createElement('span');
      el.className = 'btn btn-disabled';
      el.textContent = '오픈채팅 링크 준비 중';
    }
    slot.appendChild(el);
  });

  if (config.phone) {
    var phoneLink = document.querySelector('.phone-link');
    phoneLink.href = 'tel:' + config.phone.replace(/[^0-9+]/g, '');
    phoneLink.textContent = config.phone;
    document.querySelector('.phone-line').hidden = false;
  }

  var sns = [['.sns-instagram', config.instagramUrl], ['.sns-band', config.bandUrl]];
  sns.forEach(function (pair) {
    if (!pair[1]) return;
    var link = document.querySelector(pair[0]);
    link.href = pair[1];
    link.hidden = false;
    document.querySelector('.sns-links').hidden = false;
  });

  // 회원 후기: 하나라도 있을 때만 섹션을 보여 준다
  var reviews = config.reviews || [];
  if (reviews.length) {
    var list = document.querySelector('.review-list');
    reviews.forEach(function (r) {
      var card = document.createElement('blockquote');
      card.className = 'review';
      var text = document.createElement('p');
      text.textContent = r.text;
      card.appendChild(text);
      if (r.name) {
        var name = document.createElement('cite');
        name.textContent = r.name;
        card.appendChild(name);
      }
      list.appendChild(card);
    });
    document.getElementById('reviews').hidden = false;
  }
})();
