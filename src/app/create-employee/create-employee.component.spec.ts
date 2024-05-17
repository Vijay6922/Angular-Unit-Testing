import { CreateEmployeeComponent } from './create-employee.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';


describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    employeeService = jasmine.createSpyObj('EmployeeService', ['createEmployee']);
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new CreateEmployeeComponent(employeeService, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save valid employee data', () => {
    const employee: Employee = { id: 1, firstName: 'vijay', lastName: 'kumar', emailId: 'vijaykumar@gmail.com'  };
    employeeService.createEmployee.and.returnValue(of(employee));

    component.employee = employee;
    component.saveEmployee();

    expect(employeeService.createEmployee).toHaveBeenCalledWith(employee);
    expect(router.navigate).toHaveBeenCalledWith(['/employees']);
  });


  it('should navigate to employee list on form submission', () => {
    spyOn(component, 'saveEmployee');
    component.onSubmit();

    expect(component.saveEmployee).toHaveBeenCalled();

  });
});
