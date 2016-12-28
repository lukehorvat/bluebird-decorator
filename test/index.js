import should from "should";
import Bluebird from "bluebird";
import decorator from "../lib";

describe("bluebird-decorator", () => {
  it("should throw an error when applied to a class declaration", () => {
    (() => {
      @decorator
      class Dog {}
    }).should.throw("Decorator must be applied to a supported declaration type.");
  });

  it("should wrap the function's return value if it is a Promise", done => {
    class Dog {
      @decorator
      bark() { return Promise.resolve("Woof!") }
    }

    let dog = new Dog();
    let returnValue = dog.bark();
    returnValue.should.be.an.instanceof(Bluebird);
    returnValue.should.not.be.an.instanceof(Promise);
    returnValue.then(noise => { noise.should.be.exactly("Woof!") }).then(done).catch(done);
  });

  it("should ignore the function's return value if it is not a Promise", () => {
    class Dog {
      @decorator
      bark() { return "Woof!" }
    }

    let dog = new Dog();
    let returnValue = dog.bark();
    returnValue.should.not.be.an.instanceof(Bluebird);
    returnValue.should.not.be.an.instanceof(Promise);
    returnValue.should.be.exactly("Woof!");
  });

  it("should leave the function's bound value of 'this' intact", done => {
    class Obj {
      @decorator
      self() { return Promise.resolve(this) }
    }

    let obj = new Obj();
    obj.self().then(self => { self.should.equal(obj) }).then(done).catch(done);
  });
});
