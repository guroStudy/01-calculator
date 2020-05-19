const btnsHandlers = function () {
  console.log(this);
  //app에서 call을 통해 this를 전달하기 위해 regular function 사용
  return {
    numBtn: (e) => {
      this.setState({
        equation: this.equation.innerHTML + e.target.value,
        result: this.result.innerHTML + e.target.value,
      });
    },
    operatorBtn: (e) => {},
    dotBtn: (e) => {},
    acBtn: (e) => {},
    equalBtn: (e) => {},
    deleteBtn: (e) => {},
  };
};

export default btnsHandlers;
