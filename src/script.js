function toJson(elems) {
    return {
        nombre: elems[0].value,
        apellido: elems[1].value,
        numero: elems[2].value,
        direccion: elems[3].value,
        observaciones: elems[4].value,
    };
}
