<script setup lang="ts">
import { ref } from 'vue'
import { addUser } from '@/services/UserService';

type FormField = {
    value: string | number;
    valid?: boolean;
    required: boolean;
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    errors: string[];
};

type FormType = {
    rut: FormField;
    nombres: FormField;
    apellidos: FormField;
    fechaNacimiento: FormField;
    edad: FormField;
    sexo: FormField;
    saldo: FormField;
};

const form = ref<FormType>({
    rut: {
        value: '',
        required: true,
        pattern: /\d{1,3}(?:\.\d{3}){2}-[0-9kK]$/,
        minLength: 11,
        maxLength: 12,
        errors: []
    },
    nombres: {
        value: '',
        required: true,
        pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
        minLength: 3,
        maxLength: 50,
        errors: []
    },
    apellidos: {
        value: '',
        required: true,
        pattern: /^[aA-zZáéíóúñÁÉÍÓÚÑ\s]*$/,
        minLength: 3,
        maxLength: 50,
        errors: []
    },
    fechaNacimiento: {
        value: '',
        required: true,
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        minLength: 10,
        maxLength: 10,
        errors: []
    },
    edad: {
        value: 0,
        valid: false,
        required: false,
        pattern: /^\d+$/,
        min: 1,
        max: 120,
        errors: []
    },
    sexo: {
        value: '',
        valid: false,
        required: true,
        pattern: /^(M|F)$/,
        errors: []
    },
    saldo: {
        value: 0,
        valid: false,
        required: true,
        pattern: /^\d+$/,
        min: 1,
        max: 999999999,
        errors: []
    },
});

const validateRut = (field: FormField) => {
    let rut = field.value.toString().replace(/[^0-9kK]/g, '').toUpperCase();

    if (rut.length < 8) {
        return { valid: false, errors: [] };
    }

    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1);
    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplo;
        multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    let dvEsperado: any = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return { valid: dv === dvEsperado, errors: dv !== dvEsperado ? ['El RUT ingresado es inválido.'] : [] };
}

const formatRut = (value: string) => {
    const cleanedValue = value.replace(/[^0-9kK]/g, '').toUpperCase();

    if (cleanedValue.length < 2) {
        return cleanedValue;
    }

    let parteNumerica = parseInt(cleanedValue.substring(0, cleanedValue.length - 1));
    let dv = cleanedValue[cleanedValue.length - 1];
    let rut = parteNumerica.toLocaleString('es-CL') + '-' + dv;

    console.log(`Formatted RUT: ${rut}`);

    return rut;
}

const validateField = (fieldName: string, field: FormField) => {
    let errors = [];

    if (fieldName === 'rut') {
        let rutValidation = validateRut(field);
        if (!rutValidation.valid) {
            errors.push(...rutValidation.errors);
        }
    }

    if (field.required && String(field.value).trim() === '') {
        errors.push('El campo es obligatorio.');
    }

    if (field.pattern && !field.pattern.test(field.value.toString())) {
        errors.push(`Debe cumplir con el formato requerido ${field.pattern.toString()}.`);
    }

    if (field.minLength && String(field.value).length < field.minLength) {
        errors.push(`El largo minimo es ${field.minLength}.`);
    }

    if (field.maxLength && String(field.value).length > field.maxLength) {
        errors.push(`El largo maximo es ${field.maxLength}.`);
    }

    if (field.min && parseInt(String(field.value)) < field.min) {
        errors.push(`El valor minimo es ${field.min}.`);
    }

    if (field.max && parseInt(String(field.value)) > field.max) {
        errors.push(`El valor maximo es ${field.max}.`);
    }

    let valid = errors.length === 0;

    return { valid: valid, errors: errors };
}

const handleValueChange = (e: any) => {
    const { id, value } = e.target;

    let fieldName: string = id.toUpperCase().includes('SEXO') ? 'sexo' : id;

    let field = form.value[fieldName as keyof FormType];

    console.log(fieldName, field);

    let formatedValue = value;

    if (id === 'rut') {
        formatedValue = formatRut(value);
    }

    if (id === 'fechaNacimiento') {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        let edadField = form.value.edad;

        edadField.valid = true;

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            edadField.value = age - 1;
        } else {
            edadField.value = age;
        }

        if (edadField.value < 0) {
            edadField.value = 0;
        }

        let edadValidations = validateField('edad', edadField);

        edadField.valid = edadValidations.valid;
        edadField.errors = edadValidations.errors;

        form.value.edad = edadField;
    }

    if (id === 'sexoM' || id === 'sexoF') {
        formatedValue = id === 'sexoM' ? 'M' : 'F';

        if (!e.target.checked) {
            formatedValue = '';
        }
    }

    field.value = formatedValue;

    let validations = validateField(fieldName, field);
    
    field.valid = validations.valid;
    field.errors = validations.errors;

    form.value[fieldName as keyof FormType] = field;
}

const validateForm = () => {
    let isValid = true;
    // Access the value property of the ref
    let updatedForm = { ...form.value };

    for (let key in updatedForm) {
        if (Object.prototype.hasOwnProperty.call(updatedForm, key)) {
            let field = updatedForm[key as keyof FormType];
            let validations = validateField(key, field);
            field.valid = validations.valid;
            field.errors = validations.errors;

            if (!field.valid) {
                isValid = false;
            }
        }
    }

    // Update the form ref with the validated fields
    form.value = updatedForm;

    return isValid;
}

const resetForm = () => {
    form.value.rut.value = '';
    form.value.rut.errors = [];
    form.value.nombres.value = '';
    form.value.nombres.errors = [];
    form.value.apellidos.value = '';
    form.value.apellidos.errors = [];
    form.value.fechaNacimiento.value = '';
    form.value.fechaNacimiento.errors = [];
    form.value.edad.value = 0;
    form.value.edad.errors = [];
    form.value.sexo.value = '';
    form.value.sexo.errors = [];
    form.value.saldo.value = 0;
    form.value.saldo.errors = [];

    validateForm();
}

const processForm = () => {
    let isValid = validateForm();

    console.log('Form validation result:', isValid, form.value);

    if (isValid) {
        let user = {
            rut: form.value.rut.value as string,
            nombres: form.value.nombres.value as string,
            apellidos: form.value.apellidos.value as string,
            fechaNacimiento: form.value.fechaNacimiento.value as string,
            edad: form.value.edad.value as number,
            sexo: form.value.sexo.value as string,
            saldo: form.value.saldo.value as number
        };
        addUser(user);
        resetForm();
    }
}

validateForm();
</script>

<template>
    <div>
        <h3 class="text-white">Add User</h3>
        <form @submit.prevent="processForm">
            <div class="mb-3">
                <label for="rut" class="form-label text-white">RUT</label>
                <input type="text"
                    :class="'form-control' + (form.rut.errors && form.rut.errors.length > 0 ? ' is-invalid' : '')"
                    id="rut" :minlength="form.rut.minLength" :maxlength="form.rut.maxLength" :value="form.rut.value"
                    :required="form.rut.required" @input="handleValueChange($event)" />
                <span class="text-danger" id="rut-errors">
                    <div v-if="form.rut.errors && form.rut.errors.length > 0" v-for="(error, index) in form.rut.errors"
                        :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </span>
            </div>
            <div class="mb-3">
                <label for="nombres" class="form-label text-white">Nombres</label>
                <input type="text"
                    :class="'form-control' + (form.nombres.errors && form.nombres.errors.length > 0 ? ' is-invalid' : '')"
                    id="nombres" :minlength="form.nombres.minLength" :maxlength="form.nombres.maxLength"
                    :value="form.nombres.value" :required="form.nombres.required" @input="handleValueChange($event)" />
                <span class="text-danger" id="nombres-errors">
                    <div v-if="form.nombres.errors && form.nombres.errors.length > 0"
                        v-for="(error, index) in form.nombres.errors" :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </span>
            </div>
            <div class="mb-3">
                <label for="apellidos" class="form-label text-white">Apellidos</label>
                <input type="text"
                    :class="'form-control' + (form.apellidos.errors && form.apellidos.errors.length > 0 ? ' is-invalid' : '')"
                    id="apellidos" :minlength="form.apellidos.minLength" :maxlength="form.apellidos.maxLength"
                    :value="form.apellidos.value" :required="form.apellidos.required"
                    @input="handleValueChange($event)" />
                <span class="text-danger" id="apellidos-errors">
                    <div v-if="form.apellidos.errors && form.apellidos.errors.length > 0"
                        v-for="(error, index) in form.apellidos.errors" :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </span>
            </div>
            <div class="mb-3">
                <label for="fechaNacimiento" class="form-label text-white">Fecha de nacimiento</label>
                <input type="date"
                    :class="'form-control' + (form.fechaNacimiento.errors && form.fechaNacimiento.errors.length > 0 ? ' is-invalid' : '')"
                    id="fechaNacimiento" min="1900-01-01" :value="form.fechaNacimiento.value"
                    :required="form.fechaNacimiento.required" @change="handleValueChange($event)" />
                <span class="text-danger" id="fechaNacimiento-errors">
                    <div v-if="form.fechaNacimiento.errors && form.fechaNacimiento.errors.length > 0"
                        v-for="(error, index) in form.fechaNacimiento.errors" :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </span>
            </div>
            <div class="mb-3">
                <label for="edad" class="form-label text-white">Edad</label>
                <input type="number"
                    :class="'form-control' + (form.edad.errors && form.edad.errors.length > 0 ? ' is-invalid' : '')"
                    id="edad" readOnly :min="form.edad.min" :max="form.edad.max" :value="form.edad.value"
                    :required="form.edad.required" @change="handleValueChange($event)" />
                <span class="text-danger" id="edad-errors">
                    <div v-if="form.edad.errors && form.edad.errors.length > 0"
                        v-for="(error, index) in form.edad.errors" :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </span>
            </div>
            <div class="mb-3">
                <label class="form-label text-white">Sexo</label>
                <br />
                <input type="checkbox" class="form-check-input" id="sexoM" :value="form.sexo.value"
                    :required="form.sexo.required && form.sexo.value === ''" :checked="form.sexo.value === 'M'"
                    @change="handleValueChange($event)" />
                <label class="form-check-label text-white ms-1 me-2" for="sexoM">Masculino</label>
                <input type="checkbox" class="form-check-input" id="sexoF" :value="form.sexo.value"
                    :required="form.sexo.required && form.sexo.value === ''" :checked="form.sexo.value === 'F'"
                    @change="handleValueChange($event)" />
                <label class="form-check-label text-white ms-1" for="sexoF">Femenino</label>
                <span class="text-danger" id="sexo-errors">
                    <div v-if="form.sexo.errors && form.sexo.errors.length > 0"
                        v-for="(error, index) in form.sexo.errors" :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </span>
            </div>
            <div class="mb-3">
                <label for="saldo" class="form-label text-white">Saldo</label>
                <input type="number"
                    :class="'form-control' + (form.saldo.errors && form.saldo.errors.length > 0 ? ' is-invalid' : '')"
                    id="saldo" :min="form.saldo.min" :max="form.saldo.max" :value="form.saldo.value"
                    :required="form.saldo.required" @input="handleValueChange($event)" />
                <span class="text-danger" id="saldo-errors">
                    <div v-if="form.saldo.errors && form.saldo.errors.length > 0"
                        v-for="(error, index) in form.saldo.errors" :key="index" class="text-danger">
                        {{ error }}
                    </div>
                </span>
            </div>
            <button type="submit" class="btn btn-primary">Enviar</button>
            <button type="reset" class="btn btn-secondary ms-2" @click.prevent="resetForm">Limpiar</button>
        </form>
    </div>
</template>

<style scoped></style>