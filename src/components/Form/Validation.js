const Validation = (dogInfo) => {
  let errors = {};

  if (dogInfo.name.length > 35 || dogInfo.name.length < 4 || !dogInfo.name) {
    errors.name = "El nombre del perro debe tener entre 4 y 35 caracteres";
  }
  if (!dogInfo.name) {
    errors.name = "Este campo no puede estar vacio";
  }
  if (!dogInfo.image) {
    errors.image = "Este campo no puede estar vacio";
  }
  // Accept both URLs and base64 data URLs
  const isUrl = /\bhttps?:\/\/\S+\.(png|jpe?g|gif|bmp)\b/i.test(dogInfo.image);
  const isBase64 = dogInfo.image && dogInfo.image.startsWith("data:image/");

  if (dogInfo.image && !isUrl && !isBase64) {
    errors.image = "Ingrese una direccion valida o seleccione un archivo";
  }
  if (!dogInfo.height) {
    errors.height = "Este campo no puede estar vacio";
  }
  if (!dogInfo.weight) {
    errors.weight = "Este campo no puede estar vacio";
  }
  if (!dogInfo.life_span) {
    errors.life_span = "Este campo no puede estar vacio";
  }
  // Allow ranges or single numbers for life span
  if (dogInfo.life_span && !/^[0-9\s-]+$/.test(dogInfo.life_span)) {
    errors.life_span =
      "El promedio de vida debe ser un numero o rango (ej: 10-12)";
  }
  return errors;
};

export default Validation;
