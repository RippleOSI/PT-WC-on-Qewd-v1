let patientsPageState = {
    assemblyName: 'patients',
    name: 'patients',
    title: 'Patients',
    summary: {
      title: 'Patients',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Patient',
      headers: ['Name', 'Email'],
      data_properties: ['name', 'email'],
      qewd: {
        getSummary: 'getPatients',
        getDetail: 'getPatientInfo',
        delete: 'deletePatient'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New Patient',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit Patient Details',
      title_data_property: 'name',
      fields: [
        {
          name: 'name',
          data_property: 'name',
          label: 'Name',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'email',
          data_property: 'email',
          label: 'Email',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'username',
          data_property: 'username',
          label: 'Username',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'phone',
          data_property: 'phone',
          label: 'Telephone',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'gender',
          data_property: 'gender',
          label: 'Gender',
          type: 'select',
          labelWidth: 4,
          options: [
            {text: 'Male', value: 'm'},
            {text: 'Female', value: 'f'},
            {text: 'Not Specified', value: 'x'}
          ]
        },
        {
          name: 'userType',
          data_property: 'userType',
          label: 'Type of User',
          type: 'radios',
          radios: [
            {text: 'Administrator', value: 'admin'},
            {text: 'Public', value: 'public'},
            {text: 'Not Specified', value: 'x'}
          ]
        },
        {
          name: 'roles',
          data_property: 'roles',
          label: 'Roles',
          type: 'checkboxes',
          checkboxes: [
            {text: 'Doctor', value: 'doctor'},
            {text: 'Patient', value: 'patient'},
            {text: 'Carer', value: 'carer'},
            {text: 'Consultant', value: 'consultant'}
          ]
        },
        {
          name: 'age',
          data_property: 'age',
          label: 'Age',
          type: 'range',
          labelWidth: 3,
          min: 0,
          max: 100,
          marker: true
        },
        {
          name: 'prevEmp',
          data_property: 'prevEmp',
          label: 'Previous Employers',
          type: 'multiselect',
          options: [
            {text: 'NHS', value: 'nhs'},
            {text: 'Private Hospital', value: 'private'},
            {text: 'Community', value: 'community'},
            {text: 'GP Practice', value: 'gp'}
          ]
        },
        {
          name: 'comments',
          data_property: 'comments',
          label: 'Comments',
          type: 'textarea',
          labelWidth: 4,
          height: 6
        }
      ]
    },
    update: {
      btnText: 'Save',
      btnColour: 'warning',
      qewd: {
        save: 'updatePatient'
      }
    }
  };

  export {patientsPageState};
