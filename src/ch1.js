// 1° challenge: Protecting Objects

// Nuestro equipo ejecutó una función de simulación e identificó los siguientes problemas:

// → El satélite no valida si quien envía el mensaje es astronauta
// → El satélite no valida si quien recibe el mensaje es una estación espacial
// → El satélite no valida si quien envía el mensaje es parte de la tripulación de la estación espacial que recibe el mensaje

 function simulacion({ satelite, estacion, astronauta, texto }) {
    satelite.send({
        from: astronauta,
        to: estacion,
        text: texto,
    });
    
    return satelite.messages;
}
    
 class Astronaut {
    constructor({ name }) {
        this.name = name;
    }
}
    
 class SpaceStation {
    constructor({ name }) {
        this.name = name;
        this.team = [];
    }
    
    addTeamMember(newMember) {
        if (newMember instanceof Astronaut) {
        this.team.push(newMember.name);
        }
    }
}
    
 class Satelite {
    constructor({
        name,
    }) {
        this.name = name;
        this.messages = [];
    }

    send({ from, to, text }) {
        if(!(from instanceof Astronaut) || !(to instanceof SpaceStation)){ // ← solution
            console.warn("Not an astronaut nor a space station")
            return;
        };

        if( from.name != to.team.find( a => a == from.name)){
            console.warn("This Astronaut is not registered in the space station");
            return
        }
        this.messages.push({
        from: from.name,
        to: to.name,
        text,
        });
    }
}

    const satelitePlatziSat01 = new Satelite({ name: 'Platzi Sat01' });
    const capitanDC = new Astronaut({ name: 'Capitán DC' });
    const estacionPlatzi = new SpaceStation({ name: 'Estación Espacial Platzi' });
    estacionPlatzi.addTeamMember(capitanDC);
    satelitePlatziSat01.send({
      from: capitanDC,
      to: estacionPlatzi,
      text: "SOS",
    });
    console.log(satelitePlatziSat01.messages);

//     // Input
    // const satelitePlatziSat01 = new Satelite({ name: 'Platzi Sat01' });
    // const comandanteJuanita = new Astronaut({ name: 'Comandante Juanita' });
    // const estacionPlatzi = new SpaceStation({ name: 'Estación Espacial Platzi' });
    // satelitePlatziSat01.send({
    //   from: comandanteJuanita,
    //   to: estacionPlatzi,
    //   text: "Todo en orden",
    // });
    // console.log(satelitePlatziSat01.messages);

// // Output
//     []   

// Input
    // const satelitePlatziSat01 = new Satelite({ name: 'Platzi Sat01' });
    // const capitanImpostor = { name: 'Capitan Impostor' };
    // const estacionPlatzi = new SpaceStation({ name: 'Estación Espacial Platzi' });
    // satelitePlatziSat01.send({
    //   from: capitanImpostor,
    //   to: estacionPlatzi,
    //   text: "MUAJAJA",
    // });
    // console.log(satelitePlatziSat01.messages);

// Output
    
// 4:
// Input
    // const satelitePlatziSat01 = new Satelite({ name: 'Platzi Sat01' });
    // const capitanImpostor = { name: 'Capitan Impostor' };
    // const estacionFalsa = { name: 'Estacion Espacial Falsa', team: ["Capitan Impostor"] };
    // satelitePlatziSat01.send({
    //   from: capitanImpostor,
    //   to: estacionFalsa,
    //   text: "MUAJAJA2",
    // });
    // console.log(satelitePlatziSat01.messages);

// Output
    // []