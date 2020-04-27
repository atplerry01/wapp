import { Component, OnInit } from '@angular/core';
import { IAllAccess, IEmployee, IMenu, IMenuWithPagination, IRole, IRoleAccess, ISpecialRoleAccess, ISubMenu, ISubMenuWithPagination } from '../../shared/my-interfaces';
import { DataService } from '../../shared/service/data.service';
import { UtilityService } from '../../shared/service/utility.service';

// import { fadeAnimation } from '../../shared';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  // animations: [fadeAnimation] // register the animation
})
export class MenuComponent implements OnInit {

  currentAction = ''; // hold current action being perform on certain form.
  isInprogress = false;
  showNotFoundMsg = false;
  showForm = false;

  menus: IMenu[] = [];
  selectedMenu: IMenu;

  submenus: ISubMenu[] = [];
  selectedSubmenu: ISubMenu;

  roles: IRole[] = [];

  roleAccesses: IRoleAccess[] = [];
  selectedRoleAccess: IRoleAccess;

  specialRoleAccess: ISpecialRoleAccess[] = [];
  selectedSpecialAccess: ISpecialRoleAccess;

  allAccesses: IAllAccess[] = [];

  employees: IEmployee[] = [];
  employeesFiltered: IEmployee[] = [];
  showEmployeeFilter = false;

  isCollapseOnSelect = true;
  showCloseIcon = false;
  selectedMenuIndex = null;
  selectedMenuId = '';
  selectedSubmenuId = '';

  selectedAccessRoleMemberIndex = null;
  selectedAccessRoleMemberId = '';
  isCollapseOnSelect_accessRoleMember = false;
  showCloseIcon_accessRoleMember = false;

  selectedRoleAccessIndex = null;
  selectedRoleAccessId = '';
  isCollapseOnSelect_access = false;
  showCloseIcon_access = false;


  name = '';
  subname = '';

  showSubmenus = false;
  showRoleAccess = false;
  showEmployees = false;

  menuHeaders = [
    {
      name: 'menu_id',
      title: 'ID',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'menu_name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'menu_order',
      title: 'Order',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'menu_image',
      title: 'Icon',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'menu_link',
      title: 'Url',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'standalone',
      title: 'Stand alone',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'menu_display_inside',
      title: 'Internal',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  subMenuHeaders = [
    {
      name: 'submenu_id',
      title: 'ID',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'menu_id',
      title: 'Parent ID',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'submenu_name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'submenu_order',
      title: 'Order',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'submenu_link',
      title: 'Url',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'favourite_status',
      title: 'Fav_Status',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'favourite_order',
      title: 'Fav_Order',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'submenu_display_inside',
      title: 'Internal',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  rolesHeaders = [
    {
      name: 'roleid',
      title: 'ID',
      right: true,
      isDate: false,
      isNumber: false
    },
    {
      name: 'role_name',
      title: 'Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  RoleAccessHeaders = [
    {
      name: 'roleid',
      title: 'Role Id',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'role_name',
      title: 'Role Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'submenu_id',
      title: 'Submenu ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'access_level_id',
      title: 'Access ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    }];

  specialAccessHeaders = [
    {
      name: 'submenu_id',
      title: 'Submenu ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'userid',
      title: 'User',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'access_level_id',
      title: 'Access ID',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'status',
      title: 'Status',
      right: false,
      isDate: false,
      isNumber: false
    }
  ];

  EmployeeHeaders = [
    {
      name: 'EmployeeNumber',
      title: 'Staff No',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'EmployeeName',
      title: 'Employee Name',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'JobTitle',
      title: 'Job Title',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Department',
      title: 'Department',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'Grade',
      title: 'Grade',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BranchCode',
      title: 'Branch Code',
      right: false,
      isDate: false,
      isNumber: false
    },
    {
      name: 'BranchName',
      title: 'Branch Name',
      right: false,
      isDate: false,
      isNumber: false
    }

  ];


  // form properties
  model = {};
  fields: any[] = [];
  submitLabel = 'Submit';
  formTitle = '';
  selectedFormIndex: any;


  constructor(
    private dataService: DataService,
    public utilityService: UtilityService
  ) { }

  ngOnInit() {
    const myAccess = this.utilityService.getAccessInfo('APP ADMIN');
    if (myAccess.name !== 'No Access') {
       this.getMenu();
     } else {
       this.utilityService.goBack();
     }
  }




  getMenu() {

    this.showNotFoundMsg = false;
    this.isInprogress = true;

    this.dataService.Get(`menus?name=${this.name}&page=1&per_page=1000`)
      .subscribe((res) => {

        const result: IMenuWithPagination = res;
        if (result && result.data) {
          // console.log(res, result);
          this.menus = result.data;
        } else {
          this.showNotFoundMsg = true;
        }

        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.closeSubmenu();
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
          this.showNotFoundMsg = true;
        });
  }

  getSubmenus(menu_id: string) {

    if (!menu_id || this.selectedMenuId === menu_id) {
      this.closeSubmenu();
      return;
    }
    this.selectedMenuId = menu_id;

    this.dataService.Get(`submenus?menu_id=${menu_id}&name=${this.subname}&page=1&per_page=1000`)
      .subscribe((res) => {

        const result: ISubMenuWithPagination = res;

        if (result && result.data.length > 0) {
          this.submenus = result.data;
          this.isCollapseOnSelect = true;
          this.showCloseIcon = true;
        } else {
          this.utilityService.showInfoToast(
            'Submenu not available at the moment',
            'Submenu!'
          );
          this.isCollapseOnSelect = false;
          this.showCloseIcon = false;
        }

        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.closeSubmenu();
          this.showCloseIcon = false;
          this.isCollapseOnSelect = false;
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });

  }

  getSubmenuRoles(submenu_id: string) { // submenu access roles

    if (!submenu_id || this.selectedRoleAccessId === submenu_id) {
      this.closeRoleAccess();
      return;
    }
    this.selectedRoleAccessId = submenu_id;

    this.dataService.Get(`submenuroles/${submenu_id}`)
      .subscribe((res) => {

        const data: IAllAccess = res;

        if ((data.roles && data.roles.length > 0) || (data.roles && data.specialRoles.length > 0)) {
          this.roleAccesses = data.roles;
          this.specialRoleAccess = data.specialRoles;
          this.isCollapseOnSelect_access = true;
          this.showCloseIcon_access = true;
        } else {
          this.utilityService.showInfoToast(
            'Access Roles not available at the moment',
            'Access Role!'
          );
          this.isCollapseOnSelect_access = false;
          this.showCloseIcon_access = false;
        }

        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.roles = [];
          this.showCloseIcon_access = false;
          this.isCollapseOnSelect_access = false;
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });

  }

  getAccessRoleMembers(roleid: string) {

    if (!roleid || this.selectedAccessRoleMemberId === roleid) {
      this.closeRoleAccessUsers();
      return;
    }
    this.selectedAccessRoleMemberId = roleid;
    this.showEmployeeFilter = false;

    this.dataService.Get(`getEmployeesByRole/${roleid}`)
      .subscribe((res) => {

        this.employees = res;
        this.employeesFiltered = res;

        if (this.employees && this.employees.length > 0) {
          this.isCollapseOnSelect_accessRoleMember = true;
          this.showCloseIcon_accessRoleMember = true;
          if (this.employees.length > 30) {
            this.showEmployeeFilter = true;
          }
        } else {
          this.utilityService.showInfoToast(
            'Roles not available at the moment',
            'Roles!'
          );
          this.isCollapseOnSelect_accessRoleMember = false;
          this.showCloseIcon_accessRoleMember = false;
        }

        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.roles = [];
          this.isCollapseOnSelect_accessRoleMember = false;
          this.showCloseIcon_accessRoleMember = false;
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });

  }

  onSearch($event) {
    // console.log('Search params:', JSON.stringify($event));
    this.name = $event.sText1;
    this.getMenu();
  }

  onRowSelected($event) {
    // console.log('Row Selected Datea', JSON.stringify($event));
    this.showSubmenus = !this.showSubmenus;
    this.getSubmenus($event.menu_id);
    console.log(this.showSubmenus);
  }

  closeSubmenu() {
    this.showSubmenus = false;
    this.submenus = [];
    this.closeRoleAccess();
  }


  onSubmenuRowSelected($event) {
    // console.log('Row Selected Datea', JSON.stringify($event));
    this.showRoleAccess = !this.showRoleAccess;
    this.getSubmenuRoles($event.submenu_id);
    this.selectedSubmenuId = $event.submenu_id;
  }

  closeRoleAccess() {
    this.showRoleAccess = false;
    this.roleAccesses = [];
    this.specialRoleAccess = [];
    this.closeRoleAccessUsers();
  }


  onRoleAccessRowSelected($event) {
    // console.log('Row Selected Datea', JSON.stringify($event));
    this.getAccessRoleMembers($event.roleid);
  }

  closeRoleAccessUsers() {
    this.employees = [];
    this.employeesFiltered = [];
  }

  onFilterTextChange($event) {
    console.log('typing: ', $event);
    this.employeesFiltered = this.employees.filter(x => x.EmployeeName.toLowerCase().includes($event.toLowerCase()));
  }

  setForm() {
    switch (this.currentAction) {
      case 'add_menu':
        this.fields = this.menuForm;
        break;
      case 'edit_menu':
      case 'del_menu':
        this.model = this.selectedMenu;
        this.fields = this.menuForm;
        break;

      case 'add_submenu':
        this.fields = this.subMenuForm;
        break;
      case 'edit_submenu':
      // Todo
      // this.model = this.selectedSubmenu;
      // this.fields = this.menuForm;
      // break;
      case 'del_submenu':
        this.model = this.selectedSubmenu;
        this.fields = this.subMenuForm;
        break;
      case 'add_roleAccess':
        this.fields = this.roleAccessForm;
        break;
      case 'edit_roleAccess':
      case 'del_roleAccess':
        this.model = this.selectedRoleAccess;
        this.fields = this.roleAccessForm;
        break;
      case 'add_specialAccess':
        this.fields = this.specialAccessForm;
        break;
      case 'edit_specialAccess':
      case 'del_specialAccess':
        this.model = this.selectedSpecialAccess;
        this.fields = this.specialAccessForm;
        break;
    }
  }

  onAddMenu() {
    this.currentAction = 'add_menu';
    this.selectedMenu = null;
    this.submitLabel = 'Add menu';
    this.formTitle = 'Add New Menu';
    this.model = {};
    this.setForm();
    this.showForm = true; // display form
  }

  onMenuEdit($event) {
    this.currentAction = 'edit_menu';
    this.submitLabel = 'Edit menu';
    this.formTitle = 'Edit Menu';
    this.selectedMenu = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.menus.indexOf($event);
  }

  onMenuDelete($event) {
    console.log('Menu to Delete', JSON.stringify($event));
    this.currentAction = 'del_menu';
    this.submitLabel = 'Delete menu';
    this.formTitle = 'You About To Delete This Menu';
    this.selectedMenu = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.menus.indexOf($event);
  }

  onAddSubMenu() {
    console.log('Adding sub menu');
    this.currentAction = 'add_submenu';
    this.selectedMenu = null;
    this.submitLabel = 'Add Sub Menu';
    this.formTitle = 'Add New SubMenu';
    this.model = {};
    this.setForm();
    this.showForm = true; // display form

  }

  onSubMenuEdit($event) {
    this.currentAction = 'edit_submenu';
    this.submitLabel = 'Edit SubMenu';
    this.formTitle = 'Edit SubMenu';
    this.selectedSubmenu = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.submenus.indexOf($event);
  }

  onSubMenuDelete($event) {
    this.currentAction = 'del_submenu';
    this.submitLabel = 'Delete SubMenu';
    this.formTitle = 'You About To Delete This Menu';
    this.selectedSubmenu = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.submenus.indexOf($event);
    console.log('selected delete event:', JSON.stringify($event));
  }

  onAddRoleAccess() {
    this.currentAction = 'add_roleAccess';
    this.selectedRoleAccess = null;
    this.submitLabel = 'Add Role Access';
    this.formTitle = 'Add Role Access';
    this.model = {};
    this.setForm();
    this.showForm = true; // display form
  }

  onRoleAccessEdit($event) {
    this.currentAction = 'edit_roleAccess';
    this.submitLabel = 'Edit Role Access';
    this.formTitle = 'Edit Role Access';
    this.selectedRoleAccess = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.menus.indexOf($event);
  }

  onRoleAccessDelete($event) {
    this.currentAction = 'del_roleAccess';
    this.submitLabel = 'Delete AccessRole';
    this.formTitle = 'You About To Delete This Access Role';
    this.selectedRoleAccess = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.menus.indexOf($event);
  }

  onAddSpecialAccess() {
    this.currentAction = 'add_specialAccess';
    this.selectedSpecialAccess = null;
    this.submitLabel = 'Add Special Access';
    this.formTitle = 'Add Special Access';
    this.model = {};
    this.setForm();
    this.showForm = true;
  }

  onSpecialRoleAccessEdit($event) {
    this.currentAction = 'edit_specialAccess';
    this.submitLabel = 'Edit Special Access';
    this.formTitle = 'Edit Special Access';
    this.selectedSpecialAccess = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.menus.indexOf($event);
  }

  onSpecialRoleAccessDelete($event) {
    this.currentAction = 'del_specialAccess';
    this.submitLabel = 'Delete AccessRole';
    this.formTitle = 'You About To Delete This Access Role';
    this.selectedSpecialAccess = $event;
    this.setForm();
    this.showForm = true; // display form
    this.selectedFormIndex = this.menus.indexOf($event);
  }

  submit($event) {

    if ($event) {

      switch (this.currentAction) {
        case 'add_menu':
          this.postRequest('add_menu_item');
          break;
        case 'edit_menu':
          this.putRequest(`update_menu_item/${$event.idno}`);
          break;
        case 'del_menu':
          this.deleteRequest(`delete_menu_item/${$event.idno}`);
          break;
        case 'add_submenu':
          this.postRequest('add_menu_subs');
          break;
        case 'edit_submenu':
          this.putRequest(`update_menu_subs/${$event.submenu_id}`);
          break;
        case 'del_submenu':
          this.deleteRequest(`delete_menu_subs/${$event.submenu_id}`);
          break;

        case 'add_roleAccess':
          this.postRequest('add_menu_items_Roles');
          break;
        case 'edit_roleAccess':
          this.putRequest(`update_menu_items_Roles/${$event.idno}`);
          break;
        case 'del_roleAccess':
          this.deleteRequest(`delete_menu_items_Roles/${$event.idno}`);
          break;

        case 'add_specialAccess':
          this.postRequest('add_menu_items_SpecialRoles');
          break;
        case 'edit_specialAccess':
          this.putRequest(`update_menu_items_SpecialRoles/${$event.idno}`);
          break;
        case 'del_roleAccess':
          this.deleteRequest(`delete_menu_items_SpecialRoles/${$event.idno}`);
          break;
      }




    }
  }

  postRequest(url: string) {
    this.dataService.Post(this.model, url)
      .subscribe((res) => {

        if (res.success === true) {
          const data = this.model as any;

          switch (this.currentAction) {
            case 'add_menu':
              data.idno = res.idno;
              data.menu_id = res.menu_id;
              this.menus.unshift(data);
              break;
            case 'add_submenu':
              data.submenu_id = res.submenu_id;
              data.idno = res.idno;
              this.submenus.unshift(data);
              break;
            case 'add_roleAccess':
              data.idno = res.idno;
              data.roleid = res.roleid;
              this.roleAccesses.unshift(data);
              break;
            case 'add_specialAccess':
              data.idno = res.idno;
              this.specialRoleAccess.unshift(data);
              break;
          }

          this.utilityService.showSuccessToast('New entry successfully added!', 'Success!');
          this.showForm = false; // close form
        } else {
          this.utilityService.showErrorToast('Could not add new item', 'Something went wrong!');
        }
        this.isInprogress = false;

      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }

  putRequest(url: string) {

    console.log(this.model);
    console.log(url);

    this.dataService.Put(this.model, url)
      .subscribe((res) => {
        if (res.success === true) {
          const data = this.model as any;

          switch (this.currentAction) {
            case 'edit_menu':
              this.menus[this.selectedFormIndex] = data;
              break;
            case 'edit_submenu':
              this.submenus[this.selectedFormIndex] = data;
              break;
            case 'edit_roleAccess':
              this.roleAccesses[this.selectedFormIndex] = data;
              break;
            case 'edit_specialAccess':
              this.specialRoleAccess[this.selectedFormIndex] = data;
              break;
          }

          this.utilityService.showSuccessToast('Item successfully updated!', 'Success!');
          this.showForm = false; // close form
        } else {
          console.log(res);
          this.utilityService.showErrorToast('Could not update item', 'Something went wrong!');
        }
        this.isInprogress = false;
      },
        error => {
          console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }

  deleteRequest(url: string) {
    this.dataService.Delete(url)
      .subscribe((res) => {
        if (res.success === true) {
          switch (this.currentAction) {
            case 'del_menu':
              this.menus.splice(this.selectedFormIndex, 1);
              break;
            case 'del_submenu':
            this.submenus.splice(this.selectedFormIndex, 1);
              break;
            case 'del_roleAccess':
              this.roleAccesses.splice(this.selectedFormIndex, 1);
              break;
            case 'del_specialAccess':
              this.roleAccesses.splice(this.selectedFormIndex, 1);
              break;

          }

          this.utilityService.showSuccessToast('Item successfully removed!', 'Success!');
          this.showForm = false; // close form
        } else {
          this.utilityService.showErrorToast('Could not remove item', 'Something went wrong!');
        }
        this.isInprogress = false;
      },
        error => {
          // console.log(error);
          this.utilityService.showErrorToast(error, 'Something went wrong!');
          this.isInprogress = false;
        });
  }



  // forms sections
  get menuForm() {
    return [
      {
        key: 'menu_id',
        type: 'input',
        // templateOptions: {
        //   label: 'Menu ID',
        //   placeholder: 'Eneter menu ID',
        //   required: true,
        // },
        hide: true
      },
      {
        key: 'menu_name',
        type: 'input',
        templateOptions: {
          label: 'Menu Name',
          placeholder: 'Enter menu name',
          required: true,
        }
      },
      {
        key: 'menu_order',
        type: 'input',
        templateOptions: {
          label: 'Menu Order',
          type: 'number',
          placeholder: 'Enter menu order',
          required: true
        }
      },
      {
        key: 'menu_image',
        type: 'input',
        templateOptions: {
          label: 'Menu Image Url',
          placeholder: 'Enter menu image url'
        }
      },
      {
        key: 'menu_link',
        type: 'input',
        templateOptions: {
          label: 'Menu Link',
          placeholder: 'Enter menu Link'
        },
      },
      {
        key: 'standalone',
        type: 'select',
        defaultValue: 'Y',
        templateOptions: {
          label: 'Has members?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ],
        },
      },
      {
        key: 'status',
        type: 'select',
        defaultValue: 'Y',
        templateOptions: {
          label: 'Display?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ],
        },
      },
      {
        key: 'menu_display_inside',
        type: 'select',
        defaultValue: 'N',
        templateOptions: {
          label: 'Is External?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ],
        },
      }

    ];
  }

  get subMenuForm() {
    return [
      {
        key: 'submenu_id',
        type: 'input',
        // templateOptions: {
        //   label: 'SubMenu ID',
        //   placeholder: 'Enter menu ID',
        //   required: true,
        // },
        hide: true
      },
      {
        key: 'menu_id',
        type: 'input',
        // templateOptions: {
        //   label: 'Parent ID',
        //   placeholder: 'Enter Parent ID',
        //   required: true

        // },
        hide: true,
        defaultValue: this.selectedMenuId
      },
      {
        key: 'submenu_name',
        type: 'input',
        templateOptions: {
          label: 'SubMenu Name',
          placeholder: 'Enter menu name',
          required: true,
        }
      },
      {
        key: 'submenu_link',
        type: 'input',
        templateOptions: {
          label: 'Url',
          placeholder: 'Enter submenu Link',
          required: true
        },
      },
      {
        key: 'submenu_display_inside',
        type: 'select',
        defaultValue: 'Y',
        templateOptions: {
          label: 'Menu Display Inside?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' }
          ],
        },
      },
      {
        key: 'submenu_order',
        type: 'input',
        templateOptions: {
          label: 'SubMenu Order',
          placeholder: 'Enter menu order',
          type: 'number',
        }
      },
      {
        key: 'favourite_status',
        type: 'select',
        defaultValue: 'N',
        templateOptions: {
          label: 'Favorite Status?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' }
          ],
        },
      },
      {
        key: 'favourite_order',
        type: 'input',
        templateOptions: {
          label: 'Favoraite Order?',
          placeholder: 'Enter submenu order',
          type: 'number',
          required: false
        },
      },
      {
        key: 'status',
        type: 'select',
        defaultValue: 'Y',
        templateOptions: {
          label: 'Status?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ],
        },
      }

    ];
  }


  get roleAccessForm() {
    return [
      {
        // @todo: change to select option
        key: 'roleid',
        type: 'input',
        templateOptions: {
          label: 'Role Id',
          placeholder: 'Enter Role Id',
          required: true,
        },
      },
      {
        // @todo: populate from select option
        key: 'role_name',
        type: 'input',
        templateOptions: {
          label: 'Role Name',
          placeholder: 'Enter Role Name',
          required: true,
        },
      },
      {
        key: 'submenu_id',
        type: 'input',
        hide: true,
        defaultValue: this.selectedSubmenuId
      },
      {
        key: 'access_level_id',
        type: 'select',
        defaultValue: 'S',
        templateOptions: {
          label: 'Access Level?',
          options: [
            { label: 'Global Access', value: 'G' },
            { label: 'Regional Access', value: 'R' },
            { label: 'Zonal Access', value: 'Z' },
            { label: 'Branch Access', value: 'B' },
            { label: 'My Own', value: 'S' },
            { label: 'Maker', value: 'M' },
            { label: 'Checker', value: 'C' }
          ],
        },
      },
      {
        key: 'status',
        type: 'select',
        defaultValue: 'Y',
        templateOptions: {
          label: 'Status?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ],
        },
      }
    ];
  }

  get specialAccessForm() {
    return [
      {
        key: 'submenu_id',
        type: 'input',
        hide: true,
        defaultValue: this.selectedRoleAccessId
      },
      {
        key: 'access_level_id',
        type: 'select',
        defaultValue: 'S',
        templateOptions: {
          label: 'Access Level?',
          options: [
            { label: 'Global Access', value: 'G' },
            { label: 'Regional Access', value: 'R' },
            { label: 'Zonal Access', value: 'Z' },
            { label: 'Branch Access', value: 'B' },
            { label: 'My Own', value: 'S' },
            { label: 'Maker', value: 'M' },
            { label: 'Checker', value: 'C' }
          ],
        },
      },
      {
        key: 'userid',
        type: 'input',
        templateOptions: {
          label: 'Username',
          placeholder: 'Enter username. e.g. john.doe',
         // pattern: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
          required: true,
        },
      },
      {
        key: 'status',
        type: 'select',
        defaultValue: 'Y',
        templateOptions: {
          label: 'Status?',
          options: [
            { label: 'Yes', value: 'Y' },
            { label: 'No', value: 'N' },
          ],
        },
      }
    ];
  }

}



