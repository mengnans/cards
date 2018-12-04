//extract the data for the drawer
const extractData = (data, id) => {
  let selectedData;
  let extractedData = {};
  let drawerListData = [];
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
  drawerListData.push({
    'label': 'Assigned to',
    'description' : selectedData.coreData.assignee,
  });
  drawerListData.push({
    'label': 'Short description',
    'description' : selectedData.coreData.shortDescription,
  });
  drawerListData.push({
    'label': 'Application',
    'description' : selectedData.coreData.application,
  });
  drawerListData.push({
    'label': 'made_sla',
    'description' : selectedData.serviceData.made_sla,
  });
  drawerListData.push({
    'label': 'upon_reject',
    'description' : selectedData.serviceData.upon_reject,
  });
  drawerListData.push({
    'label': 'opened_by',
    'description' : selectedData.serviceData.opened_by,
  });
  drawerListData.push({
    'label': 'priority',
    'description' : selectedData.serviceData.priority,
  });
  drawerListData.push({
    'label': 'activity_due',
    'description' : selectedData.serviceData.activity_due,
  });
  drawerListData.push({
    'label': 'approval',
    'description' : selectedData.serviceData.approval,
  });

  extractedData.drawerListData = drawerListData;
  extractedData.number = selectedData.coreData.number;
  extractedData.id = id;

  return extractedData;

};

export default extractData;