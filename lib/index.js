import { DecoratorUtils } from "decorator-utils";
import Bluebird from "bluebird";

export default DecoratorUtils.createDecorator([
  DecoratorUtils.declarationTypes.CLASS_METHOD,
  DecoratorUtils.declarationTypes.CLASS_ACCESSOR,
  DecoratorUtils.declarationTypes.OBJECT_LITERAL_METHOD,
  DecoratorUtils.declarationTypes.OBJECT_LITERAL_ACCESSOR
], (target, name, descriptor) => {
  let method = descriptor.value;

  descriptor.value = function(...args) {
    let returnValue = method.apply(this, args);
    return returnValue instanceof Promise ? Bluebird.resolve(returnValue) : returnValue;
  };
});
