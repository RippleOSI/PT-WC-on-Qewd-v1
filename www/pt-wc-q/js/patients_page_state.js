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
      headers: ['ID', 'Name', 'DOB'],
      data_properties: ['id_uniqueID','familyname', 'dob'],
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
      title_data_property: 'id_uniqueID',
      fields: [
        {
          name: 'id_uniqueID',
          data_property: 'id_uniqueID',
          label: 'ID- Identifier',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'firstname',
          data_property: 'firstname',
          label: 'First Name',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'familyname',
          data_property: 'familyname',
          label: 'Family Name',
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
          name: 'dob',
          data_property: 'dob',
          label: 'Date of Birth',
          type: 'date',
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
          name: 'address',
          data_property: 'address',
          label: 'Address',
          type: 'textarea',
          labelWidth: 4
        },
        {
          name: 'town',
          data_property: 'town',
          label: 'Town/City',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'postcode',
          data_property: 'postcode',
          label: 'PostCode',
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
