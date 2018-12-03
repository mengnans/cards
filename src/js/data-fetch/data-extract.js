const extractData = (data, id) => {
  let selectedData;
  let extractedData = [];
  // find the selected data based on id
  for (let i = 0; i < data.length; i ++) {
    if(data[i].coreData.id === id) {
      selectedData = data[i];
      break;
    }
  }
  if(selectedData === undefined) {
    return null;
  }
  extractedData.push({
    'label': 'Assigned to',
    'description' : selectedData.coreData.assignee,
  });
  extractedData.push({
    'label': 'Short description',
    'description' : selectedData.coreData.shortDescription,
  });
  extractedData.push({
    'label': 'Application',
    'description' : selectedData.coreData.application,
  });
  extractedData.push({
    'label': 'made_sla',
    'description' : selectedData.serviceData.made_sla,
  });
  extractedData.push({
    'label': 'upon_reject',
    'description' : selectedData.serviceData.upon_reject,
  });
  extractedData.push({
    'label': 'opened_by',
    'description' : selectedData.serviceData.opened_by,
  });
  extractedData.push({
    'label': 'priority',
    'description' : selectedData.serviceData.priority,
  });
  extractedData.push({
    'label': 'activity_due',
    'description' : selectedData.serviceData.activity_due,
  });
  extractedData.push({
    'label': 'approval',
    'description' : selectedData.serviceData.approval,
  });

  return extractedData;

};

export default extractData;