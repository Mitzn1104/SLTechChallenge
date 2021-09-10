({
    getAccounts : function(component, event, helper) {
        component.set('v.mycolumns', [
           {label: 'Account Name', fieldName: 'linkName', type: 'url', sortable:true,
           typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}},
           {label: 'Account Owner', fieldName: 'OwnerName', type: 'text', sortable:true},
           {label: 'Phone', editable : 'true', fieldName: 'Phone', type: 'phone'},
           {label: 'Website', editable : 'true', fieldName: 'Website', type: 'text'},
           {label: 'Annual Revenue', editable : 'true', fieldName: 'AnnualRevenue', type: 'currency'},
           
        ]);
        var action = component.get("c.fetchAccs");
       
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var records =response.getReturnValue();
                records.forEach(function(record){
                    record.linkName = '/'+record.Id;
                    if(record.Owner) {
                        record.OwnerName = record.Owner.Name;
                    } 
                });
                component.set("v.accountList", records);
                component.set("v.allData", records);
            }
        });
        $A.enqueueAction(action);
    },
    handleSave: function (cmp, event, helper) {
        var draftValues = event.getParam('draftValues');
        console.log(draftValues);
        var action = cmp.get("c.updateAccount");
        action.setParams({"acc" : draftValues});
        action.setCallback(this, function(response) {
            //var state = response.getState();
            //$A.get('e.force:refreshView').fire();
            var state = response.getState();
                if (state === "SUCCESS") {
                    //alert('Success');
                    $A.get('e.force:refreshView').fire();
                }else if (state === "ERROR"){
                    //alert('error');
                    var errors = response.getError();
                    let toastParams = {
                    title: "Error",
                    message: "Unknown error",
                    type: "error"
                    };
                    if (errors && Array.isArray(errors) && errors.length > 0) {
                        toastParams.message = 'Insufficient Access on Object';
                    }
                    let toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams(toastParams);
                    toastEvent.fire();
                    

                }
            
        });
        


        $A.enqueueAction(action);
        
    },
   
    updateSorting: function (component, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        component.set("v.sortedBy", fieldName);
        component.set("v.sortedDirection", sortDirection);
        helper.sortData(component, fieldName, sortDirection);
    },
    searchTable: function (cmp, event, helper) {
        var allRecords = cmp.get("v.allData");
        var searchFilter = event.getSource().get("v.value").toUpperCase();
        var temp =[];
        var i;
        for(i=0; i<allRecords.length; i++){
            if((allRecords[i].Name && allRecords[i].Name.toUpperCase().indexOf(searchFilter) != -1)) 
               {
                temp.push(allRecords[i]);
            }
        }
        cmp.set("v.accountList",temp);
    }
})