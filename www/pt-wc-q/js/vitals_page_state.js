let vitalsPageState = {
    assemblyName: 'vitals',
    name: 'vitals',
    title: 'Vitals Signs',
    summary: {
      title: 'Vitals Signs',
      titleColour: 'info',
      btnIcon: 'user-plus',
      btnColour: 'success',
      btnTooltip: 'Add New Vitals Sign',
      headers: ['Score', 'SBP'],
      data_properties: ['score', 'systolic_bp'],
      qewd: {
        getSummary: 'getVitals',
        getDetail: 'getVitalSignInfo',
        delete: 'deleteVitalSign'
      },
      rowBtnIcon: 'user-edit',
      rowBtnColour: 'info',
      enableDelete: true,
      deleteConfirmDisplayColumn: 0
    },
    detail: {
      cardWidth: '500px',
      newRecordTitle: 'Enter New Vital Sign',
      titleColour: 'info',
      btnIcon: 'user-cog',
      btnColour: 'success',
      btnTooltip: 'Edit Vital Sign Details',
      title_data_property: 'score',
      fields: [
        {
          name: 'heartrate',
          data_property: 'heartrate',
          label: 'Heart Rate',
          type: 'text',
          labelWidth: 4
        },
        {
            name: 'resprate',
            data_property: 'resprate',
            label: 'Resp Rate',
            type: 'text',
            labelWidth: 4
        },
        {
          name: 'systolic_bp',
          data_property: 'systolic_bp',
          label: 'Systolic BP',
          type: 'text',
          labelWidth: 4
        },
        {
          name: 'score',
          data_property: 'score',
          label: 'Score',
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
        save: 'updateVitalSign'
      }
    }
  };

  export {vitalsPageState};