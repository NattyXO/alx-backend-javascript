import Car from './10-car';

export default class EVCar extends Car {
  constructor(brand, motor, color, range) {
    super(brand, motor, color);
    this._range = range;
  }

  // Getter for range attribute
  get range() {
    return this._range;
  }

  // Method to clone the object
  cloneCar() {
    return new Car(this._brand, this._motor, this._color);
  }
}
