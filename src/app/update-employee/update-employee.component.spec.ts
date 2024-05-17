import { UpdateEmployeeComponent } from './update-employee.component';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

describe('UpdateEmployeeComponent', () => {
  let component: UpdateEmployeeComponent;
  let employeeService: jasmine.SpyObj<EmployeeService>;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(() => {
    employeeService = jasmine.createSpyObj('EmployeeService', ['getEmployeeById', 'updateEmployee']);
    route = new ActivatedRoute(); // We need to mock ActivatedRoute.params
    router = jasmine.createSpyObj('Router', ['navigate']);
    component = new UpdateEmployeeComponent(employeeService, route, router);
  });

  it('should update employee and navigate to employee list', () => {
    // Mock employee data
    const employeeId = 1;
    const updatedEmployee: Employee = { id: 1, firstName: 'Anil', lastName: 'Menda', emailId: 'anil@gmail.com' };
  
    // Setup spy for getEmployeeById to return the mock employee
    employeeService.getEmployeeById.and.returnValue(of(updatedEmployee));
  
    // Setup spy for updateEmployee to return a dummy observable
    employeeService.updateEmployee.and.returnValue(of(updatedEmployee));
  
    // Set component id and employee
    component.id = employeeId;
    component.employee = updatedEmployee;
  
    // Trigger onSubmit
    component.onSubmit();
  
    // Expect updateEmployee to be called with the updated employee data
    expect(employeeService.updateEmployee).toHaveBeenCalledWith(employeeId, updatedEmployee);
  
    // Expect router to navigate to employee list
    expect(router.navigate).toHaveBeenCalledWith(['/employees']);
  });
});  