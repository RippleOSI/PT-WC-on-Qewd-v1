let diagnosisPageState = {
    assemblyName: 'diagnosis',
    name: 'diagnosis',
    title: 'Problems/Diagnosis',
    icon:'clipboard-list',
    summary: {
      title: 'Current Problems/Diagnoses',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Diagnosis',
      headers: ['Name'],
      data_properties: ['name'],
      qewd: {
        getSummary: 'getDiagnoses',
        getDetail: 'getDiagnosisInfo',
        delete: 'deleteDiagnosis'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New Diagnosis',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit Diagnosis',
      title_data_property: 'name',
      fields: [
        {
          name: 'name',
          data_property: 'name',
          label: 'Problem/Diagnosis Name',
          type: 'text',
          labelWidth: 4
        },
           {
          name: 'description',
          data_property: 'description',
          label: 'Description',
          type: 'textarea',
          labelWidth: 4
        },
        {
          name: 'date_of_onset',
          data_property: 'date_of_onset',
          label: 'Date of Onset',
          type: 'date',
          labelWidth: 4
      },


         {
          name: 'terminology',
          data_property: 'terminology',
          label: 'Terminology',
          type: 'text',
          labelWidth: 4
      },
        {
            name: 'code',
            data_property: 'code',
            label: 'Code',
            type: 'text',
            labelWidth: 4
        },
        {
          name: 'author',
          data_property: 'author',
          label: 'Author',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'date_of_entry',
          data_property: 'date_of_entry',
          label: 'Date of Entry',
          type: 'date',
          labelWidth: 4
        },

      ]
    },
    update: {
      btnText: 'Save',
      btnColour: 'warning',
      qewd: {
        save: 'updateDiagnosis'
      }
    }
  };

  export {diagnosisPageState};
