class Test {
  //instanceVariable: number = 10;
  constructor(public instanceVariable: number = 10) {
    console.log('Test object created');
  }
}

let t = new Test();
console.log(t.instanceVariable);
