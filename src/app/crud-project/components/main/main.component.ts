import { DatePipe } from '@angular/common';
import {  Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  ValidatorFn,  Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { States } from 'src/app/core/constantes/estados';
import { AddData, DeleteData, GetData, UpdateData } from 'src/app/core/store/actions/app.action';
import { AppState } from 'src/app/core/store/state/app.state';
import { keyOnlyNumber } from 'src/app/shared/directives/helpers';
import { RutValidador } from 'src/app/shared/directives/validar-rut.directive';
import { CustomValidators } from 'ng2-validation';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  userInfo: any[] = [] ;
  userForm: FormGroup;
  validacionesCorreo: ValidatorFn[] = [Validators.required, CustomValidators.email, Validators.maxLength(80)];
  editUser = false;
  updateDataInfo:any;
  states = States

  @Select(AppState.selectStateData) userInfo$: Observable<any>;
  constructor( 
    private store: Store,
    private fb: FormBuilder,
    public datepipe: DatePipe,
    public toastService: ToastrService,
    private readonly rutValidation: RutValidador,
    ) { 
      
  }

  ngOnInit() {
    this.configurationForm();
    this.getData();
    console.log(this.f);
  }
  get f() { return this.userForm.controls; }

/**
 * This function creates a form group with the name userForm, and inside it, it creates a form control
 * with the name rut, and inside it, it creates a validator that checks if the input is required and if
 * it's a valid rut
 */
configurationForm(){
  const controlEmail = new FormControl('', this.validacionesCorreo);

  this.userForm = this.fb.group({
    rut: ['', [Validators.required,           
               this.rutValidation]],
    name: ['',[Validators.required]],
    lastName: ['',[Validators.required]],
    email: controlEmail,
    phoneNumber: ['',[Validators.required]],
    state: ['',[Validators.required]]
  })
}

/**
 * The function gets the data from the store and assigns it to the userInfo variable
 */
  getData(){
    this.store.dispatch(new GetData());
    this.userInfo$.subscribe((returnData) => {
      this.userInfo = returnData;
    })
  }

/**
 * The function calls the store's dispatch method, passing in an action object of type AddData. The
 * action object is created by calling the setDataStore function, passing in a boolean value of false
 */
  addUser() {  
    this.store.dispatch(new AddData(this.setDataStore(false)));
    this.userForm.reset();
    this.toastService.success('Informacion De usuario', 'Usuario Agregado', {
      timeOut: 2000,
    });
    
  }

 /**
  * It receives a boolean and an object as parameters, then it assigns the id and the registerDate to
  * the object if the boolean is true, otherwise it assigns a random id and the current date to the
  * object
  * @param {boolean} update - boolean
  * @param {any} [dataUser] - is the data of the user that is being edited.
  * @returns an object with the data of the form.
  */
  setDataStore(update:boolean , dataUser?:any){
    let id ;
    let date ;
    update ? id = dataUser.id : id = Math.random();
    update ? date = dataUser.registerDate : date = this.datepipe.transform(new Date(), 'dd/MM/yyyy HH:mm');
    const {rut ,state, lastName,name, phoneNumber, email} = this.userForm.getRawValue();
    const data : any = {
    id: id,
    rut:rut,
    name:name,
    lastName:lastName,
    number:phoneNumber,
    email:email,
    state:state,
    registerDate:date,
    }
    return data;
  }

/**
 * It takes the data from the user that was clicked on and sets the values of the form to the data of
 * the user
 * @param {any} data - any
 */
  updateUserForm(data:any) {
    this.editUser = true;
    this.updateDataInfo = data;
    const {rut ,state, lastName,name, number,email} = data
    this.userForm.get('rut')?.setValue(rut)
    this.userForm.get('name')?.setValue(name)
    this.userForm.get('lastName')?.setValue(lastName)
    this.userForm.get('phoneNumber')?.setValue(number)
    this.userForm.get('state')?.setValue(state)
    this.userForm.get('email')?.setValue(email)
  }

/**
 * It takes the data from the form, sets the loading state to true, and dispatches the action to the
 * store
 */
  updateUser(){
    const {id} = this.updateDataInfo;
    this.store.dispatch(new UpdateData(this.setDataStore(true, this.updateDataInfo), id));
    this.editUser = false;
    this.userForm.reset();
    this.toastService.success('Informacion De usuario', 'Usuario Editado', {
      timeOut: 2000,
    });

  }

/**
 * The function takes an index as an argument and dispatches an action to the store
 * @param {any} i - any - The index of the user to be deleted.
 */
  deleteUser(i:any) {
    this.store.dispatch(new DeleteData(i));
    this.toastService.error('Informacion De usuario', 'Usuario Eliminado', {
      timeOut: 2000,
    });

  }
  
  /**
 * It returns true if the key pressed is a number, false otherwise
 * @param {any} event - The event that is triggered when the user types in the input field.
 * @returns The function keyOnlyNumber is being returned.
 */
   onlyNumber(event:any) {
    return keyOnlyNumber(event);
  }


}
