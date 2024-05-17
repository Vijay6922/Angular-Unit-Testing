import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let mockEmployeeService: jasmine.SpyObj<EmployeeService>;
  let EMPLOYEES: Employee[];
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    EMPLOYEES = [
      { id: 1, firstName: 'vijay', lastName: 'kumar', emailId: 'vijaykumar@gmail.com' },
      { id: 2, firstName: 'chintu', lastName: 'vijay', emailId: 'chintu@gmail.com' },
      { id: 3, firstName: 'hiii', lastName: 'bye', emailId: 'hiiibye@gmail.com' },
    ];
    mockEmployeeService = jasmine.createSpyObj('EmployeeService', ['getEmployeesList', 'deleteEmployee']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    component = new EmployeeListComponent(mockEmployeeService, mockRouter);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch employees on initialization', () => {
    // Arrange
    mockEmployeeService.getEmployeesList.and.returnValue(of(EMPLOYEES));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.employees).toEqual(EMPLOYEES);
  });

  it('should navigate to update-employee route when updateEmployee is called', () => {
    // Arrange
    const employeeId = 1;

    // Act
    component.updateEmployee(employeeId);

    // Assert
    expect(mockRouter.navigate).toHaveBeenCalledWith(['update-employee', employeeId]);
  });

  it('should delete employee and fetch updated employee list when deleteEmployee is called', () => {
    // Arrange
    const employeeId = 2;
    mockEmployeeService.deleteEmployee.and.returnValue(of(true));
    mockEmployeeService.getEmployeesList.and.returnValue(of(EMPLOYEES.filter(employee => employee.id !== employeeId)));

    // Act
    component.deleteEmployee(employeeId);

    // Assert
    expect(mockEmployeeService.deleteEmployee).toHaveBeenCalledWith(employeeId);
    expect(component.employees.length).toBe(EMPLOYEES.length-1);
  });
});
