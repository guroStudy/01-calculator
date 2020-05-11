
/**
 * 버튼에 클릭 이벤트 걸기
 */
const buttons = document.querySelectorAll('.button');

const setButtonActive = function(e) {
    e.target.classList.add('active');
}

const setButtonDefault = function(e) {
    e.target.classList.remove('active');
}

buttons.forEach(el => {
    el.addEventListener('mousedown', setButtonActive);
    el.addEventListener('mouseup', setButtonDefault);
    el.addEventListener('mouseout', setButtonDefault);
})