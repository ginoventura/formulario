import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IEquipo } from 'src/app/models/i-equipo';
import { IGenero } from 'src/app/models/i-genero';
import { IHobbie } from 'src/app/models/i-hobbie';
import { INacionalidad } from 'src/app/models/i-nacionalidad';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {
  
  form!: FormGroup;
  generos!: IGenero[];
  nacionalidades!: INacionalidad[];
  equipos!: IEquipo[];
  hobbies!: IHobbie[];
  submitted: boolean = false;
  showInfo: boolean = false;

  constructor(private _fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.loadData();
    this.initForm();
  }

  get hobbiesArray(): FormArray {
    return this.form.controls['hobbies'] as FormArray;
  }

  setHobby(event: any): void {
    if (event.target.checked) {
      this.hobbiesArray.push(new FormControl(event.target.value));
    } else {
      let index = this.hobbiesArray.controls.findIndex(h => h.value == event.target.value);
      if (index >= 0) {
        this.hobbiesArray.removeAt(index);
      }
    }
  }

  showData(): void {
    this.submitted = true;
    if(this.form.valid) {
      this.showInfo = true;
    }
  }

  reset(): void {
    this.submitted = false;
    this.initForm();
  }

  back(): void {
    this.showInfo = false;
    this.reset();
  }

  private loadData(): void {
    this.generos = [
      <IGenero> {
        codigo: 'F',
        nombre: 'Femenino',
        checked: true
      },
      <IGenero> {
        codigo: 'M',
        nombre: 'Masculino',
        checked: false
      },
      <IGenero> {
        codigo: 'NB',
        nombre: 'No binario',
        checked: false
      }
    ];

    this.nacionalidades = [
      <INacionalidad> {
        codigo: 'ARG',
        nombre: 'Argentina',
        selected: true
      },
      <INacionalidad> {
        codigo: 'BRA',
        nombre: 'Brasil',
      },
      <INacionalidad> {
        codigo: 'CHI',
        nombre: 'Chile',
      },
      <INacionalidad> {
        codigo: 'URU',
        nombre: 'Uruguay',
      },
    ];
    
    this.equipos = [
      <IEquipo> {
        codigo: 'CAB',
        nombre: 'Belgrano'
      },
      <IEquipo> {
        codigo: 'CABJ',
        nombre: 'Boca'
      },
      <IEquipo> {
        codigo: 'CAI',
        nombre: 'Independiente'
      },
    ];

    this.hobbies = [
      <IHobbie> {
        codigo: 'C',
        nombre: 'Cantar'
      },
      <IHobbie> {
        codigo: 'B',
        nombre: 'Bailar'
      },
      <IHobbie> {
        codigo: 'P',
        nombre: 'Pescar'
      }
    ];
  }

  private initForm(): void {
    this.form = this._fb.group({
      apellido: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      clave: ['', [Validators.required]],
      confirmar_clave: ['', [Validators.required]],
      genero: [this.generos.find(g => g.checked)?.codigo], //Genero femenino chequeado
      fecha_nacimiento: [''],
      nacionalidad: [this.nacionalidades.find(n => n.selected)?.codigo], //Nacionalidad seleccionada
      equipo: [''],
      hobbies: this._fb.array([]), 
      actividades: ['']
    });
  }
}
