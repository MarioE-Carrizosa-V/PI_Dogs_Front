const Validation = (dogInfo) => {
    let errors = {};

    if (dogInfo.name.length > 35 || dogInfo.name.length < 4 || !dogInfo.name){
        errors.name = 'El nombre del perro debe tener entre 4 y 35 caracteres'
        }
    if (!dogInfo.name){
        errors.name = 'Este campo no puede estar vacio'
        }
    if (!dogInfo.image){
        errors.image = 'Este campo no puede estar vacio'
        }
    if (!/\bhttps?:\/\/\S+\.(png|jpe?g|gif|bmp)\b/i.test(dogInfo.image)){
        errors.image = 'Ingrese una direccion valida'
        }
    if (!dogInfo.height){
        errors.height = 'Este campo no puede estar vacio'
        }
    if (!dogInfo.weight){
        errors.weight = 'Este campo no puede estar vacio'
        }
    if(!dogInfo.life_span){
        errors.life_span = 'Este campo no puede estar vacio'
        }
    if(!/^[0-9]+$/.test(dogInfo.life_span)){
        errors.life_span = 'El promedio de vida debe ser un numero'
        }
    if(!dogInfo.temperament.length){
        errors.temperament = 'Este campo no puede estar vacio'
    }
return errors
}

export default Validation 