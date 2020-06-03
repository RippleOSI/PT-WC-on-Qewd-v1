let diagnosisPageState = {
    assemblyName: 'diagnosis',
    name: 'diagnosis',
    title: 'Problems/Diagnosis',
    summary: {
      title: 'Current Problems/Diagnoses',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add a New Diagnosis',
      headers: ['Name', 'Code'],
      data_properties: ['name', 'code'],
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
          label: 'Name',
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
          name: 'description',
          data_property: 'description',
          label: 'Description',
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
        save: 'updateDiagnosis'
      }
    }
  };

  export {diagnosisPageState};