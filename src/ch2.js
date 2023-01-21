// 2° Navigation system exploits

// El Capitán DC está presentando problemas para navegar la nave espacial. Una y otra vez indica la dirección para entrar en la trayectoria correcta, pero misteriosamente la nave sigue cambiando de dirección sin su autorización.

// La estación espacial revisó los registros e identifico las siguientes vulnerabilidades:

// → Es posible clonar la llave de acceso a la nave desde la propiedad _spaceShipKey del Capitán DC.
// → Es posible clonar la llave de acceso a la nave desde la propiedad _key de la misma nave.

function simulador(astronaut, spaceShip, direction) {
    astronaut.navigate(spaceShip, direction);
    return spaceShip._movements;
  }
  
class Astronaut {
    constructor({ name }) {
      this.name = name
      this.private = {
        _spaceShipKey: undefined  // ← setting a private object that cannot be accessed directly
      }
    }
  
    setAccessKey(accessKey) {
      this.private._spaceShipKey = accessKey;
    }
  
    navigate(spaceShip, direction) {
      spaceShip.navigator(direction, { accessKey: this.private._spaceShipKey });
    }
  }
  
 class SpaceShip {
    constructor({ key }) {
      this.private = {
        _key: key               // ← setting a private object that cannot be accessed directly
      }
      this._movements = [];
    }
    
    getAccessKey(astronaut) {
      const isAstronaut = astronaut instanceof Astronaut;
  
      if (isAstronaut) {
        astronaut.setAccessKey(this.private._key);
      }
    }
  
    navigator(direction, { accessKey }) {
      if (this.private._key == accessKey) {
        this._movements.push(direction)
      } else {
        this._movements.push("Incorrect Access Key");
      }
    }
  }
  

// Object.defineProperty(Astronaut.prototype, "setAccessKey", {
//     writable: false,
//     enumerable: false,
//     configurable: false,
//     value:function (accessKey) {
//         Object.defineProperty(this, "_spaceShipKey", {
//           writable: true,
//           configurable: false,
//           enumerable: false,
//           value: accessKey,
//         });
//     }
// })




// Input
// const rocket99 = new SpaceShip({ key: "__LLAVE_DE_ACCESO__" });
// const capitandc = new Astronaut({ name: "Capitán DC" });
// rocket99.getAccessKey(capitandc);
// capitandc.navigate(rocket99, "left");

// console.log(rocket99._movements);

// console.log(capitandc._spaceShipKey)
// // Output
// ["left"]

//Input
// const rocket99 = new SpaceShip({ key: "__LLAVE_DE_ACCESO__" });
// const capitandc = new Astronaut({ name: "Capitán DC" });
// rocket99.getAccessKey(capitandc);

// const comandanteJuanita = new Astronaut({ name: "Comandante Juanita" });
// comandanteJuanita._spaceShipKey = capitandc._spaceShipKey;
// comandanteJuanita.navigate(rocket99, "right");

// console.log(rocket99._movements);

// // Output
// ["Incorrect Access Key"]

// Input
const rocket99 = new SpaceShip({ key: "__LLAVE_DE_ACCESO__" });
const capitanimpostor = {
  name: "Capitán Impostor",
  _spaceShipKey: rocket99._key,
  navigate(spaceShip, direction) {
    spaceShip.navigator(direction, { accessKey: this._spaceShipKey });
  }
};
capitanimpostor.navigate(rocket99, "COLISSION");

console.log(rocket99._movements);

// Output
// ["Incorrect Access Key"]