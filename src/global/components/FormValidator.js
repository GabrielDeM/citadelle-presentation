import validator from 'validator';

class FormValidator {
  constructor(validations) {
    this.validations = validations; // les validations et conditions sont envoyer en props
  }

  validate(state) {
    let validation = this.valid();

    this.validations.forEach(rule => {

      if (!validation[rule.field].isInvalid) { // si le champ est valide
        const fieldValue = state[rule.field].toString();
        const args = rule.args || [];
        const validationMethod =
          typeof rule.method === 'string' ?
          validator[rule.method] : // si la methode est une string, on considère que c'est une fonction de la library validator
          rule.method // sinon c'est une fonction fait maison

        if(validationMethod(fieldValue, ...args, state) !== rule.validWhen) { // si la fonction de validation renvoie une valeur différente que celle souhaité alors le champ n'est pas valide
          validation[rule.field] = { isInvalid: true, message: rule.message }
          validation.isValid = false;
        }
      }
    });

    return validation;
  }

  valid() {
    const validation = {}

    this.validations.map(rule => (
      validation[rule.field] = { isInvalid: false, message: '' }
    ));

    return { isValid: true, ...validation };
  }
}

export default FormValidator;
